import path from "node:path";
import type { LibraryCandidate, LibraryRecommendation } from "../types.js";
import { timestamp } from "../utils/dates.js";
import { ensureDir, pathExists, readText, writeText } from "../utils/file.js";
import { makeId, slugify } from "../utils/ids.js";
import { excerpt } from "../utils/markdown.js";
import { frontmatter } from "../utils/yaml.js";

export interface RecommendLibsOptions {
  goal?: string;
  fromProfile?: boolean;
  fromGaps?: boolean;
  useNetwork?: boolean;
}

export const curatedLibraryCandidates: LibraryCandidate[] = [
  {
    name: "Acontext",
    repo: "https://github.com/memodb-io/Acontext",
    description: "Agent skills as an inspectable memory layer that distills conversation and run traces into skill files.",
    topics: ["agent memory", "skills", "skill evolution", "prompt", "memory"],
    source: "curated"
  },
  {
    name: "Cognee",
    repo: "https://github.com/topoteretes/cognee",
    description: "Memory control plane for AI agents with ingestion, retrieval, and shared context.",
    topics: ["memory", "agents", "rag", "knowledge graph"],
    source: "curated"
  },
  {
    name: "memU",
    repo: "https://github.com/NevaMind-AI/memU",
    description: "Always-on memory framework for proactive agents and long-term user intent understanding.",
    topics: ["memory", "proactive agent", "user profile", "personalization"],
    source: "curated"
  },
  {
    name: "Formbricks",
    repo: "https://github.com/formbricks/formbricks",
    description: "Open-source privacy-first survey and feedback platform.",
    topics: ["feedback", "survey", "onboarding", "user research"],
    source: "curated"
  },
  {
    name: "OpenPanel",
    repo: "https://github.com/Openpanel-dev/openpanel",
    description: "Open-source product analytics with user profiles, funnels, and privacy controls.",
    topics: ["analytics", "product", "user profile", "events", "growth"],
    source: "curated"
  },
  {
    name: "Plausible Analytics",
    repo: "https://github.com/plausible/analytics",
    description: "Lightweight privacy-first web analytics.",
    topics: ["analytics", "privacy", "seo", "growth"],
    source: "curated"
  },
  {
    name: "promptfoo",
    repo: "https://github.com/promptfoo/promptfoo",
    description: "Test and evaluate prompts, models, and agent outputs.",
    topics: ["prompt", "evals", "testing", "quality"],
    source: "curated"
  },
  {
    name: "Langfuse",
    repo: "https://github.com/langfuse/langfuse",
    description: "LLM observability, prompt management, tracing, and evaluation platform.",
    topics: ["llm", "observability", "prompt", "evals", "tracing"],
    source: "curated"
  },
  {
    name: "RSSHub",
    repo: "https://github.com/DIYgod/RSSHub",
    description: "Generates RSS feeds from many sites and communities, useful for demand monitoring.",
    topics: ["monitoring", "rss", "community", "growth", "idea mining"],
    source: "curated"
  },
  {
    name: "Octokit",
    repo: "https://github.com/octokit/octokit.js",
    description: "Official JavaScript toolkit for GitHub APIs.",
    topics: ["github", "repo", "api", "automation"],
    source: "curated"
  }
];

async function readMaybe(root: string, relative: string): Promise<string> {
  const full = path.join(root, relative);
  return (await pathExists(full)) ? readText(full) : "";
}

export async function buildRecommendationGoal(root: string, options: RecommendLibsOptions): Promise<{ goal: string; inputSources: string[] }> {
  const parts: string[] = [];
  const inputSources: string[] = [];
  if (options.goal) {
    parts.push(options.goal);
    inputSources.push("cli --goal");
  }
  if (options.fromProfile) {
    const profile = await readMaybe(root, "memory/user_profile.md");
    if (profile) {
      parts.push(excerpt(profile, 900));
      inputSources.push("memory/user_profile.md");
    }
  }
  if (options.fromGaps) {
    const gaps = await readMaybe(root, "memory/skill_gaps.md");
    if (gaps) {
      parts.push(excerpt(gaps, 700));
      inputSources.push("memory/skill_gaps.md");
    }
  }
  if (!parts.length) {
    const focus = await readMaybe(root, "memory/current_focus.md");
    parts.push(focus ? excerpt(focus, 700) : "Recommend libraries for the current SkillBook project.");
    inputSources.push(focus ? "memory/current_focus.md" : "default goal");
  }
  return { goal: parts.join("\n\n"), inputSources };
}

function scoreCandidate(goal: string, candidate: LibraryCandidate): number {
  const haystack = goal.toLowerCase();
  const terms = [candidate.name, candidate.description, ...candidate.topics].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const unique = [...new Set(terms)];
  return unique.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0) + Math.min(Math.floor((candidate.stars ?? 0) / 5000), 4);
}

