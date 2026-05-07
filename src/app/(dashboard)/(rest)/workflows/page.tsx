import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflow";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydarteClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import type { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";


type Props = {
    searchParams: Promise<SearchParams>;
}
const Page = async ({ searchParams }: Props) => {

    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);

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