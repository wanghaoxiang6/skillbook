# Profile Evolution

SkillBook needs to learn the user before it can route sources well.

The user profile is not a static form. It evolves through the same review pattern as Skill updates:

```txt
Interview / Project Files / Corrections / Repeated Requests / Feedback
-> Profile Evolution Proposal
-> Human Review
-> profile-apply
-> Versioned Memory Update
```

## Commands

`skillbook interview` asks onboarding questions and generates a profile proposal.

`skillbook reflect` reads local project files and profile logs, then proposes inferred profile updates.

`skillbook profile-propose` is an alias for generating a profile evolution proposal.

`skillbook profile-apply <proposal>` applies a confirmed proposal to memory files.

`skillbook gaps` prints the current skill gaps.

`skillbook correction "text"` records a user correction as future evidence.

`skillbook feedback "text"` records user feedback about AI behavior, recommendations, or SkillBook itself.

`skillbook repeated "text"` records a repeated request pattern.

## Principles

- Do not let AI define the user without evidence.
- Ask a few high-value questions first.
- Treat project files and repeated requests as evidence, not truth.
- User confirmation is required before durable memory updates.
- Keep profile changes reversible and inspectable.
