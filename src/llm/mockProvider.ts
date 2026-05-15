import type { LlmProvider } from "./provider.js";

export class MockProvider implements LlmProvider {
  async complete(prompt: string): Promise<string> {
    return `Mock response for prompt length ${prompt.length}.`;
  }
}
