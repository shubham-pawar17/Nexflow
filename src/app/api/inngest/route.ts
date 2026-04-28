import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { execute } from "@/inngest/function";

//crerate an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    //your function will be passed here later
    execute
  ],
});