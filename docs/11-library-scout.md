# Library Scout

Library Scout recommends public open-source libraries based on the user's goal, profile, and skill gaps.

## Commands

```bash
skillbook recommend-libs --goal "build an AI memory system"
skillbook recommend-libs --from-profile
skillbook recommend-libs --from-gaps
skillbook recommend-libs --from-profile --from-gaps
```

Output goes to:

```txt
recommendations/libs/*.library_recommendation.md
```

## Privacy Boundary

V1 only uses:

- Public GitHub search
- Curated fallback library candidates
- Local memory files such as `user_profile.md` and `skill_gaps.md`

V1 does not:

- Read private GitHub repositories
- Require a GitHub token
- Clone repositories
- Execute third-party code
- Read `.env` or credential files
- Upload local memory files

## Product Role

This closes the loop between user understanding and source intake:

```txt
User Profile + Skill Gaps + Current Goal
-> Library Recommendation
-> Source Card / Repo Analysis
-> Update Proposal
```
