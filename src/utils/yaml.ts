import YAML from "yaml";

export function parseYaml<T>(content: string): T {
  return YAML.parse(content) as T;
}

export function stringifyYaml(value: unknown): string {
  return YAML.stringify(value, { lineWidth: 0 });
}

export function frontmatter(data: unknown, body: string): string {
  return `---\n${stringifyYaml(data)}---\n\n${body.trim()}\n`;
}

export function parseFrontmatter<T>(content: string): { data: T; body: string } {
  if (!content.startsWith("---")) {
    throw new Error("Markdown file does not contain YAML frontmatter.");
  }
  const end = content.indexOf("\n---", 3);
  if (end < 0) {
    throw new Error("Markdown frontmatter is not closed.");
  }
  const yaml = content.slice(3, end).trim();
  const body = content.slice(end + 4).trim();
  return { data: parseYaml<T>(yaml), body };
}
