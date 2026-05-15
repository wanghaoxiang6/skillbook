import path from "node:path";
import { ensureDir, writeText } from "../utils/file.js";

export async function exportCursor(root: string): Promise<string> {
  const out = path.join(root, "exports", "cursor", ".cursor", "rules", "skillbook.generated.mdc");
  await ensureDir(path.dirname(out));
  await writeText(out, "---\ndescription: SkillBook proposal-first workflow\n---\n\nDo not merge external knowledge into formal skills without an accepted update proposal.\n");
  return out;
}
