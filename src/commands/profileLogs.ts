import { Command } from "commander";
import { writeProfileLog, type ProfileLogType } from "../core/profileLogs.js";

function registerProfileLogCommand(program: Command, name: ProfileLogType, description: string): void {
  program.command(name).argument("<text...>", "Log text").description(description).action(async (textParts: string[]) => {
    const text = textParts.join(" ").trim();
    if (!text) throw new Error(`${name} requires text.`);
    const out = await writeProfileLog(process.cwd(), name, text);
    console.log(`${name} log written: ${out}`);
  });
}

export function registerProfileLogs(program: Command): void {
  registerProfileLogCommand(program, "correction", "Record a user correction for future profile or Skill evolution.");
  registerProfileLogCommand(program, "feedback", "Record user feedback about SkillBook, AI behavior, or recommendations.");
  registerProfileLogCommand(program, "repeated", "Record a repeated request pattern.");
}
