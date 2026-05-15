import { z } from "zod";

export const profileEvolutionProposalSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  trigger_reason: z.string(),
  evidence: z.array(z.object({
    source: z.string(),
    observation: z.string()
  })),
  suggested_updates: z.object({
    user_profile: z.array(z.string()),
    preferences: z.array(z.string()),
    current_focus: z.array(z.string()),
    skill_gaps: z.array(z.string()),
    learning_goals: z.array(z.string()),
    rejected_ideas: z.array(z.string())
  }),
  risks: z.array(z.string()),
  questions_for_user: z.array(z.string()),
  requires_user_confirmation: z.boolean()
});
