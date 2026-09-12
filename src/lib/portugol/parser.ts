import { tokenize, type Token } from "./lexer";
import type {
  Block,
  Expr,
  FuncDecl,
  LValue,
  Param,
  PortugolType,
  Program,
  Stmt,
  VarDeclEntry,
} from "./ast";

export class ParseError extends Error {}

const TYPE_KEYWORDS = new Set<PortugolType>([
  "inteiro",
  "real",
  "cadeia",
  "caracter",
  "logico",
  "vazio",
]);

export function parse(source: string): Program {
  const tokens = tokenize(source);
  return new Parser(tokens).parseProgram();
}

class Parser {
  private pos = 0;
  private tokens: Token[];
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(offset = 0): Token {
    return this.tokens[Math.min(this.pos + offset, this.tokens.length - 1)];
  }

  private at(value: string): boolean {
    const t = this.peek();
    return (t.type === "ident" || t.type === "punct") && t.value === value;
  }

  private advance(): Token {
    const t = this.tokens[this.pos];
    if (this.pos < this.tokens.length - 1) this.pos++;
    return t;
  }

  private expect(value: string): Token {
    if (!this.at(value)) {
      throw new ParseError(
        `Esperava '${value}' mas encontrei '${this.peek().value || "fim do código"}' (linha ${this.peek().line})`
      );
    }
    return this.advance();
  }

  private expectIdent(): string {
    const t = this.peek();
    if (t.type !== "ident") {
      throw new ParseError(
        `Esperava um identificador mas encontrei '${t.value}' (linha ${t.line})`
      );
    }
    this.advance();
    return t.value;
  }

  parseProgram(): Program {
    this.expect("programa");
    this.expect("{");
    const functions: FuncDecl[] = [];
    while (!this.at("}")) {
      if (this.at("inclua")) {
        // inclua biblioteca Nome --> alias  (ignorado — sem suporte a bibliotecas)
        while (!this.at("}") && this.peek().type !== "eof" && !this.at("funcao")) {
          this.advance();
        }
        continue;
      }
      functions.push(this.parseFuncDecl());
    }
    this.expect("}");
    return { functions };
  }

  private parseFuncDecl(): FuncDecl {
    this.expect("funcao");
    let returnType: PortugolType | null = null;
    const cur = this.peek();
    if (
      cur.type === "ident" &&
      TYPE_KEYWORDS.has(cur.value as PortugolType) &&
      this.peek(1).type === "ident"
    ) {
      returnType = cur.value as PortugolType;
      this.advance();
    }
    const name = this.expectIdent();
    this.expect("(");
    const params: Param[] = [];
    if (!this.at(")")) {
      do {
        params.push(this.parseParam());
      } while (this.at(",") && this.advance());
    }
    this.expect(")");
    const body = this.parseBlock();
    return { name, returnType, params, body };
  }

  private parseParam(): Param {
    const typeTok = this.peek();
    if (typeTok.type !== "ident" || !TYPE_KEYWORDS.has(typeTok.value as PortugolType)) {
      throw new ParseError(`Tipo de parâmetro inválido (linha ${typeTok.line})`);
    }
    this.advance();
    let byRef = false;
    if (this.at("&")) {
      this.advance();
      byRef = true;
    }
    const name = this.expectIdent();
    let dims = 0;
    while (this.at("[")) {
      this.advance();
      this.expect("]");
      dims++;
    }
    return { type: typeTok.value as PortugolType, byRef, dims, name };
  }

  private parseBlock(): Block {
    this.expect("{");
    const stmts: Block = [];
    while (!this.at("}")) {
      stmts.push(this.parseStatement());
    }
    this.expect("}");
    return stmts;
  }

  private isTypeKeyword(): boolean {
    const t = this.peek();
    return t.type === "ident" && TYPE_KEYWORDS.has(t.value as PortugolType);
  }

  private parseStatement(): Stmt {
    if (this.at("const") || this.isTypeKeyword()) return this.parseVarDecl();
    if (this.at("se")) return this.parseIf();
    if (this.at("enquanto")) return this.parseWhile();
    if (this.at("faca")) return this.parseDoWhile();
    if (this.at("para")) return this.parseFor();
    if (this.at("escolha")) return this.parseSwitch();
    if (this.at("retorne")) return this.parseReturn();
    if (this.at("escreva")) return this.parseEscreva();
    if (this.at("leia")) return this.parseLeia();
    if (this.peek().type === "ident") return this.parseIdentStatement();

    const t = this.peek();
    throw new ParseError(`Comando inesperado '${t.value}' (linha ${t.line})`);
  }

