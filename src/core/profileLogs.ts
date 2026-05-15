import path from "node:path";
import { timestamp } from "../utils/dates.js";
import { ensureDir, writeText } from "../utils/file.js";
import { makeId, slugify } from "../utils/ids.js";
import { frontmatter } from "../utils/yaml.js";

export type ProfileLogType = "correction" | "feedback" | "repeated";

const logDirs: Record<ProfileLogType, string> = {
  correction: "corrections",
  feedback: "user_feedback",
  repeated: "repeated_requests"
};

export async function writeProfileLog(root: string, type: ProfileLogType, text: string): Promise<string> {
  const id = makeId(type, text);
  const outDir = path.join(root, "logs", logDirs[type]);
  await ensureDir(outDir);
  const out = path.join(outDir, `${slugify(id)}.md`);
  const title = type === "correction" ? "Correction Log" : type === "feedback" ? "User Feedback Log" : "Repeated Request Log";
  await writeText(out, frontmatter({ id, type, created_at: timestamp(), text }, `# ${title}

## User Text

${text}

## Why This Matters

Use this as evidence for future profile, Skill, or prompt evolution proposals. Do not update durable memory directly from one log unless the user explicitly asked to remember it.
`));
  return out;
}
