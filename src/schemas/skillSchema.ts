import { z } from "zod";

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  version: z.string(),
  status: z.enum(["draft", "active", "experimental", "deprecated", "archived"]),
  purpose: z.string(),
  target_users: z.array(z.string()),
  trigger_scenarios: z.array(z.string()),
  required_inputs: z.array(z.string()),
  process: z.array(z.string()),
  constraints: z.array(z.string()),
  outputs: z.array(z.string()),
  quality_checks: z.array(z.string()),
  sources: z.array(z.string()),
  metrics: z.object({
    usage_count: z.number(),
    success_count: z.number(),
    failure_count: z.number(),
    user_corrections: z.number(),
    accepted_evolutions: z.number(),
    rejected_evolutions: z.number()
  })
});
