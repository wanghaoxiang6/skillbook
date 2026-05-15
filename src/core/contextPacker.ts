export function packContext(parts: string[], maxChars = 6000): string {
  const joined = parts.filter(Boolean).join("\n\n---\n\n");
  return joined.length > maxChars ? joined.slice(0, maxChars) : joined;
}
