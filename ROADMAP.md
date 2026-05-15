# Roadmap

SkillBook should grow as a reviewed memory workflow, not as a giant automatic memory sink.

## v0.1 - Local MVP

- Local filesystem project structure
- CLI commands for `init`, `profile`, `demo`, `status`, and `doctor`
- Source Card and Update Proposal generation
- Profile evolution proposals
- Library recommendation reports
- Placeholder export adapters for Codex, Claude, ChatGPT, Cursor, and Gemini

## v0.2 - Real Intake Quality

- Improve source type detection
- Add richer conflict detection against existing Skills
- Add a first-class `examples/cases/` folder for real public source examples
- Make `intake` output easier to scan in the terminal
- Add snapshot tests for generated proposal shape

## v0.3 - Better User Discovery

- Make onboarding questions adaptive
- Add `skillbook profile-review`
- Add profile confidence and evidence labels
- Make profile proposals distinguish user goals, preferences, gaps, and rejected patterns

## v0.4 - Practical Export

- Make Codex `AGENTS.md` export production-ready
- Improve Claude `SKILL.md` export
- Add Cursor `.mdc` rule export with frontmatter
- Add export tests against sample Skills

## v0.5 - Open Source Feedback Loop

- Add real intake case submissions from GitHub issues
- Add a small benchmark set for accept / reject / partial accept decisions
- Add release notes with before / after examples
- Publish a short demo article and launch thread

## Not Planned For MVP

- Web UI
- Hosted cloud sync
- Vector database dependency
- Automatic execution of external repositories
- Automatic mutation of formal Skills before user review
