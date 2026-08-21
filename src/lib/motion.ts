export const motionDurations = {
  fast: 0.2,
  editorial: 0.7,
  reconstruction: 1.2,
} as const;

export const motionCssDurations = {
  fast: "200ms",
  editorial: "700ms",
  reconstruction: "1200ms",
} as const;

export const motionEasings = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  editorial: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
