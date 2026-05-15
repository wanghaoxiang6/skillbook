import { Command } from "commander";
import path from "node:path";
import { ensureProfileMemory } from "../core/profileEvolution.js";
import { ensureDir, writeText } from "../utils/file.js";

export async function runOnboard(root: string): Promise<string> {
  await ensureProfileMemory(root);
  const out = path.join(root, "memory", "onboarding_next_steps.md");
  await ensureDir(path.dirname(out));
  await writeText(out, `# SkillBook Onboarding Next Steps

Run these in order:

1. \`skillbook interview\`
2. \`skillbook profile\`
3. \`skillbook gaps\`
4. \`skillbook recommend-libs --from-profile --from-gaps\`
5. \`skillbook intake <source>\`

Rules:

- Interview creates a profile proposal, not final truth.
- Library recommendations use public GitHub search and local memory only.
- No private repositories are read by default.
- Proposals require user confirmation before durable updates.
`);
  return out;
}

export function registerOnboard(program: Command): void {
  program.command("onboard").description("Create the onboarding checklist for a new SkillBook user.").action(async () => {
    const out = await runOnboard(process.cwd());
    console.log(`Onboarding checklist written: ${out}`);
    console.log("Next: run `skillbook interview`.");
  });
}
