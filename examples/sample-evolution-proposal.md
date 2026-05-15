---
id: evolution-sample
skill_id: ai-coding-debugging
created_at: 2026-05-14T00:00:00.000Z
trigger_reason: Two failure cards show missing regression tests.
evidence_logs:
  - logs/failures/example-1.md
  - logs/failures/example-2.md
observed_pattern: Fixes were made without proving the failure cannot return.
suggested_change_type: add_eval
suggested_changes:
  - Add an eval requiring a regression command after bug fixes.
risk: low
requires_user_confirmation: true
---

# Sample Evolution Proposal

Formal Skill updates still require user confirmation.
