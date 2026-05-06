import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflow";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydarteClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Page = async () => {

    await requireAuth();
    prefetchWorkflows();

    return (
        <WorkflowsContainer>
            <HydarteClient>
                <ErrorBoundary fallback={<p>Error!</p>}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <WorkflowsList/>
                    </Suspense>
                </ErrorBoundary>
            </HydarteClient>
        </WorkflowsContainer>
    )
};

export default Page;