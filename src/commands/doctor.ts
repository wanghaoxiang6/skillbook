import { Command } from "commander";
import { renderDoctor, runDoctor } from "../core/health.js";

export function registerDoctor(program: Command): void {
  program.command("doctor").description("Check whether the local SkillBook workspace is ready.").action(async () => {
    const checks = await runDoctor(process.cwd());
    console.log(renderDoctor(checks));
    if (checks.some((check) => !check.ok)) process.exitCode = 1;
  });
}
