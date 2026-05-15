import { Command } from "commander";
import path from "node:path";
import { ensureProfileMemory } from "../core/profileEvolution.js";
import { readText } from "../utils/file.js";

export function registerGaps(program: Command): void {
  program.command("gaps").description("Show current inferred or confirmed skill gaps.").action(async () => {
    const root = process.cwd();
    await ensureProfileMemory(root);
    const file = path.join(root, "memory", "skill_gaps.md");
    console.log(await readText(file));
  });
}
