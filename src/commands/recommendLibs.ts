import { Command } from "commander";
import { buildLibraryRecommendation, writeLibraryRecommendation } from "../core/libraryScout.js";

export function registerRecommendLibs(program: Command): void {
  program
    .command("recommend-libs")
    .description("Recommend public open-source libraries based on a goal, profile, or skill gaps.")
    .option("--goal <text>", "Current goal or problem")
    .option("--from-profile", "Use memory/user_profile.md")
    .option("--from-gaps", "Use memory/skill_gaps.md")
    .option("--no-network", "Skip public GitHub search and use curated fallback only")
    .action(async (options: { goal?: string; fromProfile?: boolean; fromGaps?: boolean; network: boolean }) => {
      const recommendation = await buildLibraryRecommendation(process.cwd(), {
        goal: options.goal,
        fromProfile: options.fromProfile,
        fromGaps: options.fromGaps,
        useNetwork: options.network
      });
      const out = await writeLibraryRecommendation(process.cwd(), recommendation);
      console.log(`Library recommendation written: ${out}`);
      console.log("No repositories were cloned or executed.");
    });
}
