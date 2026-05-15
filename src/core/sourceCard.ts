import path from "node:path";
import type { SourceCard } from "../types.js";
import { timestamp } from "../utils/dates.js";
import { makeId, slugify } from "../utils/ids.js";
import { excerpt, firstHeading } from "../utils/markdown.js";
import { frontmatter } from "../utils/yaml.js";
import type { ReadSourceResult } from "./sourceReader.js";

const stackTerms = ["typescript", "node", "react", "next", "vue", "python", "cli", "yaml", "markdown", "zod", "vitest", "llm", "github"];

function linesMatching(content: string, patterns: RegExp[], fallback: string): string[] {
  const lines = content.split(/\r?\n/).map((line) => line.replace(/^[-*#\s]+/, "").trim()).filter(Boolean);
  const matched = lines.filter((line) => patterns.some((pattern) => pattern.test(line))).slice(0, 5);
  return matched.length ? matched : [fallback];
}

export function buildSourceCard(source: ReadSourceResult): SourceCard {
  const base = firstHeading(source.content) ?? path.basename(source.path);
  const title = base.trim();
  const lower = source.content.toLowerCase();
  const stack = stackTerms.filter((term) => lower.includes(term));
  return {
    id: makeId("src", title),
    title,
    source_type: source.type,
    source_path_or_url: source.path,
    created_at: timestamp(),
    summary: excerpt(source.content),
    problem_solved: linesMatching(source.content, [/problem|pain|解决|问题|目标|goal/i], "The source describes potentially reusable knowledge.")[0],
    core_methods: linesMatching(source.content, [/step|方法|流程|protocol|pattern|how to|实现/i], "Review the source for reusable methods."),
    reusable_patterns: linesMatching(source.content, [/pattern|原则|rule|best practice|经验|复用/i], "Potential pattern requires human review before promotion."),
    technical_stack: stack.length ? stack : ["not specified"],
    thinking_patterns: linesMatching(source.content, [/decide|判断|tradeoff|risk|原则|why|because/i], "Prefer proposal-first review before changing a skill."),
    applicable_contexts: linesMatching(source.content, [/适合|applicable|use when|scenario|场景/i], "Use only when aligned with the context book and current project stage."),
    non_applicable_contexts: linesMatching(source.content, [/不适合|avoid|do not|risk|限制|out of scope/i], "Do not absorb if it conflicts with active decisions."),
    extractable_items: {
      rules: linesMatching(source.content, [/must|should|必须|应该|原则|rule/i], "Candidate rule: verify against user decisions before absorption."),
      examples: linesMatching(source.content, [/example|案例|示例/i], "Candidate example: convert source detail into a focused skill example."),
      evals: linesMatching(source.content, [/test|eval|验收|check|验证/i], "Candidate eval: add a small check only if the behavior is testable."),
      warnings: linesMatching(source.content, [/warning|risk|avoid|不要|风险|反例/i], "Warning: external source should not override the context book."),
      references: [source.path]
    },
    risk_notes: linesMatching(source.content, [/risk|风险|security|secret|env|脚本|install|执行/i], "No obvious high-risk instruction found by the mock analyzer.")
  };
}

export function sourceCardFileName(card: SourceCard): string {
  return `${slugify(card.title)}.${card.id}.source_card.md`;
}

export function renderSourceCard(card: SourceCard): string {
  return frontmatter(card, `# Source Card: ${card.title}

## Summary
${card.summary}

## Problem Solved
${card.problem_solved}

## Reusable Patterns
${card.reusable_patterns.map((item) => `- ${item}`).join("\n")}

## Risk Notes
${card.risk_notes.map((item) => `- ${item}`).join("\n")}
`);
}
