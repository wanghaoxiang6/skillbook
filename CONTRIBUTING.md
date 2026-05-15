# Contributing

Thanks for helping improve SkillBook.

## Development

```bash
npm install
npm run build
npm test
```

## Local CLI

```bash
npm run dev -- init
npm run dev -- onboard
npm run dev -- demo
```

## Contribution Rules

- Keep v1 local-first: CLI, Markdown, YAML, JSON, and filesystem.
- Do not add a database, hosted service, or private GitHub access without a design proposal.
- Do not make `apply` commands modify formal Skills without user confirmation.
- Do not execute third-party repository code in tests or demos.
- Add or update tests for behavioral changes.

## Good First Areas

- Better source parsing
- Better library recommendation ranking
- More export adapters
- More example Skills
- Safer profile evolution heuristics
