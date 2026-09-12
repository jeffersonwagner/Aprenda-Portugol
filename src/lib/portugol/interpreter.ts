import type {
  Block,
  Expr,
  FuncDecl,
  LValue,
  PortugolType,
  Program,
  Stmt,
} from "./ast";

export class RuntimeError extends Error {}

type PortugolValue = number | string | boolean | PortugolArray;
type PortugolArray = PortugolValue[];

interface VarSlot {
  type: PortugolType;
  dims: number;
  value: PortugolValue;
}

class Scope {
  private vars = new Map<string, VarSlot>();
  private parent: Scope | null;
  constructor(parent: Scope | null = null) {
    this.parent = parent;
  }

  declare(name: string, slot: VarSlot) {
    this.vars.set(name, slot);
  }

  private find(name: string): VarSlot {
    const slot = this.vars.get(name);
    if (slot) return slot;
    if (this.parent) return this.parent.find(name);
    throw new RuntimeError(`Variável '${name}' não foi declarada`);
  }

  get(name: string): VarSlot {
    return this.find(name);
  }
}

class ReturnSignal {
  value: PortugolValue | null;
  constructor(value: PortugolValue | null) {
    this.value = value;
  }
}

function defaultValue(type: PortugolType): PortugolValue {
  switch (type) {
    case "inteiro":
    case "real":
      return 0;
    case "logico":
      return false;
    default:
      return "";
  }
}

function makeArray(type: PortugolType, dims: number[]): PortugolValue {
  if (dims.length === 0) return defaultValue(type);
  const [first, ...rest] = dims;
  const arr: PortugolArray = [];
  for (let i = 0; i < first; i++) arr.push(makeArray(type, rest));
  return arr;
}

const MAX_STEPS = 300000;

export interface RunResult {
  output: string;
  error: string | null;
}

export function runProgram(program: Program, inputs: string[]): RunResult {
  const interp = new Interpreter(program, inputs);
  try {
    interp.run();
    return { output: interp.output, error: null };
  } catch (err) {
    const message =
      err instanceof RangeError
        ? "Estouro de pilha: verifique se a função tem uma condição de parada (recursão infinita)."
        : err instanceof Error
          ? err.message
          : String(err);
    return { output: interp.output, error: message };
  }
}

class Interpreter {
  output = "";
  private functions = new Map<string, FuncDecl>();
  private steps = 0;
  private inputIndex = 0;

  private inputs: string[];

  constructor(program: Program, inputs: string[]) {
    this.inputs = inputs;
    for (const fn of program.functions) this.functions.set(fn.name, fn);
  }

  run() {
    const inicio = this.functions.get("inicio");
    if (!inicio) {
      throw new RuntimeError("Função 'inicio' não encontrada — todo programa precisa dela.");
    }
    this.callFunction(inicio, []);
  }

  private tick() {
    this.steps++;
    if (this.steps > MAX_STEPS) {
      throw new RuntimeError(
        "Tempo de execução excedido — verifique se há um laço infinito."
      );
    }
  }

  private callFunction(fn: FuncDecl, args: PortugolValue[]): PortugolValue | null {
    const scope = new Scope(null);
    fn.params.forEach((p, i) => {
      scope.declare(p.name, { type: p.type, dims: p.dims, value: args[i] });
    });
    try {
      this.execBlock(fn.body, scope);
    } catch (signal) {
      if (signal instanceof ReturnSignal) return signal.value;
      throw signal;
    }
    return null;
  }

  private execBlock(block: Block, scope: Scope) {
    for (const stmt of block) this.execStmt(stmt, scope);
  }