export async function searchPublicGitHub(goal: string, limit = 5): Promise<LibraryCandidate[]> {
  const query = encodeURIComponent(`${goal.slice(0, 140)} in:name,description,readme stars:>500`);
  const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${limit}`, {
    headers: { "Accept": "application/vnd.github+json", "User-Agent": "skillbook-library-scout" }
  });
  if (!response.ok) throw new Error(`GitHub search failed: ${response.status}`);
  const json = await response.json() as {
    items?: Array<{
      full_name: string;
      html_url: string;
      description: string | null;
      stargazers_count: number;
      updated_at?: string;
      open_issues_count?: number;
      license?: { spdx_id?: string } | null;
      topics?: string[];
    }>;
  };
  return (json.items ?? []).map((item) => ({
    name: item.full_name,
    repo: item.html_url,
    description: item.description ?? "No description provided.",
    stars: item.stargazers_count,
    license: item.license?.spdx_id,
    last_updated: item.updated_at,
    open_issues: item.open_issues_count,
    topics: item.topics ?? [],
    source: "github" as const
  }));
}

function adoptionSignal(candidate: LibraryCandidate): string {
  if (candidate.source === "curated") return "curated reference; verify current activity before use";
  const stars = candidate.stars ?? 0;
  if (stars >= 20000) return "high adoption";
  if (stars >= 5000) return "solid adoption";
  if (stars >= 500) return "emerging adoption";
  return "limited adoption signal";
}

export async function buildLibraryRecommendation(root: string, options: RecommendLibsOptions): Promise<LibraryRecommendation> {
  const { goal, inputSources } = await buildRecommendationGoal(root, options);
  let candidates = curatedLibraryCandidates;
  if (options.useNetwork !== false) {
    try {
      const github = await searchPublicGitHub(goal);
      candidates = [...github, ...curatedLibraryCandidates];
    } catch {
      candidates = curatedLibraryCandidates;
    }
  }

  const ranked = candidates
    .map((candidate) => ({ candidate, score: scoreCandidate(goal, candidate) }))
    .sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 5);
  const later = ranked.slice(5, 9);

  return {
    id: makeId("libs", goal),
    created_at: timestamp(),
    goal,
    input_sources: inputSources,
    privacy_boundary: [
      "Only public GitHub search and local memory/project summary files are used.",
      "No private GitHub repositories are read.",
      "No GitHub token is required.",
      "No repository is cloned and no third-party code is executed.",
      "Do not read .env or credential files."
    ],
    recommendations: top.map(({ candidate, score }, index) => ({
      name: candidate.name,
      repo: candidate.repo,
      why_it_fits: score > 0
        ? `Matches the current goal through ${candidate.topics.slice(0, 4).join(", ") || "repository description"}.`
        : "Included as a broadly relevant reference; review fit before adopting.",
      suggested_stage: index === 0 && score > 0 ? "use_now" : score > 1 ? "study_first" : "later",
      complexity: candidate.topics.includes("observability") || candidate.topics.includes("analytics") ? "medium" : "low",
      stars: candidate.stars ?? null,
      license: candidate.license ?? "unknown",
      last_updated: candidate.last_updated ?? "unknown",
      adoption_signal: adoptionSignal(candidate),
      risks: [
        candidate.source === "github" ? "Public GitHub metadata can be noisy; inspect README and license before adoption." : "Curated fallback; verify current maintenance before adoption.",
        "Do not install or run this library automatically from a recommendation."
      ],
      next_step: "Generate a source card or repo analysis before adding this to a formal Skill."
    })),
    rejected_or_later: later.map(({ candidate }) => ({
      name: candidate.name,
      repo: candidate.repo,
      reason: "Potentially useful, but weaker fit for the current goal or better saved for a later stage."
    })),
    questions_for_user: [
      "Which recommended library should be analyzed as a source next?",
      "Is the current goal more about building, learning, growth, or debugging?"
    ]
  };
}

export function renderLibraryRecommendation(recommendation: LibraryRecommendation): string {
  return frontmatter(recommendation, `# Library Recommendation: ${recommendation.id}

## Goal

${recommendation.goal}

## Privacy Boundary

${recommendation.privacy_boundary.map((item) => `- ${item}`).join("\n")}

## Recommended Libraries

${recommendation.recommendations.map((item, index) => `### ${index + 1}. ${item.name}

- Repo: ${item.repo}
- Stage: ${item.suggested_stage}
- Complexity: ${item.complexity}
- Stars: ${item.stars ?? "unknown"}
- License: ${item.license}
- Last updated: ${item.last_updated}
- Adoption: ${item.adoption_signal}
- Why: ${item.why_it_fits}
- Risks: ${item.risks.join(" ")}
- Next step: ${item.next_step}
`).join("\n")}

## Later / Not First

${recommendation.rejected_or_later.map((item) => `- ${item.name}: ${item.reason} (${item.repo})`).join("\n") || "- None"}

## Questions

${recommendation.questions_for_user.map((item) => `- ${item}`).join("\n")}
`);
}

export async function writeLibraryRecommendation(root: string, recommendation: LibraryRecommendation): Promise<string> {
  const outDir = path.join(root, "recommendations", "libs");
  await ensureDir(outDir);
  const out = path.join(outDir, `${slugify(recommendation.id)}.library_recommendation.md`);
  await writeText(out, renderLibraryRecommendation(recommendation));
  return out;
}
