import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Command } from "commander";
import type { InterviewAnswers } from "../types.js";
import { buildInterviewProposal, ensureProfileMemory, writeProfileProposal } from "../core/profileEvolution.js";

async function askMissing(answers: InterviewAnswers): Promise<InterviewAnswers> {
  const rl = createInterface({ input, output });
  try {
    return {
      role: answers.role || await rl.question("你现在最接近什么角色？例如：独立开发者 / 产品创作者 / 学生 / 团队工程师\n> "),
      currentProjects: answers.currentProjects || await rl.question("你现在主要在做什么项目？多个项目用逗号分隔\n> "),
      goals: answers.goals || await rl.question("你接下来最想做成的 1-3 件事是什么？\n> "),
      aiUseCases: answers.aiUseCases || await rl.question("你最常让 AI 帮你做什么？\n> "),
      frustrations: answers.frustrations || await rl.question("你最不满意 AI 哪些行为？\n> "),
      strengths: answers.strengths || await rl.question("你觉得自己当前最强的能力是什么？\n> "),
      gaps: answers.gaps || await rl.question("你最希望 AI 补足你的哪些短板？\n> "),
      preferences: answers.preferences || await rl.question("你希望 AI 协作时长期遵守什么偏好？\n> "),
      avoid: answers.avoid || await rl.question("哪些方向或做法你明确不想要？\n> ")
    };
  } finally {
    rl.close();
  }
}

export async function runInterview(root: string, answers: InterviewAnswers, interactive = false): Promise<string> {
  await ensureProfileMemory(root);
  const finalAnswers = interactive ? await askMissing(answers) : answers;
  const proposal = buildInterviewProposal(finalAnswers);
  return writeProfileProposal(root, proposal);
}

export function registerInterview(program: Command): void {
  program
    .command("interview")
    .description("Ask onboarding questions and create a profile evolution proposal.")
    .option("--role <text>", "User role")
    .option("--projects <text>", "Current projects")
    .option("--goals <text>", "Goals")
    .option("--ai-use <text>", "Common AI use cases")
    .option("--frustrations <text>", "AI frustrations")
    .option("--strengths <text>", "User strengths")
    .option("--gaps <text>", "Skill gaps")
    .option("--preferences <text>", "Long-term preferences")
    .option("--avoid <text>", "Rejected directions")
    .option("--no-interactive", "Do not ask missing questions")
    .action(async (options: {
      role?: string;
      projects?: string;
      goals?: string;
      aiUse?: string;
      frustrations?: string;
      strengths?: string;
      gaps?: string;
      preferences?: string;
      avoid?: string;
      interactive: boolean;
    }) => {
      const out = await runInterview(process.cwd(), {
        role: options.role,
        currentProjects: options.projects,
        goals: options.goals,
        aiUseCases: options.aiUse,
        frustrations: options.frustrations,
        strengths: options.strengths,
        gaps: options.gaps,
        preferences: options.preferences,
        avoid: options.avoid
      }, options.interactive);
      console.log(`Profile proposal written: ${out}`);
      console.log("Review it, then run `skillbook profile-apply <proposal>` if you accept it.");
    });
}