  private parseVarDecl(): Stmt {
    let isConst = false;
    if (this.at("const")) {
      isConst = true;
      this.advance();
    }
    const varType = this.advance().value as PortugolType;
    const decls: VarDeclEntry[] = [];
    do {
      const name = this.expectIdent();
      const dims: Expr[] = [];
      while (this.at("[")) {
        this.advance();
        dims.push(this.parseExpr());
        this.expect("]");
      }
      let init: Expr | null = null;
      if (this.at("=")) {
        this.advance();
        init = this.parseExpr();
      }
      decls.push({ name, dims, init });
    } while (this.at(",") && this.advance());
    return { kind: "VarDecl", varType, isConst, decls };
  }

  private parseIf(): Stmt {
    this.expect("se");
    this.expect("(");
    const cond = this.parseExpr();
    this.expect(")");
    const thenBlock = this.parseBlock();
    let elseBlock: Block | null = null;
    if (this.at("senao")) {
      this.advance();
      if (this.at("se")) {
        elseBlock = [this.parseIf()];
      } else {
        elseBlock = this.parseBlock();
      }
    }
    return { kind: "If", cond, then: thenBlock, else: elseBlock };
  }

  private parseWhile(): Stmt {
    this.expect("enquanto");
    this.expect("(");
    const cond = this.parseExpr();
    this.expect(")");
    const body = this.parseBlock();
    return { kind: "While", cond, body };
  }

  private parseDoWhile(): Stmt {
    this.expect("faca");
    const body = this.parseBlock();
    this.expect("enquanto");
    this.expect("(");
    const cond = this.parseExpr();
    this.expect(")");
    return { kind: "DoWhile", body, cond };
  }

  private parseFor(): Stmt {
    this.expect("para");
    this.expect("(");
    const init = this.at(";") ? null : this.parseForHeaderStmt();
    this.expect(";");
    const cond = this.at(";") ? null : this.parseExpr();
    this.expect(";");
    const step = this.at(")") ? null : this.parseForHeaderStmt();
    this.expect(")");
    const body = this.parseBlock();
    return { kind: "For", init, cond, step, body };
  }

  /** Var-decl-with-init or assignment/increment, used inside `para (...)`. */
  private parseForHeaderStmt(): Stmt {
    if (this.isTypeKeyword()) return this.parseVarDecl();
    return this.parseIdentStatement();
  }

  private parseSwitch(): Stmt {
    this.expect("escolha");
    this.expect("(");
    const expr = this.parseExpr();
    this.expect(")");
    this.expect("{");
    const cases: { value: Expr | null; body: Block }[] = [];
    while (this.at("caso")) {
      this.advance();
      let value: Expr | null = null;
      if (this.at("contrario")) {
        this.advance();
      } else {
        value = this.parseExpr();
      }
      this.expect(":");
      const body: Block = [];
      while (!this.at("caso") && !this.at("pare") && !this.at("}")) {
        body.push(this.parseStatement());
      }
      if (this.at("pare")) this.advance();
      cases.push({ value, body });
    }
    this.expect("}");
    return { kind: "Switch", expr, cases };
  }

  private parseReturn(): Stmt {
    this.expect("retorne");
    if (this.at("}")) return { kind: "Return", value: null };
    return { kind: "Return", value: this.parseExpr() };
  }

  private parseEscreva(): Stmt {
    this.expect("escreva");
    this.expect("(");
    const args: Expr[] = [];
    if (!this.at(")")) {
      do {
        args.push(this.parseExpr());
      } while (this.at(",") && this.advance());
    }
    this.expect(")");
    return { kind: "Escreva", args };
  }

  private parseLeia(): Stmt {
    this.expect("leia");
    this.expect("(");
    const target = this.parseLValue();
    this.expect(")");
    return { kind: "Leia", target };
  }

  private parseLValue(): LValue {
    const name = this.expectIdent();
    const indices: Expr[] = [];
    while (this.at("[")) {
      this.advance();
      indices.push(this.parseExpr());
      this.expect("]");
    }
    return { name, indices };
  }

