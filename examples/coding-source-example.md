# TypeScript CLI Repo Pattern

This README-style source describes a small TypeScript CLI that uses commander, zod schemas, and vitest.

Problem: AI coding projects often jump straight into large frameworks. A smaller CLI can keep the first version reviewable.

Method:

- Keep commands thin.
- Put domain logic in `src/core`.
- Put file writing in small utilities.
- Add tests for source reading, routing decisions, proposal writing, and exporters.

Rule: Do not execute external repository scripts during analysis.

Eval: Given an update proposal, `apply` should create a draft update and should not modify formal Skill files.

Warning: Do not copy a repo's database or cloud layer when the current project has explicitly rejected databases and cloud sync.
