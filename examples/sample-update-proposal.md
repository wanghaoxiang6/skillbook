---
id: proposal-sample
source_card_id: src-sample
created_at: 2026-05-14T00:00:00.000Z
project_understanding: SkillBook v1 is local CLI and proposal-first.
decision: partial_accept
relevance_score: 78
novelty_score: 62
actionability_score: 70
pollution_risk: low
degradation_risk: low
recommended_targets:
  - skill_id: open-source-repo-analysis
    action: add_eval
    reason: The source includes a testable CLI safety rule.
accepted_items:
  rules:
    - Do not execute external repository scripts during analysis.
  examples: []
  evals:
    - Apply must generate a draft update instead of modifying formal skills.
  warnings:
    - Do not copy cloud/database layers into v1.
  references:
    - examples/coding-source-example.md
rejected_items: []
conflicts: []
questions_for_user: []
---

# Sample Update Proposal

This shows the expected shape of a proposal.
