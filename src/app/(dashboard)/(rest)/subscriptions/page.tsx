"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

const Page = () => {
    const trpc = useTRPC();
    const testai = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("Success");
        },
        onError: ({ message }) => {
            toast.error(message)
        }
    }));

    return (
        <Button onClick={() => testai.mutate()}>
            Click to check subscription
        </Button>
    )
}

export default Page;