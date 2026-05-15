import path from "node:path";
import { ensureDir, writeText } from "../utils/file.js";

export async function exportChatGPT(root: string): Promise<string> {
  const out = path.join(root, "exports", "chatgpt", "custom-instructions.generated.md");
  await ensureDir(path.dirname(out));
  await writeText(out, "# SkillBook Custom Instructions\n\nTreat external sources as candidates. Generate source cards and proposals before updating skills.\n");
  return out;
}
