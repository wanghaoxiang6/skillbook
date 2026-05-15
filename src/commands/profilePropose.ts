import { Command } from "commander";
import { runProfileReflect } from "./reflect.js";

export function registerProfilePropose(program: Command): void {
  program.command("profile-propose").description("Alias for reflect: generate a profile evolution proposal.").action(async () => {
    const out = await runProfileReflect(process.cwd());
    console.log(`Profile proposal written: ${out}`);
  });
}
