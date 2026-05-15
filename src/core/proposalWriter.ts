import type { EvolutionProposal, UpdateProposal } from "../types.js";
import { bulletList } from "../utils/markdown.js";
import { frontmatter } from "../utils/yaml.js";

export function renderUpdateProposal(proposal: UpdateProposal): string {
  return frontmatter(proposal, `# Update Proposal: ${proposal.id}

## Decision
${proposal.decision}

## Scores
- Relevance: ${proposal.relevance_score}
- Novelty: ${proposal.novelty_score}
- Actionability: ${proposal.actionability_score}
- Pollution risk: ${proposal.pollution_risk}
- Degradation risk: ${proposal.degradation_risk}

## Project Understanding
${proposal.project_understanding}

## Recommended Targets
${proposal.recommended_targets.map((target) => `- ${target.skill_id}: ${target.action} - ${target.reason}`).join("\n") || "- None"}

## Accepted Rules
${bulletList(proposal.accepted_items.rules)}

## Accepted Examples
${bulletList(proposal.accepted_items.examples)}

## Accepted Evals
${bulletList(proposal.accepted_items.evals)}

## Warnings
${bulletList(proposal.accepted_items.warnings)}

## Rejected Items
${proposal.rejected_items.map((item) => `- ${item.item}: ${item.reason}`).join("\n") || "- None"}

## Questions
${bulletList(proposal.questions_for_user)}

> This proposal is a review artifact. It must not be applied to formal skills without user confirmation.
`);
}

export function renderDraftUpdate(proposal: UpdateProposal): string {
  const target = proposal.recommended_targets[0]?.skill_id ?? "new-skill";
  return `# Draft Skill Update for ${target}

Source proposal: ${proposal.id}

## Proposed Additions

### Rules
${bulletList(proposal.accepted_items.rules)}

### Examples
${bulletList(proposal.accepted_items.examples)}

### Evals
${bulletList(proposal.accepted_items.evals)}

### Warnings
${bulletList(proposal.accepted_items.warnings)}

## Human Confirmation Required

This draft intentionally does not modify the formal Skill package. Review it, edit it, then manually merge the accepted parts.
`;
}

export function renderEvolutionProposal(proposal: EvolutionProposal): string {
  return frontmatter(proposal, `# Evolution Proposal: ${proposal.skill_id}

## Trigger Reason
${proposal.trigger_reason}

## Evidence Logs
${bulletList(proposal.evidence_logs)}

## Observed Pattern
${proposal.observed_pattern}

## Suggested Change Type
${proposal.suggested_change_type}

## Suggested Changes
${bulletList(proposal.suggested_changes)}

## Risk
${proposal.risk}

## Confirmation
Requires user confirmation: ${proposal.requires_user_confirmation ? "yes" : "no"}
`);
}
