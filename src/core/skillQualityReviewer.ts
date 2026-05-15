import type { Skill } from "../types.js";

export function reviewSkillQuality(skill: Skill): string[] {
  const issues: string[] = [];
  if (!skill.trigger_scenarios.length) issues.push("Missing trigger scenarios.");
  if (!skill.required_inputs.length) issues.push("Missing required inputs.");
  if (!skill.process.length) issues.push("Missing process steps.");
  if (!skill.outputs.length) issues.push("Missing outputs.");
  if (!skill.sources.length) issues.push("Missing sources; cannot become active.");
  return issues;
}
