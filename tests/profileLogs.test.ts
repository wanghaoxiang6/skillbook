import { describe, expect, it } from "vitest";
import { mkdtemp, readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { writeProfileLog } from "../src/core/profileLogs.js";
import { runOnboard } from "../src/commands/onboard.js";

describe("profile logs and onboarding", () => {
  it("writes correction feedback and repeated request logs", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const correction = await writeProfileLog(root, "correction", "Do not start with Web UI.");
    const feedback = await writeProfileLog(root, "feedback", "Recommendation was too heavy.");
    const repeated = await writeProfileLog(root, "repeated", "I keep asking about SEO.");
    expect(await readFile(correction, "utf8")).toContain("Correction Log");
    expect(await readFile(feedback, "utf8")).toContain("User Feedback Log");
    expect(await readFile(repeated, "utf8")).toContain("Repeated Request Log");
  });

  it("writes onboarding next steps", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const out = await runOnboard(root);
    expect(await readFile(out, "utf8")).toContain("skillbook recommend-libs");
  });
});
