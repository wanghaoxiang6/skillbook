import { Command } from "commander";
import { applyProfileProposal } from "../core/profileEvolution.js";

export function registerProfileApply(program: Command): void {
  program.command("profile-apply").argument("<proposal>", "Profile evolution proposal file").description("Apply a confirmed profile proposal to memory files.").action(async (proposal: string) => {
    const written = await applyProfileProposal(process.cwd(), proposal);
    console.log("Applied profile proposal to:");
    for (const file of written) console.log(`- ${file}`);
  });
}
