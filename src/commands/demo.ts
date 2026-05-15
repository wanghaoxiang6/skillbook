import { Command } from "commander";
import path from "node:path";
import { analyzeSource } from "./analyze.js";
import { initializeProject } from "./init.js";
import { runInterview } from "./interview.js";
import { runOnboard } from "./onboard.js";
import { proposeFromSourceCard } from "./propose.js";
import { buildLibraryRecommendation, writeLibraryRecommendation } from "../core/libraryScout.js";
import { writeText } from "../utils/file.js";

export async function runDemo(root: string): Promise<string[]> {
  await initializeProject(root);
  const outputs: string[] = [];
  outputs.push(await runOnboard(root));
  outputs.push(await runInterview(root, {
    role: "solo AI product builder",
    currentProjects: "SkillBook demo",
    goals: "learn what to remember and reject",
    aiUseCases: "library scouting, source intake, skill evolution",
    gaps: "product judgment, debugging, growth",
    preferences: "proposal first, GitHub first, local first",
    avoid: "private repo access by default, auto memory pollution"
  }, false));
  const recommendation = await buildLibraryRecommendation(root, { goal: "AI memory and skill evolution", useNetwork: false });
  outputs.push(await writeLibraryRecommendation(root, recommendation));
  const demoSource = path.join(root, "sources", "raw", "demo-source.md");
  await writeText(demoSource, `# Demo Source

Problem: AI agents often remember too much and turn weak inspiration into durable rules.

Rule: External material should become a proposal before it becomes a Skill update.

Example: A GitHub README can be useful as a reference without being promoted to a rule.

Eval: Apply commands should generate draft updates and avoid modifying formal Skills directly.

Warning: Do not execute third-party repository scripts while evaluating a source.
`);
  const card = await analyzeSource(root, demoSource);
  outputs.push(card);
  outputs.push(await proposeFromSourceCard(root, card));
  return outputs;
}

export function registerDemo(program: Command): void {
  program.command("demo").description("Run a complete local demo flow with sample data.").action(async () => {
    const outputs = await runDemo(process.cwd());
    console.log("SkillBook demo completed. Generated:");
    for (const out of outputs) console.log(`- ${out}`);
  });
}
