# Security Policy

SkillBook is local-first and proposal-first.

## Defaults

- Does not read `.env` files.
- Does not read credential files.
- Does not require a GitHub token.
- Does not read private GitHub repositories by default.
- Does not clone recommended repositories.
- Does not execute third-party repository code.
- Does not upload local memory files.

## Library Scout

`recommend-libs` uses public GitHub search and curated fallback candidates. It writes a recommendation report only.

## Proposal Safety

External sources enter through Source Cards and Update Proposals. Durable memory or formal Skill updates require explicit apply commands.

## Reporting

If you find a security issue, open a private advisory on the eventual GitHub repository or contact the maintainer directly. Do not include secrets in public issues.
