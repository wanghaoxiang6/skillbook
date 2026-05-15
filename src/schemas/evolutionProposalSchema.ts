import { z } from "zod";

export const evolutionProposalSchema = z.object({
  id: z.string(),
  skill_id: z.string(),
  created_at: z.string(),
  trigger_reason: z.string(),
  evidence_logs: z.array(z.string()),
  observed_pattern: z.string(),
  suggested_change_type: z.enum([
    "add_rule",
    "modify_rule",
    "remove_rule",
    "add_example",
    "add_eval",
    "add_warning",
    "split_skill",
    "merge_skill"
  ]),
  suggested_changes: z.array(z.string()),
  risk: z.enum(["low", "medium", "high"]),
  requires_user_confirmation: z.boolean()
});
