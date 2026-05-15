import path from "node:path";
import type { EvolutionProposal } from "../types.js";
import { listFiles, readText } from "../utils/file.js";
import { timestamp } from "../utils/dates.js";
import { makeId } from "../utils/ids.js";

export async function buildEvolutionProposal(root: string, skillId: string): Promise<EvolutionProposal> {
  const usageFiles = await listFiles(path.join(root, "logs", "usage"), ".md");
  const failureFiles = await listFiles(path.join(root, "logs", "failures"), ".md");
  const relevantUsage: string[] = [];
  for (const file of usageFiles) {
    const content = await readText(file);
    if (content.includes(`skill: ${skillId}`) || content.includes(`skill_id: ${skillId}`)) relevantUsage.push(file);
  }
  const relevantFailures: string[] = [];
  for (const file of failureFiles) {
    const content = await readText(file);
    if (content.includes(skillId)) relevantFailures.push(file);
  }
  const evidence = [...relevantUsage, ...relevantFailures];
  const reached = relevantFailures.length >= 2 || relevantUsage.length >= 3;
  return {
    id: makeId("evolution", skillId),
    skill_id: skillId,
    created_at: timestamp(),
    trigger_reason: reached
      ? "Usage/failure evidence reached the MVP evolution threshold."
      : "Threshold not reached yet; generated as a low-risk draft for review.",
    evidence_logs: evidence,
    observed_pattern: reached
      ? "Repeated usage suggests a reusable rule or eval should be considered."
      : "Not enough repeated evidence for automatic evolution.",
    suggested_change_type: relevantFailures.length >= 2 ? "add_warning" : "add_example",
    suggested_changes: reached
      ? ["Add one evidence-backed rule or eval after human review."]
      : ["Keep collecting logs before changing the formal skill."],
    risk: reached ? "medium" : "low",
    requires_user_confirmation: true
  };
}
