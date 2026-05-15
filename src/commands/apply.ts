import { Command } from "commander";
import path from "node:path";
import type { UpdateProposal } from "../types.js";
import { renderDraftUpdate } from "../core/proposalWriter.js";
import { readText, writeText } from "../utils/file.js";
import { slugify } from "../utils/ids.js";
import { parseFrontmatter } from "../utils/yaml.js";

export async function applyProposalDraft(root: string, proposalPath: string): Promise<string> {
  const { data } = parseFrontmatter<UpdateProposal>(await readText(proposalPath));
  const out = path.join(root, "proposals", "intake", `${slugify(data.id)}.draft_update.md`);
  await writeText(out, renderDraftUpdate(data));
  return out;
}

export function registerApply(program: Command): void {
  program.command("apply").argument("<proposal>", "Update proposal markdown file").description("Generate a draft update; does not modify formal skills.").action(async (proposal: string) => {
    const out = await applyProposalDraft(process.cwd(), proposal);
    console.log(`Draft update written: ${out}`);
    console.log("Formal skills were not modified. Human confirmation is required.");
  });
}
