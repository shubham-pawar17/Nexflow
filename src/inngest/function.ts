// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";
import * as Sentry from "@sentry/nextjs";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai";
import { tr } from "date-fns/locale";


const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic =  createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    Sentry.logger.info('User trigger test log ' , { log_source:'sentry_test'})

    const { steps:geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true
        },
      }
    );

     const { steps:openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true
        },
      }
    );

     const { steps:anthropicSteps } = await step.ai.wrap(
      "aanthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: "You are a helful assistant .",
        prompt: "who is best finisher give me in just name do not give anything else?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true
        },
      }
    );

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps
    };
  },
);