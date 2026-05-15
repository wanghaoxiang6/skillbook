import path from "node:path";
import { ensureDir, writeText } from "../utils/file.js";

export async function exportClaude(root: string): Promise<string> {
  const out = path.join(root, "exports", "claude", "SKILL.generated.md");
  await ensureDir(path.dirname(out));
  await writeText(out, "# SkillBook Export for Claude\n\nUse SkillBook proposals as review artifacts before updating formal skills.\n");
  return out;
}