  private execStmt(stmt: Stmt, scope: Scope) {
    this.tick();
    switch (stmt.kind) {
      case "VarDecl": {
        for (const decl of stmt.decls) {
          const dims = decl.dims.map((d) => this.toNumber(this.evalExpr(d, scope)));
          let value: PortugolValue;
          if (dims.length > 0) {
            value = makeArray(stmt.varType, dims);
          } else if (decl.init) {
            value = this.evalExpr(decl.init, scope);
          } else {
            value = defaultValue(stmt.varType);
          }
          scope.declare(decl.name, { type: stmt.varType, dims: dims.length, value });
        }
        return;
      }
      case "Assign": {
        const value = this.evalExpr(stmt.value, scope);
        this.assign(stmt.target, value, scope);
        return;
      }
      case "If": {
        if (this.toBool(this.evalExpr(stmt.cond, scope))) {
          this.execBlock(stmt.then, new Scope(scope));
        } else if (stmt.else) {
          this.execBlock(stmt.else, new Scope(scope));
        }
        return;
      }
      case "While": {
        while (this.toBool(this.evalExpr(stmt.cond, scope))) {
          this.tick();
          this.execBlock(stmt.body, new Scope(scope));
        }
        return;
      }
      case "DoWhile": {
        do {
          this.tick();
          this.execBlock(stmt.body, new Scope(scope));
        } while (this.toBool(this.evalExpr(stmt.cond, scope)));
        return;
      }
      case "For": {
        const forScope = new Scope(scope);
        if (stmt.init) this.execStmt(stmt.init, forScope);
        while (stmt.cond === null || this.toBool(this.evalExpr(stmt.cond, forScope))) {
          this.tick();
          this.execBlock(stmt.body, new Scope(forScope));
          if (stmt.step) this.execStmt(stmt.step, forScope);
        }
        return;
      }
      case "Switch": {
        const value = this.evalExpr(stmt.expr, scope);
        const match = stmt.cases.find(
          (c) => c.value !== null && this.equals(this.evalExpr(c.value, scope), value)
        );
        const chosen = match ?? stmt.cases.find((c) => c.value === null);
        if (chosen) this.execBlock(chosen.body, new Scope(scope));
        return;
      }
      case "Return": {
        throw new ReturnSignal(stmt.value ? this.evalExpr(stmt.value, scope) : null);
      }
      case "ExprStmt": {
        this.evalExpr(stmt.expr, scope);
        return;
      }
      case "Escreva": {
        this.output += stmt.args.map((a) => this.display(this.evalExpr(a, scope))).join("");
        return;
      }
      case "Leia": {
        const raw = this.inputs[this.inputIndex];
        if (raw === undefined) {
          throw new RuntimeError(
            "O programa tentou ler mais valores do que os fornecidos neste exercício."
          );
        }
        this.inputIndex++;
        const slot = this.resolveTargetSlot(stmt.target, scope);
        const parsed = this.parseInput(raw, slot.type);
        this.setAt(stmt.target, parsed, scope);
        return;
      }
    }
  }

  private parseInput(raw: string, type: PortugolType): PortugolValue {
    switch (type) {
      case "inteiro": {
        const n = parseInt(raw, 10);
        if (Number.isNaN(n)) throw new RuntimeError(`Entrada inválida para inteiro: '${raw}'`);
        return n;
      }
      case "real": {
        const n = parseFloat(raw);
        if (Number.isNaN(n)) throw new RuntimeError(`Entrada inválida para real: '${raw}'`);
        return n;
      }
      case "logico":
        return raw.trim().toLowerCase() === "verdadeiro";
      default:
        return raw;
    }
  }

  private resolveTargetSlot(target: LValue, scope: Scope): VarSlot {
    return scope.get(target.name);
  }

  private assign(target: LValue, value: PortugolValue, scope: Scope) {
    this.setAt(target, value, scope);
  }

  private setAt(target: LValue, value: PortugolValue, scope: Scope) {
    const slot = scope.get(target.name);
    if (target.indices.length === 0) {
      slot.value = value;
      return;
    }
    let container = slot.value as PortugolArray;
    for (let i = 0; i < target.indices.length - 1; i++) {
      const idx = this.toNumber(this.evalExpr(target.indices[i], scope));
      this.checkIndex(container, idx, target.name);
      container = container[idx] as PortugolArray;
    }
    const lastIdx = this.toNumber(
      this.evalExpr(target.indices[target.indices.length - 1], scope)
    );
    this.checkIndex(container, lastIdx, target.name);
    container[lastIdx] = value;
  }

  private checkIndex(container: PortugolArray, idx: number, name: string) {
    if (!Array.isArray(container) || idx < 0 || idx >= container.length) {
      throw new RuntimeError(
        `Índice ${idx} fora dos limites do vetor/matriz '${name}' (tamanho ${
          Array.isArray(container) ? container.length : 0
        })`
      );
    }
  }

