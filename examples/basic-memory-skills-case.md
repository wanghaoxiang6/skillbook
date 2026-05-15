# Case: basic-memory-skills README

Source: https://github.com/basicmachines-co/basic-memory-skills

Source type: GitHub README

Why this case matters:

`basic-memory-skills` is a public Skill collection that teaches AI coding agents how to use Basic Memory's MCP tools. It is close enough to SkillBook's domain to be relevant, but different enough to test whether SkillBook can avoid blindly copying another project's assumptions.

## Source Card Summary

The README presents a set of agent Skills for memory task tracking, note writing, schema management, reflection, research, metadata search, and memory defragmentation. It treats Skills as focused markdown instruction packages that teach agents when and how to use specific tools.

## Reusable Patterns

- Split memory behavior into narrow Skills instead of one large instruction file.
- Give each Skill a clear trigger scenario.
- Include installation paths for multiple agents.
- Treat memory maintenance as a lifecycle, including reflection, schema drift, and defragmentation.
- Use local-first markdown as the durable storage layer.

## Recommended SkillBook Decision

Decision: `partial_accept`

Reason:

The source is relevant to SkillBook's Skill design and evolution model, but it assumes the presence of Basic Memory MCP tools. SkillBook should absorb the structural patterns, not the tool-specific commands.

## Recommended Targets

- `skills/meta/source-to-skill-router`
  - Add as reference for routing source material into focused Skills.
- `skills/meta/skill-evolution-engine`
  - Add as example for memory reflection and defragmentation ideas.
- `docs/04-skill-tree-design.md`
  - Add the principle that Skills should remain narrow and trigger-driven.

## Accepted Items

Rules:

- Keep each Skill focused on one durable behavior.
- Every Skill should describe when it should be used, not only what it does.
- Memory maintenance should include cleanup, reflection, and drift detection, not only adding notes.

Examples:

- A Skill collection can be organized around tasks, notes, schema, reflection, research, and maintenance.
- Agent compatibility can be documented by explaining where each platform loads `SKILL.md`.

Warnings:

- Do not copy provider-specific or MCP-specific commands unless the user has installed those tools.
- Do not let memory maintenance become a reason to store every raw source.

References:

- `basicmachines-co/basic-memory-skills` as a public example of focused agent memory Skills.

## Rejected Items

- Basic Memory Cloud promotion
  - Reason: commercial service details are not relevant to SkillBook's local MVP.
- MCP-specific tool usage
  - Reason: SkillBook v0.1 does not require Basic Memory or any MCP server.
- Installing all Skills by default
  - Reason: SkillBook should prefer context packing and narrow routing over loading everything.

## Pollution Risk

Medium.

This source is very relevant, which makes it tempting to absorb too much. SkillBook should preserve its own central idea: reviewed source-to-skill updates, not general-purpose memory management.
