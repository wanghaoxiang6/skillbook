import { z } from "zod";

export const updateProposalSchema = z.object({
  id: z.string(),
  source_card_id: z.string(),
  created_at: z.string(),
  project_understanding: z.string(),
  decision: z.enum(["accept", "partial_accept", "reference_only", "reject", "needs_user_decision"]),
  relevance_score: z.number(),
  novelty_score: z.number(),
  actionability_score: z.number(),
  pollution_risk: z.enum(["low", "medium", "high"]),
  degradation_risk: z.enum(["low", "medium", "high"]),
  recommended_targets: z.array(z.object({
    skill_id: z.string(),
    action: z.enum(["update_existing", "create_new", "add_example", "add_eval", "add_warning", "add_reference"]),
    reason: z.string()
  })),
  accepted_items: z.object({
    rules: z.array(z.string()),
    examples: z.array(z.string()),
    evals: z.array(z.string()),
    warnings: z.array(z.string()),
    references: z.array(z.string())
  }),
  rejected_items: z.array(z.object({ item: z.string(), reason: z.string() })),
  conflicts: z.array(z.object({
    existing_rule: z.string(),
    new_suggestion: z.string(),
    recommendation: z.string()
  })),
  questions_for_user: z.array(z.string())
});
