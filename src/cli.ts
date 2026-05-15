#!/usr/bin/env node
import { Command } from "commander";
import { registerAnalyze } from "./commands/analyze.js";
import { registerApply } from "./commands/apply.js";
import { registerDemo } from "./commands/demo.js";
import { registerDoctor } from "./commands/doctor.js";
import { registerEvolve } from "./commands/evolve.js";
import { registerExport } from "./commands/export.js";
import { registerGaps } from "./commands/gaps.js";
import { registerInit } from "./commands/init.js";
import { registerInterview } from "./commands/interview.js";
import { registerIntake } from "./commands/intake.js";
import { registerLog } from "./commands/log.js";
import { registerMatch } from "./commands/match.js";
import { registerOnboard } from "./commands/onboard.js";
import { registerProfileApply } from "./commands/profileApply.js";
import { registerProfileLogs } from "./commands/profileLogs.js";
import { registerProfilePropose } from "./commands/profilePropose.js";
import { registerProfile } from "./commands/profile.js";
import { registerPropose } from "./commands/propose.js";
import { registerRecommendLibs } from "./commands/recommendLibs.js";
import { registerReflect } from "./commands/reflect.js";
import { registerStatus } from "./commands/status.js";

const program = new Command();

program
  .name("skillbook")
  .description("A Source-to-Skill Compiler & Evolution System")
  .version("0.1.0");

registerInit(program);
registerOnboard(program);
registerDemo(program);
registerDoctor(program);
registerStatus(program);
registerProfile(program);
registerInterview(program);
registerReflect(program);
registerProfilePropose(program);
registerProfileApply(program);
registerGaps(program);
registerProfileLogs(program);
registerRecommendLibs(program);
registerAnalyze(program);
registerIntake(program);
registerMatch(program);
registerPropose(program);
registerApply(program);
registerLog(program);
registerEvolve(program);
registerExport(program);

program.parseAsync(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
