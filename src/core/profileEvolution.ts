import path from "node:path";
import type { InterviewAnswers, ProfileEvolutionProposal } from "../types.js";
import { timestamp } from "../utils/dates.js";
import { ensureDir, listFiles, pathExists, readText, writeIfMissing, writeText } from "../utils/file.js";
import { makeId } from "../utils/ids.js";
import { excerpt } from "../utils/markdown.js";
import { frontmatter, parseFrontmatter } from "../utils/yaml.js";

const profileFiles = {
  user_profile: "user_profile.md",
  preferences: "preferences.md",
  current_focus: "current_focus.md",
  skill_gaps: "skill_gaps.md",
  learning_goals: "learning_goals.md",
  rejected_ideas: "rejected_ideas.md",
  profile_history: "profile_history.md"
};

const emptyUpdates = {
  user_profile: [] as string[],
  preferences: [] as string[],
  current_focus: [] as string[],
  skill_gaps: [] as string[],
  learning_goals: [] as string[],
  rejected_ideas: [] as string[]
};

export async function ensureProfileMemory(root: string): Promise<void> {
  await ensureDir(path.join(root, "proposals", "profile"));
  await ensureDir(path.join(root, "logs", "corrections"));
  await ensureDir(path.join(root, "logs", "repeated_requests"));
  await ensureDir(path.join(root, "logs", "user_feedback"));
  await writeIfMissing(path.join(root, "memory", profileFiles.user_profile), "# User Profile\n\n- Unknown until `skillbook interview` or `skillbook reflect` runs.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.preferences), "# Preferences\n\n- Unknown until `skillbook interview` or `skillbook reflect` runs.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.current_focus), "# Current Focus\n\n- Build a clearer onboarding and profile evolution loop.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.skill_gaps), "# Skill Gaps\n\n- Unknown until `skillbook interview` or `skillbook reflect` runs.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.learning_goals), "# Learning Goals\n\n- Unknown until `skillbook interview` or `skillbook reflect` runs.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.rejected_ideas), "# Rejected Ideas\n\n- Unknown until `skillbook interview` or `skillbook reflect` runs.\n");
  await writeIfMissing(path.join(root, "memory", profileFiles.profile_history), "# Profile History\n\nProfile updates are appended here after confirmed proposals are applied.\n");
  await writeIfMissing(path.join(root, "templates", "profile_evolution_proposal.template.md"), `---
id:
created_at:
trigger_reason:
requires_user_confirmation: true
---

# Profile Evolution Proposal

## Evidence

## Suggested Updates

## Risks
`);
}

function splitList(value?: string): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/[;\n,，；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildInterviewProposal(answers: InterviewAnswers): ProfileEvolutionProposal {
  const role = answers.role?.trim() || "AI-assisted builder";
  const projects = splitList(answers.currentProjects);
  const goals = splitList(answers.goals);
  const useCases = splitList(answers.aiUseCases);
  const frustrations = splitList(answers.frustrations);
  const strengths = splitList(answers.strengths);
  const gaps = splitList(answers.gaps);
  const preferences = splitList(answers.preferences);
  const avoid = splitList(answers.avoid);

  return {
    id: makeId("profile", role),
    created_at: timestamp(),
    trigger_reason: "Initial user interview captured explicit profile information.",
    evidence: [
      { source: "skillbook interview", observation: `User role: ${role}` },
      { source: "skillbook interview", observation: `Current projects: ${projects.join("; ") || "not specified"}` },
      { source: "skillbook interview", observation: `AI use cases: ${useCases.join("; ") || "not specified"}` }
    ],
    suggested_updates: {
      user_profile: [
        `User role: ${role}`,
        ...strengths.map((item) => `Strength: ${item}`)
      ],
      preferences: preferences.map((item) => `Preference: ${item}`),
      current_focus: projects.map((item) => `Current focus: ${item}`),
      skill_gaps: gaps.map((item) => `Skill gap: ${item}`),
      learning_goals: goals.map((item) => `Learning goal: ${item}`),
      rejected_ideas: [
        ...avoid.map((item) => `Avoid: ${item}`),
        ...frustrations.map((item) => `AI frustration: ${item}`)
      ]
    },
    risks: ["Interview answers are self-reported; future behavior should confirm or correct them."],
    questions_for_user: gaps.length ? [] : ["What are the top 1-3 areas where you want AI to compensate for your current limits?"],
    requires_user_confirmation: true
  };
}

async function collectEvidenceText(root: string): Promise<Array<{ source: string; text: string }>> {
  const candidates: string[] = [];
  for (const file of ["README.md", "AGENTS.md", "package.json"]) {
    const full = path.join(root, file);
    if (await pathExists(full)) candidates.push(full);
  }
  candidates.push(...(await listFiles(path.join(root, "docs"), ".md")).slice(0, 30));
  candidates.push(...(await listFiles(path.join(root, "memory"), ".md")).slice(0, 20));
  candidates.push(...(await listFiles(path.join(root, "logs", "corrections"), ".md")).slice(0, 20));
  candidates.push(...(await listFiles(path.join(root, "logs", "repeated_requests"), ".md")).slice(0, 20));
  candidates.push(...(await listFiles(path.join(root, "logs", "user_feedback"), ".md")).slice(0, 20));

  const evidence: Array<{ source: string; text: string }> = [];
  for (const file of candidates) {
    const text = await readText(file);
    evidence.push({ source: path.relative(root, file), text: text.slice(0, 1800) });
  }
  return evidence;
}

function inferUpdates(evidence: Array<{ source: string; text: string }>): ProfileEvolutionProposal["suggested_updates"] {
  const joined = evidence.map((item) => item.text).join("\n").toLowerCase();
  const updates = structuredClone(emptyUpdates);

  if (/skill|prompt|agent|codex|claude|gemini/.test(joined)) {
    updates.current_focus.push("Current focus: AI Agent Skill, prompt, and workflow systems.");
    updates.learning_goals.push("Learning goal: Turn repeated AI collaboration patterns into reusable skills and prompts.");
  }
  if (/proposal|review|confirm|confirmation|确认|提案/.test(joined)) {
    updates.preferences.push("Preference: Use proposal-first changes before modifying durable memory or formal skills.");
  }
  if (/github|open source|开源/.test(joined)) {
    updates.preferences.push("Preference: Search GitHub/open-source references before building custom systems from scratch.");
  }
  if (/mvp|local|cli|filesystem|markdown|yaml/.test(joined)) {
    updates.preferences.push("Preference: Favor local-first, file-based MVPs before adding databases or cloud services.");
  }
  if (/growth|seo|reddit|content|marketing|分发/.test(joined)) {
    updates.current_focus.push("Current focus: Product growth, SEO, Reddit, and content distribution.");
    updates.skill_gaps.push("Skill gap: Needs structured growth experiments and channel-fit judgment.");
  }
  if (/bug|failure|debug|error|失败|修复/.test(joined)) {
    updates.skill_gaps.push("Skill gap: Needs evidence-first debugging, logs, and regression checks.");
  }
  if (/over[- ]?design|过度设计|database|cloud/.test(joined)) {
    updates.rejected_ideas.push("Avoid: Expanding into heavy architecture before the MVP loop is proven.");
  }
  if (!updates.current_focus.length) {
    updates.current_focus.push("Current focus: Clarify the user's active project goals through interview and project reflection.");
  }
  if (!updates.skill_gaps.length) {
    updates.skill_gaps.push("Skill gap: Not enough logged corrections or repeated requests yet; keep collecting evidence.");
  }

  return updates;
}

export async function buildProfileReflectionProposal(root: string): Promise<ProfileEvolutionProposal> {
  const evidenceText = await collectEvidenceText(root);
  const selected = evidenceText.slice(0, 8).map((item) => ({
    source: item.source,
    observation: excerpt(item.text, 220)
  }));
  return {
    id: makeId("profile", "reflection"),
    created_at: timestamp(),
    trigger_reason: "Project files and memory/log records suggest the user profile may need an update.",
    evidence: selected,
    suggested_updates: inferUpdates(evidenceText),
    risks: [
      "This is inferred from project artifacts and may overfit to the current repository.",
      "Apply only after the user confirms the profile direction."
    ],
    questions_for_user: [
      "Are these inferred focus areas still current?",
      "Which suggested gap should become the next Skill?"
    ],
    requires_user_confirmation: true
  };
}

export function renderProfileEvolutionProposal(proposal: ProfileEvolutionProposal): string {
  const list = (items: string[]) => items.length ? items.map((item) => `- ${item}`).join("\n") : "- None";
  return frontmatter(proposal, `# Profile Evolution Proposal

## Evidence

${proposal.evidence.map((item) => `- ${item.source}: ${item.observation}`).join("\n") || "- None"}

## Suggested User Profile Updates

${list(proposal.suggested_updates.user_profile)}

## Suggested Preferences

${list(proposal.suggested_updates.preferences)}

## Suggested Current Focus

${list(proposal.suggested_updates.current_focus)}

## Suggested Skill Gaps

${list(proposal.suggested_updates.skill_gaps)}

## Suggested Learning Goals

${list(proposal.suggested_updates.learning_goals)}

## Suggested Rejected Ideas

${list(proposal.suggested_updates.rejected_ideas)}

## Risks

${list(proposal.risks)}

## Questions

${list(proposal.questions_for_user)}

> This proposal updates user memory only after explicit 'profile-apply'.
`);
}

export async function writeProfileProposal(root: string, proposal: ProfileEvolutionProposal): Promise<string> {
  await ensureProfileMemory(root);
  const out = path.join(root, "proposals", "profile", `${proposal.id}.profile_evolution_proposal.md`);
  await writeText(out, renderProfileEvolutionProposal(proposal));
  return out;
}

export async function applyProfileProposal(root: string, proposalPath: string): Promise<string[]> {
  await ensureProfileMemory(root);
  const { data } = parseFrontmatter<ProfileEvolutionProposal>(await readText(proposalPath));
  const written: string[] = [];
  const append = async (fileKey: keyof ProfileEvolutionProposal["suggested_updates"], title: string) => {
    const items = data.suggested_updates[fileKey];
    if (!items.length) return;
    const full = path.join(root, "memory", profileFiles[fileKey]);
    const current = await readText(full);
    const addition = `\n\n## Applied ${data.id}\n\n${items.map((item) => `- ${item}`).join("\n")}\n`;
    await writeText(full, current.trimEnd() + addition);
    written.push(full);
  };
  await append("user_profile", "User Profile");
  await append("preferences", "Preferences");
  await append("current_focus", "Current Focus");
  await append("skill_gaps", "Skill Gaps");
  await append("learning_goals", "Learning Goals");
  await append("rejected_ideas", "Rejected Ideas");
  const history = path.join(root, "memory", profileFiles.profile_history);
  const currentHistory = await readText(history);
  await writeText(history, `${currentHistory.trimEnd()}\n\n## ${data.created_at} - ${data.id}\n\nApplied profile proposal from ${path.relative(root, proposalPath)}.\n`);
  written.push(history);
  return written;
}
