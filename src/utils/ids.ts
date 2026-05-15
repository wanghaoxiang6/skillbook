export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

export function makeId(prefix: string, seed: string, date = new Date()): string {
  const stamp = date.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  return `${prefix}-${slugify(seed).slice(0, 36)}-${stamp}`;
}