  private evalExpr(expr: Expr, scope: Scope): PortugolValue {
    switch (expr.kind) {
      case "NumberLit":
        return expr.value;
      case "StringLit":
        return expr.value;
      case "CharLit":
        return expr.value;
      case "BoolLit":
        return expr.value;
      case "Var": {
        const slot = scope.get(expr.name);
        if (expr.indices.length === 0) return slot.value;
        let value: PortugolValue = slot.value;
        for (const idxExpr of expr.indices) {
          const idx = this.toNumber(this.evalExpr(idxExpr, scope));
          const arr = value as PortugolArray;
          this.checkIndex(arr, idx, expr.name);
          value = arr[idx];
        }
        return value;
      }
      case "Unary": {
        const v = this.evalExpr(expr.expr, scope);
        return expr.op === "-" ? -this.toNumber(v) : !this.toBool(v);
      }
      case "Binary":
        return this.evalBinary(expr, scope);
      case "Call": {
        const fn = this.functions.get(expr.name);
        if (!fn) throw new RuntimeError(`Função '${expr.name}' não foi declarada`);
        const args = expr.args.map((a) => this.evalExpr(a, scope));
        const result = this.callFunction(fn, args);
        return result ?? 0;
      }
    }
  }

  private evalBinary(expr: Extract<Expr, { kind: "Binary" }>, scope: Scope): PortugolValue {
    if (expr.op === "e") {
      return this.toBool(this.evalExpr(expr.left, scope)) && this.toBool(this.evalExpr(expr.right, scope));
    }
    if (expr.op === "ou") {
      return this.toBool(this.evalExpr(expr.left, scope)) || this.toBool(this.evalExpr(expr.right, scope));
    }

    const left = this.evalExpr(expr.left, scope);
    const right = this.evalExpr(expr.right, scope);

    switch (expr.op) {
      case "+":
        if (typeof left === "string" || typeof right === "string") {
          return this.display(left) + this.display(right);
        }
        return this.toNumber(left) + this.toNumber(right);
      case "-":
        return this.toNumber(left) - this.toNumber(right);
      case "*":
        return this.toNumber(left) * this.toNumber(right);
      case "/": {
        const r = this.toNumber(right);
        if (r === 0) throw new RuntimeError("Divisão por zero");
        const result = this.toNumber(left) / r;
        const intDivision = this.isIntegerExpr(expr.left, scope) && this.isIntegerExpr(expr.right, scope);
        return intDivision ? Math.trunc(result) : result;
      }
      case "%": {
        const r = this.toNumber(right);
        if (r === 0) throw new RuntimeError("Divisão por zero (módulo)");
        return this.toNumber(left) % r;
      }
      case "==":
        return this.equals(left, right);
      case "!=":
        return !this.equals(left, right);
      case "<":
        return this.toNumber(left) < this.toNumber(right);
      case "<=":
        return this.toNumber(left) <= this.toNumber(right);
      case ">":
        return this.toNumber(left) > this.toNumber(right);
      case ">=":
        return this.toNumber(left) >= this.toNumber(right);
      default:
        throw new RuntimeError(`Operador desconhecido '${expr.op}'`);
    }
  }

  /** Inferência leve de tipo, usada só para decidir se '/' trunca (divisão inteira). */
  private isIntegerExpr(expr: Expr, scope: Scope): boolean {
    switch (expr.kind) {
      case "NumberLit":
        return !expr.isReal;
      case "Var": {
        try {
          return scope.get(expr.name).type === "inteiro";
        } catch {
          return false;
        }
      }
      case "Unary":
        return expr.op === "-" && this.isIntegerExpr(expr.expr, scope);
      case "Binary":
        if (["+", "-", "*", "%", "/"].includes(expr.op)) {
          return this.isIntegerExpr(expr.left, scope) && this.isIntegerExpr(expr.right, scope);
        }
        return false;
      case "Call":
        return this.functions.get(expr.name)?.returnType === "inteiro";
      default:
        return false;
    }
  }

  private equals(a: PortugolValue, b: PortugolValue): boolean {
    if (typeof a === "number" || typeof b === "number") {
      return this.toNumber(a) === this.toNumber(b);
    }
    return a === b;
  }

  private toNumber(v: PortugolValue): number {
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? 1 : 0;
    const n = parseFloat(v as string);
    if (Number.isNaN(n)) throw new RuntimeError(`Valor '${v}' não é um número`);
    return n;
  }

  private toBool(v: PortugolValue): boolean {
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v !== 0;
    return Boolean(v);
  }

  private display(v: PortugolValue): string {
    if (typeof v === "boolean") return v ? "verdadeiro" : "falso";
    if (Array.isArray(v)) return "[vetor]";
    return String(v);
  }
}
