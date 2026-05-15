import { Command } from "commander";
import { exportClaude } from "../exporters/claude.js";
import { exportChatGPT } from "../exporters/chatgpt.js";
import { exportCodex } from "../exporters/codex.js";
import { exportCursor } from "../exporters/cursor.js";
import { exportGemini } from "../exporters/gemini.js";

export function registerExport(program: Command): void {
  program
    .command("export")
    .description("Export SkillBook instructions for an agent target.")
    .argument("[target]", "claude | chatgpt | cursor | codex | gemini")
    .option("--target <target>", "claude | chatgpt | cursor | codex | gemini")
    .action(async (targetArg: string | undefined, options: { target?: string }) => {
      const root = process.cwd();
      const target = options.target ?? targetArg;
      if (!target) throw new Error("Missing export target. Use `skillbook export --target codex` or `skillbook export codex`.");
      const exporters: Record<string, (root: string) => Promise<string>> = {
        claude: exportClaude,
        chatgpt: exportChatGPT,
        cursor: exportCursor,
        codex: exportCodex,
        gemini: exportGemini
      };
      const exporter = exporters[target];
      if (!exporter) throw new Error(`Unsupported export target: ${target}`);
      const out = await exporter(root);
      console.log(`Exported ${target}: ${out}`);
    });
}
