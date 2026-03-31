// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloworld = inngest.createFunction(
  { id: "hello-world" },
 { event: "test/hello.world" },
  async ({ event, step }) => {
    //fetching
    await step.sleep("fetching", "5s");

    //transcribing
    await step.sleep("transcribing", "5s");

    //Sending transcription to AI
    await step.sleep("Sending transcription to AI", "5s");

    await step.run("create-workflow", () => {
        return prisma.workflow.create({
            data: {
                name: "workflow-from-inngest",
            },
        });
    });
  },
);