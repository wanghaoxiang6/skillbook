import path from "node:path";
import { ensureDir, writeText } from "../utils/file.js";

export async function exportCodex(root: string): Promise<string> {
  const out = path.join(root, "exports", "codex", "AGENTS.generated.md");
  await ensureDir(path.dirname(out));
  await writeText(out, `# SkillBook Codex Instructions

Use SkillBook as a source-to-skill compiler.

- Read memory files before routing external sources.
- Generate source cards before update proposals.
- Never write external source content directly into formal skills.
- Apply commands create draft updates only; human confirmation is required.
- Keep v1 local: CLI, Markdown, YAML, JSON, and filesystem.
`);
  return out;
}
