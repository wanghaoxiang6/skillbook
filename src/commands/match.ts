import { Command } from "commander";
import { readSkillIndex, matchSkills } from "../core/skillIndex.js";
import { parseFrontmatter } from "../utils/yaml.js";
import { readText } from "../utils/file.js";
import type { SourceCard } from "../types.js";

export async function matchSourceCard(root: string, sourceCardPath: string) {
  const { data } = parseFrontmatter<SourceCard>(await readText(sourceCardPath));
  const index = await readSkillIndex(root);
  return matchSkills(data, index).slice(0, 3);
}

export function registerMatch(program: Command): void {
  program.command("match").argument("<sourceCard>", "Source card markdown file").description("Recommend target skills.").action(async (sourceCard: string) => {
    const matches = await matchSourceCard(process.cwd(), sourceCard);
    for (const match of matches) console.log(`${match.skill.id}: ${match.score} (${match.reason})`);
  });
}
