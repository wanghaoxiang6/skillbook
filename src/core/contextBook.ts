import path from "node:path";
import { pathExists, readText } from "../utils/file.js";

const memoryFiles = [
  "user_profile.md",
  "project_context.md",
  "preferences.md",
  "current_focus.md",
  "skill_gaps.md",
  "learning_goals.md",
  "decisions.md",
  "rejected_ideas.md",
  "glossary.md"
];

export async function readContextBook(root: string): Promise<string> {
  const parts: string[] = [];
  for (const file of memoryFiles) {
    const full = path.join(root, "memory", file);
    if (await pathExists(full)) {
      parts.push(`## ${file}\n${await readText(full)}`);
    }
  }
  return parts.join("\n\n");
}
