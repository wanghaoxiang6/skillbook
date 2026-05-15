import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { buildLibraryRecommendation, buildRecommendationGoal, writeLibraryRecommendation } from "../src/core/libraryScout.js";

describe("library scout", () => {
  it("builds a goal from profile and gaps", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    await mkdir(path.join(root, "memory"), { recursive: true });
    await writeFile(path.join(root, "memory", "user_profile.md"), "I build AI agent skill systems.", "utf8");
    await writeFile(path.join(root, "memory", "skill_gaps.md"), "Need prompt evals and growth analytics.", "utf8");
    const result = await buildRecommendationGoal(root, { fromProfile: true, fromGaps: true, useNetwork: false });
    expect(result.goal).toContain("AI agent");
    expect(result.goal).toContain("prompt evals");
  });

  it("recommends libraries without network", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const recommendation = await buildLibraryRecommendation(root, { goal: "AI memory and skill evolution", useNetwork: false });
    expect(recommendation.recommendations.length).toBeGreaterThan(0);
    expect(recommendation.privacy_boundary.join("\n")).toContain("No private GitHub");
  });

  it("writes a recommendation markdown file", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const recommendation = await buildLibraryRecommendation(root, { goal: "SEO and product analytics", useNetwork: false });
    const out = await writeLibraryRecommendation(root, recommendation);
    expect(out).toContain("library_recommendation.md");
    expect(await readFile(out, "utf8")).toContain("# Library Recommendation");
  });
});
