import { Command } from "commander";
import path from "node:path";
import { buildProjectProfile } from "../core/projectProfiler.js";
import { writeText } from "../utils/file.js";

export function registerProfile(program: Command): void {
  program.command("profile").description("Generate or update memory/project_context.md.").action(async () => {
    const root = process.cwd();
    const profile = await buildProjectProfile(root);
    const out = path.join(root, "memory", "project_context.md");
    await writeText(out, profile);
    console.log(`Project profile written: ${out}`);
  });
}
