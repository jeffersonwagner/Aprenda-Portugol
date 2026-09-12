export type PortugolType =
  | "inteiro"
  | "real"
  | "cadeia"
  | "caracter"
  | "logico"
  | "vazio";

export interface Param {
  type: PortugolType;
  byRef: boolean;
  dims: number; // 0 = scalar, 1 = vetor, 2 = matriz
  name: string;
}

export interface FuncDecl {
  name: string;
  returnType: PortugolType | null;
  params: Param[];
  body: Block;
}

export interface Program {
  functions: FuncDecl[];
}

export type Block = Stmt[];

export interface VarDeclEntry {
  name: string;
  dims: Expr[]; // array/matrix size expressions, [] for scalar
  init: Expr | null;
}

export type Stmt =
  | { kind: "VarDecl"; varType: PortugolType; isConst: boolean; decls: VarDeclEntry[] }
  | { kind: "Assign"; target: LValue; value: Expr }
  | { kind: "If"; cond: Expr; then: Block; else: Block | null }
  | { kind: "While"; cond: Expr; body: Block }
  | { kind: "DoWhile"; body: Block; cond: Expr }
  | { kind: "For"; init: Stmt | null; cond: Expr | null; step: Stmt | null; body: Block }
  | { kind: "Switch"; expr: Expr; cases: { value: Expr | null; body: Block }[] }
  | { kind: "Return"; value: Expr | null }
  | { kind: "ExprStmt"; expr: Expr }
  | { kind: "Escreva"; args: Expr[] }
  | { kind: "Leia"; target: LValue };

export interface LValue {
  name: string;
  indices: Expr[];
}

export type Expr =
  | { kind: "NumberLit"; value: number; isReal: boolean }
  | { kind: "StringLit"; value: string }
  | { kind: "CharLit"; value: string }
  | { kind: "BoolLit"; value: boolean }
  | { kind: "Var"; name: string; indices: Expr[] }
  | { kind: "Unary"; op: "-" | "nao"; expr: Expr }
  | { kind: "Binary"; op: string; left: Expr; right: Expr }
  | { kind: "Call"; name: string; args: Expr[] };
