import type { IntakeDecision, SourceCard, UpdateProposal } from "../types.js";
import { timestamp } from "../utils/dates.js";
import { makeId } from "../utils/ids.js";
import type { SkillIndexFile } from "./skillIndex.js";
import { matchSkills } from "./skillIndex.js";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function decideIntake(card: SourceCard, contextBook: string, skillIndex: SkillIndexFile): UpdateProposal {
  const matches = matchSkills(card, skillIndex);
  const top = matches[0];
  const text = `${card.title} ${card.summary} ${card.problem_solved}`.toLowerCase();
  const rejectSignals = ["unrelated", "无关", "广告", "spam", "casino", "crypto pump"];
  const partialSignals = ["example", "案例", "reference", "参考", "inspiration", "灵感"];
  const relevance = clampScore((top?.score ?? 0) * 22 + (contextBook ? 18 : 0));
  const actionability = clampScore(card.extractable_items.rules.length * 12 + card.extractable_items.evals.length * 8 + 30);
  const novelty = clampScore(card.reusable_patterns.length * 15 + card.core_methods.length * 8 + 25);

  let decision: IntakeDecision = "needs_user_decision";
  if (rejectSignals.some((signal) => text.includes(signal)) || relevance < 25) {
    decision = "reject";
  } else if (partialSignals.some((signal) => text.includes(signal)) || actionability < 50) {
    decision = "partial_accept";
  } else if (relevance >= 60 && actionability >= 50) {
    decision = "accept";
  } else if (relevance >= 40) {
    decision = "reference_only";
  } else {
    decision = "needs_user_decision";
  }

  const accepted = decision === "reject"
    ? { rules: [], examples: [], evals: [], warnings: [], references: card.extractable_items.references }
    : card.extractable_items;

  return {
    id: makeId("proposal", card.title),
    source_card_id: card.id,
    created_at: timestamp(),
    project_understanding: "SkillBook v1 prioritizes local CLI, Markdown/YAML files, proposal-first updates, and human confirmation before changing formal skills.",
    decision,
    relevance_score: relevance,
    novelty_score: novelty,
    actionability_score: actionability,
    pollution_risk: decision === "accept" && card.risk_notes.length > 2 ? "medium" : "low",
    degradation_risk: card.extractable_items.rules.length > 4 ? "medium" : "low",
    recommended_targets: top
      ? [{
          skill_id: top.skill.id,
          action: decision === "reject" ? "add_reference" : "update_existing",
          reason: top.reason
        }]
      : [],
    accepted_items: accepted,
    rejected_items: decision === "reject"
      ? [{ item: card.title, reason: "The source appears weakly related or unsafe for the current SkillBook context." }]
      : [],
    conflicts: [],
    questions_for_user: decision === "needs_user_decision"
      ? ["Should this source be treated as a rule, an example, or reference-only material?"]
      : []
  };
}
