/** Minimal class-name joiner. Avoids pulling in clsx/tailwind-merge for a job this small. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
