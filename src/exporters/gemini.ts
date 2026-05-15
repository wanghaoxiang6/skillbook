import path from "node:path";
import { ensureDir, writeText } from "../utils/file.js";

export async function exportGemini(root: string): Promise<string> {
  const out = path.join(root, "exports", "gemini", "GEMINI.generated.md");
  await ensureDir(path.dirname(out));
  await writeText(out, "# SkillBook Gemini Instructions\n\nFollow the intake protocol and produce reviewable proposals before skill updates.\n");
  return out;
}
