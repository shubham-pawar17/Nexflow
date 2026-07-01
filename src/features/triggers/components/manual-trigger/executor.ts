import type { NodeExecutor } from "@/features/executions/types";

type ManualtriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualtriggerData> =
async ({
    nodeId,
    context,
    step,
}) => {
    //TODO: Publish "Loading" state for manual trigger

    const result = await step.run("manual-trigger" , async () => context);

    //TODO: Publish "success" state for manual trigger

    return result;
};