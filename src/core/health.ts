import path from "node:path";
import { listFiles, pathExists } from "../utils/file.js";

export interface HealthCheck {
  name: string;
  ok: boolean;
  detail: string;
}

export async function getStatus(root: string): Promise<string> {
  const sourceCards = await listFiles(path.join(root, "sources", "cards"), ".md");
  const intakeProposals = await listFiles(path.join(root, "proposals", "intake"), ".md");
  const profileProposals = await listFiles(path.join(root, "proposals", "profile"), ".md");
  const libRecommendations = await listFiles(path.join(root, "recommendations", "libs"), ".md");
  const usageLogs = await listFiles(path.join(root, "logs", "usage"), ".md");
  return `# SkillBook Status

- Source cards: ${sourceCards.length}
- Intake proposals: ${intakeProposals.length}
- Profile proposals: ${profileProposals.length}
- Library recommendations: ${libRecommendations.length}
- Usage logs: ${usageLogs.length}
`;
}

export async function runDoctor(root: string): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];
  const required = [
    "AGENTS.md",
    "memory/user_profile.md",
    "memory/project_context.md",
    "indexes/skill_index.yaml",
    "sources/cards",
    "proposals/intake",
    "proposals/profile",
    "recommendations/libs"
  ];
  for (const rel of required) {
    const ok = await pathExists(path.join(root, rel));
    checks.push({ name: rel, ok, detail: ok ? "found" : "missing" });
  }
  checks.push({
    name: "node",
    ok: Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) >= 20,
    detail: process.versions.node
  });
  return checks;
}

export function renderDoctor(checks: HealthCheck[]): string {
  const rows = checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} ${check.name}: ${check.detail}`);
  const failed = checks.filter((check) => !check.ok).length;
  return `# SkillBook Doctor

${rows.join("\n")}

Result: ${failed === 0 ? "ready" : `${failed} issue(s) found`}
`;
}
