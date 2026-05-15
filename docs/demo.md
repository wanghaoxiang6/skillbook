# Demo

Run:

```bash
npm install
npm run build
npx tsx src/cli.ts demo
npx tsx src/cli.ts status
npx tsx src/cli.ts doctor
```

Expected output:

```txt
SkillBook demo completed. Generated:
- memory/onboarding_next_steps.md
- proposals/profile/*.profile_evolution_proposal.md
- recommendations/libs/*.library_recommendation.md
- sources/cards/*.source_card.md
- proposals/intake/*.update_proposal.md
```

The demo uses local files and curated library candidates. It does not clone repositories, execute third-party code, require GitHub tokens, or read private repositories.

## Recording A GIF

Suggested command sequence for a terminal GIF:

```bash
npx tsx src/cli.ts demo
npx tsx src/cli.ts status
npx tsx src/cli.ts doctor
```

Recommended tools:

- VHS by Charmbracelet
- asciinema
- ScreenToGif on Windows

Keep the recording under 30 seconds and show only the generated artifact paths.
