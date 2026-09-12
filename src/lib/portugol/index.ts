import { LexError } from "./lexer";
import { ParseError, parse } from "./parser";
import { runProgram, type RunResult } from "./interpreter";

export type { RunResult } from "./interpreter";

export function execute(source: string, inputs: string[] = []): RunResult {
  try {
    const program = parse(source);
    return runProgram(program, inputs);
  } catch (err) {
    if (err instanceof LexError || err instanceof ParseError) {
      return { output: "", error: err.message };
    }
    return { output: "", error: err instanceof Error ? err.message : String(err) };
  }
}

/** Normaliza para comparação tolerante a espaços extras nas pontas de cada linha. */
export function normalizeOutput(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}
