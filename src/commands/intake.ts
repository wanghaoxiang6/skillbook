import { Command } from "commander";
import { analyzeSource } from "./analyze.js";
import { proposeFromSourceCard } from "./propose.js";

export async function intakeSource(root: string, sourcePath: string): Promise<{ cardPath: string; proposalPath: string }> {
  const cardPath = await analyzeSource(root, sourcePath);
  const proposalPath = await proposeFromSourceCard(root, cardPath);
  return { cardPath, proposalPath };
}

export function registerIntake(program: Command): void {
  program.command("intake").argument("<source>", "Markdown/text source file").description("Generate a source card and update proposal.").action(async (source: string) => {
    const result = await intakeSource(process.cwd(), source);
    console.log(`Source card written: ${result.cardPath}`);
    console.log(`Update proposal written: ${result.proposalPath}`);
  });
}
