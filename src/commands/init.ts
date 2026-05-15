import { Command } from "commander";
import path from "node:path";
import { ensureDir, writeIfMissing, writeText } from "../utils/file.js";
import { stringifyYaml } from "../utils/yaml.js";
import { defaultSkillIndex } from "../core/skillIndex.js";
import { ensureProfileMemory } from "../core/profileEvolution.js";

const dirs = [
  "docs",
  "memory",
  "indexes",
  "skills",
  "sources/raw",
  "sources/cards",
  "proposals/intake",
  "proposals/evolution",
  "proposals/profile",
  "recommendations/libs",
  "logs/usage",
  "logs/failures",
  "logs/feedback",
  "logs/corrections",
  "logs/repeated_requests",
  "logs/user_feedback",
  "templates",
  "prompts",
  "examples"
];

export async function initializeProject(root: string): Promise<void> {
  for (const dir of dirs) await ensureDir(path.join(root, dir));
  await writeIfMissing(path.join(root, "memory", "user_profile.md"), "# User Profile\n\nDescribe long-term identity, goals, working style, and AI collaboration preferences.\n");
  await writeIfMissing(path.join(root, "memory", "project_context.md"), "# Project Context\n\nRun `skillbook profile` to update this file.\n");
  await writeIfMissing(path.join(root, "memory", "preferences.md"), "# Preferences\n\n- Prefer small, reviewable iterations.\n- Avoid over-engineering.\n- Generate proposals before formal skill updates.\n");
  await writeIfMissing(path.join(root, "memory", "decisions.md"), "# Decisions\n\n- MVP is local CLI first.\n- No Web UI, database, cloud sync, or real vector database in v1.\n");
  await writeIfMissing(path.join(root, "memory", "rejected_ideas.md"), "# Rejected Ideas\n\n- Do not auto-merge external source content into formal skills.\n");
  await writeIfMissing(path.join(root, "memory", "glossary.md"), "# Glossary\n\n- SkillBook: A source-to-skill compiler and evolution system.\n- Source Card: A structured summary of external material.\n- Update Proposal: A review artifact for possible skill updates.\n");
  await ensureProfileMemory(root);
  await writeIfMissing(path.join(root, "indexes", "skill_index.yaml"), stringifyYaml(defaultSkillIndex));
  await writeIfMissing(path.join(root, "indexes", "skill_tree.yaml"), stringifyYaml({
    meta: ["source-to-skill-router", "skill-evolution-engine"],
    coding: ["open-source-repo-analysis", "ai-coding-debugging"],
    content: ["build-in-public", "short-video-hook"]
  }));
  await writeIfMissing(path.join(root, "indexes", "source_index.yaml"), stringifyYaml({ sources: [] }));
  await writeIfMissing(path.join(root, "indexes", "vector_manifest.yaml"), stringifyYaml({
    version: 1,
    implemented: false,
    priority_inputs: ["source_card summaries", "skill summaries", "rules", "examples", "evals", "warnings", "failure cards", "feedback", "decisions"]
  }));
  await writeIfMissing(path.join(root, "AGENTS.md"), "# AGENTS.md\n\nUse proposal-first updates. Do not execute external scripts, read `.env`, install unknown dependencies, or modify formal skills before user confirmation.\n");
  for (const keep of ["sources/raw/.gitkeep", "sources/cards/.gitkeep", "proposals/intake/.gitkeep", "proposals/evolution/.gitkeep", "proposals/profile/.gitkeep", "recommendations/libs/.gitkeep", "logs/usage/.gitkeep", "logs/failures/.gitkeep", "logs/feedback/.gitkeep", "logs/corrections/.gitkeep", "logs/repeated_requests/.gitkeep", "logs/user_feedback/.gitkeep"]) {
    await writeIfMissing(path.join(root, keep), "");
  }
  await writeText(path.join(root, "indexes", "skill_index.yaml"), stringifyYaml(defaultSkillIndex));
}

export function registerInit(program: Command): void {
  program.command("init").description("Initialize SkillBook folders and baseline memory/index files.").action(async () => {
    await initializeProject(process.cwd());
    console.log("SkillBook initialized.");
  });
}
