import { Command } from "commander";
import path from "node:path";
import { buildEvolutionProposal } from "../core/evolutionEngine.js";
import { renderEvolutionProposal } from "../core/proposalWriter.js";
import { slugify } from "../utils/ids.js";
import { writeText } from "../utils/file.js";

export function registerEvolve(program: Command): void {
  program.command("evolve").argument("<skill>", "Skill id").description("Generate an evolution proposal from logs.").action(async (skill: string) => {
    const root = process.cwd();
    const proposal = await buildEvolutionProposal(root, skill);
    const out = path.join(root, "proposals", "evolution", `${slugify(skill)}.${proposal.id}.evolution_proposal.md`);
    await writeText(out, renderEvolutionProposal(proposal));
    console.log(`Evolution proposal written: ${out}`);
  });
}
