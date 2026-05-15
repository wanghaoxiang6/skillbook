# AGENTS.md

## Project Goal

SkillBook is a Source-to-Skill Compiler & Evolution System. It turns external sources into reviewed, contextual, versioned updates to an AI skill tree.

## MVP Scope

- TypeScript Node.js CLI
- Markdown, YAML, JSON, and local filesystem
- Source Card generation
- Intake routing
- Update Proposal generation
- Draft apply only
- Usage logs and Evolution Proposal
- User interview and Profile Evolution Proposal
- Library Scout for public GitHub recommendations
- Export placeholders for Claude, ChatGPT, Cursor, Codex, and Gemini

## Do Not Do

- Do not build a Web UI in v1
- Do not add a database
- Do not add cloud sync
- Do not connect a real vector database
- Do not auto-create PRs
- Do not auto-run external repo code
- Do not auto-install unknown dependencies
- Do not directly merge external source content into formal Skill files

## Directory Notes

- `memory/`: context book and user preferences
- `memory/current_focus.md`: active user/project focus
- `memory/skill_gaps.md`: confirmed or inferred user skill gaps
- `memory/profile_history.md`: applied profile proposal history
- `indexes/`: skill tree, skill index, source index, vector manifest
- `skills/`: formal Skill packages
- `sources/raw/`: original sources
- `sources/cards/`: generated Source Cards
- `proposals/intake/`: Update Proposals and draft updates
- `proposals/evolution/`: Evolution Proposals
- `proposals/profile/`: Profile Evolution Proposals
- `recommendations/libs/`: library recommendation reports
- `logs/`: usage, failure, and feedback records
- `templates/`: reusable markdown/yaml templates
- `prompts/`: prompt specs for future LLM providers
- `src/`: CLI and core implementation
- `tests/`: Vitest tests

## Development Commands

```bash
npm install
npm run dev -- init
npx tsx src/cli.ts interview --no-interactive --role "solo builder"
npm run dev -- reflect
npm run dev -- profile
npm run dev -- recommend-libs -- --from-profile --from-gaps
npm run dev -- intake examples/coding-source-example.md
npm run dev -- demo
npm run dev -- doctor
npm run dev -- status
npm run dev -- export --target codex
```

## Test Commands

```bash
npm run build
npm test
npm run typecheck
```

## Code Style

- Keep modules small and single-purpose
- Prefer explicit TypeScript types and Zod schemas
- Keep command handlers thin
- Put reusable behavior in `src/core`
- Put filesystem helpers in `src/utils`
- Write friendly CLI output and clear errors

## Completion Standard

A change is complete when:

- Build passes
- Tests pass
- CLI command behavior is documented or obvious
- Generated proposals do not modify formal skills
- Safety limits remain intact

## Security Limits

- Do not read `.env`
- Do not read secrets
- Do not execute `curl | bash`
- Do not run external repository scripts
- Do not install unknown dependencies
- External material must enter through `sources/raw` and `sources/cards`
- Formal Skill updates require a user-confirmed proposal
- Library Scout must not read private GitHub repositories, require tokens, clone repos, or execute third-party code by default
