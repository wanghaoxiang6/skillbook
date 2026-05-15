# Launch Posts

Use these as starting points. Edit them with real examples before posting.

## Short Positioning

Most AI memory tools try to help agents remember more.

SkillBook tries to solve a different problem: deciding what is worth remembering before it becomes durable agent behavior.

It turns external sources into:

- Source Cards
- Update Proposals
- rejected ideas
- warnings
- evals
- reviewed Skill updates

The default is safety: propose first, apply only after review.

## X / Twitter

I built a small local-first CLI called SkillBook.

The idea: AI agents often get worse when they remember everything.

So instead of dumping articles, repos, and notes straight into memory, SkillBook routes them through a review loop:

source -> source card -> update proposal -> human review -> versioned Skill update

It can also log failures and suggest Skill evolution later, but it does not mutate formal Skills automatically.

Repo: https://github.com/wanghaoxiang6/skillbook

## Reddit

Title:

I built a local-first CLI for reviewing what AI agents should remember

Body:

I have been running into a problem with agent memory: the more you let an AI remember, the easier it is to pollute its behavior with half-useful notes, old project assumptions, or examples that should never become rules.

So I built SkillBook as a small local-first experiment.

It does not try to be a vector database or a prompt collection. The workflow is:

```txt
external source -> source card -> update proposal -> human review -> Skill update
```

The important part is that it can also say no:

- reject a source
- keep it as reference only
- turn it into an example instead of a rule
- flag pollution risk
- ask clarifying questions before changing a Skill

It is TypeScript, filesystem-based, and intentionally boring for the MVP. No database, no cloud service, no automatic execution of external repos.

The demo runs locally:

```bash
npm install
npm run build
npx tsx src/cli.ts demo
npx tsx src/cli.ts doctor
```

I would especially like feedback on whether the source-card -> proposal workflow feels useful, or if it is too much ceremony.

Repo: https://github.com/wanghaoxiang6/skillbook

## Hacker News

Title:

Show HN: SkillBook - reviewed memory updates for AI agent Skills

Body:

SkillBook is a local-first TypeScript CLI for turning external sources into reviewed updates to an AI agent Skill tree.

The goal is not to remember everything. It is to decide what should become a rule, example, eval, warning, reference, or rejected idea before it changes durable agent behavior.

The MVP uses Markdown, YAML, JSON, and the local filesystem. It generates Source Cards and Update Proposals, supports profile evolution notes, and has placeholder exports for Codex, Claude, ChatGPT, Cursor, and Gemini.

Repo: https://github.com/wanghaoxiang6/skillbook

## GitHub Release Notes For v0.1.0

SkillBook v0.1.0 is the first local MVP.

Highlights:

- local CLI
- Source Card generation
- Update Proposal generation
- profile evolution proposals
- library recommendation reports
- demo / status / doctor commands
- starter Skills for routing, evolution, coding, and content
- docs, templates, prompts, and tests

The most important design decision: external sources do not directly mutate formal Skills. SkillBook writes proposals first.