  private parseIdentStatement(): Stmt {
    const target = this.parseLValue();
    if (this.at("=")) {
      this.advance();
      const value = this.parseExpr();
      return { kind: "Assign", target, value };
    }
    if (this.at("++") || this.at("--")) {
      const op = this.advance().value === "++" ? "+" : "-";
      return {
        kind: "Assign",
        target,
        value: {
          kind: "Binary",
          op,
          left: { kind: "Var", name: target.name, indices: target.indices },
          right: { kind: "NumberLit", value: 1, isReal: false },
        },
      };
    }
    if (this.at("(")) {
      this.advance();
      const args: Expr[] = [];
      if (!this.at(")")) {
        do {
          args.push(this.parseExpr());
        } while (this.at(",") && this.advance());
      }
      this.expect(")");
      return { kind: "ExprStmt", expr: { kind: "Call", name: target.name, args } };
    }
    throw new ParseError(
      `Esperava '=' ou '(' depois de '${target.name}' (linha ${this.peek().line})`
    );
  }

  // ── Expressões (precedência crescente) ──────────────────────────────
  parseExpr(): Expr {
    return this.parseOr();
  }

  private parseOr(): Expr {
    let left = this.parseAnd();
    while (this.at("ou")) {
      this.advance();
      left = { kind: "Binary", op: "ou", left, right: this.parseAnd() };
    }
    return left;
  }

  private parseAnd(): Expr {
    let left = this.parseEquality();
    while (this.at("e")) {
      this.advance();
      left = { kind: "Binary", op: "e", left, right: this.parseEquality() };
    }
    return left;
  }

  private parseEquality(): Expr {
    let left = this.parseRelational();
    while (this.at("==") || this.at("!=")) {
      const op = this.advance().value;
      left = { kind: "Binary", op, left, right: this.parseRelational() };
    }
    return left;
  }

  private parseRelational(): Expr {
    let left = this.parseAdditive();
    while (this.at("<") || this.at("<=") || this.at(">") || this.at(">=")) {
      const op = this.advance().value;
      left = { kind: "Binary", op, left, right: this.parseAdditive() };
    }
    return left;
  }

  private parseAdditive(): Expr {
    let left = this.parseMultiplicative();
    while (this.at("+") || this.at("-")) {
      const op = this.advance().value;
      left = { kind: "Binary", op, left, right: this.parseMultiplicative() };
    }
    return left;
  }

  private parseMultiplicative(): Expr {
    let left = this.parseUnary();
    while (this.at("*") || this.at("/") || this.at("%")) {
      const op = this.advance().value;
      left = { kind: "Binary", op, left, right: this.parseUnary() };
    }
    return left;
  }

  private parseUnary(): Expr {
    if (this.at("-")) {
      this.advance();
      return { kind: "Unary", op: "-", expr: this.parseUnary() };
    }
    if (this.at("nao")) {
      this.advance();
      return { kind: "Unary", op: "nao", expr: this.parseUnary() };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): Expr {
    const t = this.peek();

    if (t.type === "number") {
      this.advance();
      return { kind: "NumberLit", value: parseFloat(t.value), isReal: Boolean(t.isReal) };
    }
    if (t.type === "string") {
      this.advance();
      return { kind: "StringLit", value: t.value };
    }
    if (t.type === "char") {
      this.advance();
      return { kind: "CharLit", value: t.value };
    }
    if (this.at("verdadeiro")) {
      this.advance();
      return { kind: "BoolLit", value: true };
    }
    if (this.at("falso")) {
      this.advance();
      return { kind: "BoolLit", value: false };
    }
    if (this.at("(")) {
      this.advance();
      const e = this.parseExpr();
      this.expect(")");
      return e;
    }
    if (t.type === "ident") {
      const name = this.advance().value;
      if (this.at("(")) {
        this.advance();
        const args: Expr[] = [];
        if (!this.at(")")) {
          do {
            args.push(this.parseExpr());
          } while (this.at(",") && this.advance());
        }
        this.expect(")");
        return { kind: "Call", name, args };
      }
      const indices: Expr[] = [];
      while (this.at("[")) {
        this.advance();
        indices.push(this.parseExpr());
        this.expect("]");
      }
      return { kind: "Var", name, indices };
    }

    throw new ParseError(`Expressão inválida perto de '${t.value}' (linha ${t.line})`);
  }
}
