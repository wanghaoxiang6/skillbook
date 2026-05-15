import { Command } from "commander";
import { buildProfileReflectionProposal, writeProfileProposal } from "../core/profileEvolution.js";

export async function runProfileReflect(root: string): Promise<string> {
  const proposal = await buildProfileReflectionProposal(root);
  return writeProfileProposal(root, proposal);
}

export function registerReflect(program: Command): void {
  program.command("reflect").description("Infer profile updates from project files and logs.").action(async () => {
    const out = await runProfileReflect(process.cwd());
    console.log(`Profile reflection proposal written: ${out}`);
  });
}
