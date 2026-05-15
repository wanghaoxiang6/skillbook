import path from "node:path";
import type { SkillIndexEntry, SourceCard } from "../types.js";
import { parseYaml } from "../utils/yaml.js";
import { pathExists, readText } from "../utils/file.js";

export interface SkillIndexFile {
  skills: SkillIndexEntry[];
}

export const defaultSkillIndex: SkillIndexFile = {
  skills: [
    {
      id: "source-to-skill-router",
      name: "Source-to-Skill Router",
      category: "meta",
      path: "skills/meta/source-to-skill-router",
      summary: "Routes external sources into reject/reference/update/create decisions.",
      keywords: ["source", "skill", "intake", "proposal", "router", "资料", "入库"],
      status: "active"
    },
    {
      id: "skill-evolution-engine",
      name: "Skill Evolution Engine",
      category: "meta",
      path: "skills/meta/skill-evolution-engine",
      summary: "Turns usage logs, failures, and feedback into evolution proposals.",
      keywords: ["evolution", "logs", "failure", "feedback", "进化"],
      status: "active"
    },
    {
      id: "open-source-repo-analysis",
      name: "Open Source Repo Analysis",
      category: "coding",
      path: "skills/coding/open-source-repo-analysis",
      summary: "Analyzes whether a repository is worth borrowing from.",
      keywords: ["github", "repo", "architecture", "typescript", "coding", "开源"],
      status: "active"
    },
    {
      id: "build-in-public",
      name: "Build in Public",
      category: "content",
      path: "skills/content/build-in-public",
      summary: "Turns building progress into honest public content.",
      keywords: ["content", "video", "post", "build", "public", "内容", "短视频"],
      status: "active"
    }
  ]
};

export async function readSkillIndex(root: string): Promise<SkillIndexFile> {
  const file = path.join(root, "indexes", "skill_index.yaml");
  if (!(await pathExists(file))) return defaultSkillIndex;
  const parsed = parseYaml<SkillIndexFile>(await readText(file));
  return parsed?.skills ? parsed : defaultSkillIndex;
}

export function matchSkills(card: SourceCard, index: SkillIndexFile): Array<{ skill: SkillIndexEntry; score: number; reason: string }> {
  const haystack = [
    card.title,
    card.summary,
    card.problem_solved,
    ...card.core_methods,
    ...card.reusable_patterns,
    ...card.technical_stack,
    ...card.thinking_patterns
  ].join(" ").toLowerCase();

  return index.skills
    .map((skill) => {
      const hits = skill.keywords.filter((keyword) => haystack.includes(keyword.toLowerCase()));
      const score = hits.length + (haystack.includes(skill.category) ? 1 : 0);
      return {
        skill,
        score,
        reason: hits.length ? `Matched keywords: ${hits.join(", ")}` : "No direct keyword hit; fallback candidate."
      };
    })
    .sort((a, b) => b.score - a.score);
}
