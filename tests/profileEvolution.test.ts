import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {
  applyProfileProposal,
  buildInterviewProposal,
  buildProfileReflectionProposal,
  ensureProfileMemory,
  writeProfileProposal
} from "../src/core/profileEvolution.js";

describe("profile evolution", () => {
  it("builds an interview proposal with explicit user gaps", () => {
    const proposal = buildInterviewProposal({
      role: "solo AI product builder",
      currentProjects: "VoiceSlate, SkillBook",
      goals: "ship useful products",
      gaps: "debugging, growth",
      preferences: "GitHub first, proposal before durable memory",
      avoid: "over-engineering"
    });
    expect(proposal.suggested_updates.current_focus).toContain("Current focus: VoiceSlate");
    expect(proposal.suggested_updates.skill_gaps).toContain("Skill gap: debugging");
    expect(proposal.requires_user_confirmation).toBe(true);
  });

  it("reflects project files into a profile proposal", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    await mkdir(path.join(root, "docs"), { recursive: true });
    await writeFile(path.join(root, "README.md"), "SkillBook is a local CLI for AI Agent Skill proposal workflows.", "utf8");
    await writeFile(path.join(root, "docs", "growth.md"), "SEO and Reddit growth experiments need structured judgment.", "utf8");
    const proposal = await buildProfileReflectionProposal(root);
    expect(proposal.suggested_updates.current_focus.join("\n")).toContain("AI Agent Skill");
    expect(proposal.suggested_updates.skill_gaps.join("\n")).toContain("growth");
  });

  it("applies a confirmed profile proposal to memory files", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    await ensureProfileMemory(root);
    const proposal = buildInterviewProposal({
      role: "builder",
      currentProjects: "SkillBook",
      gaps: "product architecture"
    });
    const proposalPath = await writeProfileProposal(root, proposal);
    const written = await applyProfileProposal(root, proposalPath);
    expect(written.some((file) => file.endsWith("skill_gaps.md"))).toBe(true);
    expect(await readFile(path.join(root, "memory", "skill_gaps.md"), "utf8")).toContain("product architecture");
    expect(await readFile(path.join(root, "memory", "profile_history.md"), "utf8")).toContain(proposal.id);
  });
});
