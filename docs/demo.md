# Demo

The README uses `docs/assets/skillbook-demo.gif` so the demo plays directly on the GitHub repository homepage.

The higher-quality MP4 lives at `docs/assets/skillbook-demo.mp4`.

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

## Updating The GIF

The current animation is generated with Remotion and shows this command sequence:

```bash
npx tsx src/cli.ts demo
npx tsx src/cli.ts status
npx tsx src/cli.ts doctor
```

Keep future recordings under 30 seconds, show the generated artifact paths, and keep the GIF small enough for a fast README load.
