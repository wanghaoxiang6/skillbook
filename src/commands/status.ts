import { Command } from "commander";
import { getStatus } from "../core/health.js";

export function registerStatus(program: Command): void {
  program.command("status").description("Show SkillBook artifact counts.").action(async () => {
    console.log(await getStatus(process.cwd()));
  });
}
