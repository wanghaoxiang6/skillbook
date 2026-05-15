import path from "node:path";
import { readText } from "../utils/file.js";

export async function loadPrompt(root: string, name: string): Promise<string> {
  return readText(path.join(root, "prompts", name));
}
