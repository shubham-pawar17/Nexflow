// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai";


const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic =  createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {

    const { steps:geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?"
      }
    );

     const { steps:openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?"
      }
    );

     const { steps:anthropicSteps } = await step.ai.wrap(
      "aanthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?"
      }
    );

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps
    };
  },
);