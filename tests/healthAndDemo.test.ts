import { describe, expect, it } from "vitest";
import { mkdtemp } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { getStatus, renderDoctor, runDoctor } from "../src/core/health.js";
import { runDemo } from "../src/commands/demo.js";

describe("health and demo", () => {
  it("runs a complete demo flow in a clean workspace", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-demo-"));
    const outputs = await runDemo(root);
    expect(outputs.some((item) => item.includes("profile_evolution_proposal.md"))).toBe(true);
    expect(outputs.some((item) => item.includes("library_recommendation.md"))).toBe(true);
    expect(outputs.some((item) => item.includes("source_card.md"))).toBe(true);
    expect(outputs.some((item) => item.includes("update_proposal.md"))).toBe(true);
  });

  it("reports doctor readiness after demo", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-doctor-"));
    await runDemo(root);
    const checks = await runDoctor(root);
    expect(checks.every((check) => check.ok)).toBe(true);
    expect(renderDoctor(checks)).toContain("ready");
  });

  it("shows status counts", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-status-"));
    await runDemo(root);
    const status = await getStatus(root);
    expect(status).toContain("Source cards: 1");
    expect(status).toContain("Library recommendations: 1");
  });
});
