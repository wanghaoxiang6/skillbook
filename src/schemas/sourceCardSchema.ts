import { z } from "zod";

export const sourceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  source_type: z.enum(["article", "repo", "readme", "transcript", "case", "doc", "unknown"]),
  source_path_or_url: z.string(),
  created_at: z.string(),
  summary: z.string(),
  problem_solved: z.string(),
  core_methods: z.array(z.string()),
  reusable_patterns: z.array(z.string()),
  technical_stack: z.array(z.string()),
  thinking_patterns: z.array(z.string()),
  applicable_contexts: z.array(z.string()),
  non_applicable_contexts: z.array(z.string()),
  extractable_items: z.object({
    rules: z.array(z.string()),
    examples: z.array(z.string()),
    evals: z.array(z.string()),
    warnings: z.array(z.string()),
    references: z.array(z.string())
  }),
  risk_notes: z.array(z.string())
});
