import { Command } from "commander";
import path from "node:path";
import type { SourceCard } from "../types.js";
import { readContextBook } from "../core/contextBook.js";
import { decideIntake } from "../core/intakeRouter.js";
import { renderUpdateProposal } from "../core/proposalWriter.js";
import { readSkillIndex } from "../core/skillIndex.js";
import { slugify } from "../utils/ids.js";
import { readText, writeText } from "../utils/file.js";
import { parseFrontmatter } from "../utils/yaml.js";

export async function proposeFromSourceCard(root: string, sourceCardPath: string): Promise<string> {
  const { data: card } = parseFrontmatter<SourceCard>(await readText(sourceCardPath));
  const proposal = decideIntake(card, await readContextBook(root), await readSkillIndex(root));
  const out = path.join(root, "proposals", "intake", `${slugify(card.title)}.${proposal.id}.update_proposal.md`);
  await writeText(out, renderUpdateProposal(proposal));
  return out;
}

export function registerPropose(program: Command): void {
  program.command("propose").argument("<sourceCard>", "Source card markdown file").description("Generate an update proposal from a source card.").action(async (sourceCard: string) => {
    const out = await proposeFromSourceCard(process.cwd(), sourceCard);
    console.log(`Update proposal written: ${out}`);
  });
}
