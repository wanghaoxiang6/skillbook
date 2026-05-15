import { Command } from "commander";
import path from "node:path";
import { timestamp } from "../utils/dates.js";
import { makeId } from "../utils/ids.js";
import { writeText } from "../utils/file.js";
import { frontmatter } from "../utils/yaml.js";

export function registerLog(program: Command): void {
  program
    .command("log")
    .description("Record skill usage.")
    .requiredOption("--skill <skill>", "Skill id")
    .requiredOption("--result <result>", "success | failure")
    .action(async (options: { skill: string; result: string }) => {
      if (!["success", "failure"].includes(options.result)) throw new Error("--result must be success or failure");
      const id = makeId("usage", `${options.skill}-${options.result}`);
      const usage = frontmatter({ id, skill: options.skill, result: options.result, created_at: timestamp() }, `# Usage Log

## Notes
Describe what happened, what worked, and what should change.
`);
      const usageOut = path.join(process.cwd(), "logs", "usage", `${id}.md`);
      await writeText(usageOut, usage);
      console.log(`Usage log written: ${usageOut}`);
      if (options.result === "failure") {
        const failureOut = path.join(process.cwd(), "logs", "failures", `${id}.failure.md`);
        await writeText(failureOut, `# Failure Card

skill_id: ${options.skill}
usage_log: ${usageOut}

## What Failed

## Expected Behavior

## Possible Skill Gap
`);
        console.log(`Failure card written: ${failureOut}`);
      }
    });
}
