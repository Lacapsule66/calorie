import { openai } from "@ai-sdk/openai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

export const geminiProModel = wrapLanguageModel({
  // @ts-ignore
  model: openai("gpt-4o-mini"),
  middleware: customMiddleware,
});
export const geminiFlashModel = wrapLanguageModel({
  // @ts-ignore
  model: openai("gpt-4o-mini"),
  middleware: customMiddleware,
});
