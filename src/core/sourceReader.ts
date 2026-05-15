import path from "node:path";
import type { SourceType } from "../types.js";
import { readText } from "../utils/file.js";

export interface ReadSourceResult {
  path: string;
  content: string;
  type: SourceType;
}

export function detectSourceType(sourcePath: string, content = ""): SourceType {
  const lower = sourcePath.toLowerCase();
  const firstLines = content.slice(0, 800).toLowerCase();
  if (lower.includes("readme")) return "readme";
  if (/github\.com|package\.json|installation|stars|fork/.test(lower + firstLines)) return "repo";
  if (/transcript|字幕|转写/.test(lower + firstLines)) return "transcript";
  if (/case|案例/.test(lower + firstLines)) return "case";
  if (/docs?|文档/.test(lower)) return "doc";
  if ([".md", ".markdown", ".txt"].includes(path.extname(lower))) return "article";
  return "unknown";
}

export async function readSource(sourcePath: string): Promise<ReadSourceResult> {
  const content = await readText(sourcePath);
  return {
    path: sourcePath,
    content,
    type: detectSourceType(sourcePath, content)
  };
}
