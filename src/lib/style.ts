import type { CSSProperties } from "react";

/** Sets the --shadow-color custom property consumed by the .btn-3d class. */
export function accentShadow(color: string): CSSProperties {
  return { "--shadow-color": color } as CSSProperties;
}
