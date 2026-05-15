import { Command } from "commander";
import path from "node:path";
import { buildSourceCard, renderSourceCard, sourceCardFileName } from "../core/sourceCard.js";
import { readSource } from "../core/sourceReader.js";
import { writeText } from "../utils/file.js";

export async function analyzeSource(root: string, sourcePath: string): Promise<string> {
  const source = await readSource(sourcePath);
  const card = buildSourceCard(source);
  const out = path.join(root, "sources", "cards", sourceCardFileName(card));
  await writeText(out, renderSourceCard(card));
  return out;
}

export function registerAnalyze(program: Command): void {
  program.command("analyze").argument("<source>", "Markdown/text source file").description("Generate a source card only.").action(async (source: string) => {
    const out = await analyzeSource(process.cwd(), source);
    console.log(`Source card written: ${out}`);
  });
}
