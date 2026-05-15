export function firstHeading(markdown: string): string | undefined {
  return markdown.split(/\r?\n/).map((line) => line.trim()).find((line) => line.startsWith("# "))?.replace(/^#\s+/, "");
}

export function excerpt(markdown: string, max = 420): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

export function bulletList(items: string[]): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- None";
}
