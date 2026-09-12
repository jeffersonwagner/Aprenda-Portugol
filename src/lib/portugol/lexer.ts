export type TokenType = "number" | "string" | "char" | "ident" | "punct" | "eof";

export interface Token {
  type: TokenType;
  value: string;
  /** true when a numeric literal contains a decimal point (real vs inteiro) */
  isReal?: boolean;
  line: number;
}

export class LexError extends Error {}

const PUNCT_2 = ["==", "!=", "<=", ">=", "++", "--", "->"];
const PUNCT_1 = "+-*/%=<>(){}[],;:&".split("");

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let line = 1;
  const n = source.length;

  function peekChar(offset = 0): string {
    return source[i + offset] ?? "";
  }

  while (i < n) {
    const c = source[i];

    if (c === "\n") {
      line++;
      i++;
      continue;
    }
    if (c === " " || c === "\t" || c === "\r") {
      i++;
      continue;
    }

    // comments
    if (c === "/" && peekChar(1) === "/") {
      while (i < n && source[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && peekChar(1) === "*") {
      i += 2;
      while (i < n && !(source[i] === "*" && peekChar(1) === "/")) {
        if (source[i] === "\n") line++;
        i++;
      }
      i += 2;
      continue;
    }

    // strings
    if (c === '"') {
      let value = "";
      i++;
      while (i < n && source[i] !== '"') {
        if (source[i] === "\\") {
          const next = source[i + 1];
          if (next === "n") value += "\n";
          else if (next === "t") value += "\t";
          else if (next === '"') value += '"';
          else if (next === "\\") value += "\\";
          else value += next ?? "";
          i += 2;
        } else {
          value += source[i];
          i++;
        }
      }
      if (i >= n) throw new LexError(`String não fechada (linha ${line})`);
      i++; // closing quote
      tokens.push({ type: "string", value, line });
      continue;
    }

    // char literals
    if (c === "'") {
      let value = "";
      i++;
      if (source[i] === "\\") {
        const next = source[i + 1];
        if (next === "n") value = "\n";
        else if (next === "'") value = "'";
        else value = next ?? "";
        i += 2;
      } else {
        value = source[i] ?? "";
        i++;
      }
      if (source[i] !== "'") {
        throw new LexError(`Literal de caracter não fechado (linha ${line})`);
      }
      i++;
      tokens.push({ type: "char", value, line });
      continue;
    }

    // numbers
    if (/[0-9]/.test(c)) {
      let start = i;
      let isReal = false;
      while (i < n && /[0-9]/.test(source[i])) i++;
      if (source[i] === "." && /[0-9]/.test(peekChar(1))) {
        isReal = true;
        i++;
        while (i < n && /[0-9]/.test(source[i])) i++;
      }
      tokens.push({ type: "number", value: source.slice(start, i), isReal, line });
      continue;
    }

    // identifiers / keywords
    if (/[A-Za-z_À-ÿ]/.test(c)) {
      let start = i;
      while (i < n && /[A-Za-z0-9_À-ÿ]/.test(source[i])) i++;
      tokens.push({ type: "ident", value: source.slice(start, i), line });
      continue;
    }

    // multi-char punctuation
    const two = source.slice(i, i + 2);
    if (PUNCT_2.includes(two)) {
      tokens.push({ type: "punct", value: two, line });
      i += 2;
      continue;
    }

    if (PUNCT_1.includes(c)) {
      tokens.push({ type: "punct", value: c, line });
      i++;
      continue;
    }

    throw new LexError(`Caractere inesperado '${c}' (linha ${line})`);
  }

  tokens.push({ type: "eof", value: "", line });
  return tokens;
}
