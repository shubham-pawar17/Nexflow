// hook to fetch all workflows using suspense

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

// hook to create new workflow

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workdflow "${data.name}" craeted`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions(),
            );
        },
        onError: (error) => {
            toast.error(`Failde to create workflow: $ 
                {error.message}`);
        },
    }),
);
};