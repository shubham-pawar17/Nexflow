"use client";

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkflowsSearch = () => {
    const[params , setParams] = useWorkflowParams();
    const { searchValue , onSearchChange } = useEntitySearch({
        params,
        setParams,
    });

    return (
        <EntitySearch 
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search Workflows"
        />
    );
};

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    )
};

export const WorkflowHeader = ({ disabled }: { disabled?: boolean }) => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError: (error) => {
                handleError(error);
            },
        })
    }
    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create And Manage Your Workflows"
                onNew={handleCreate}
                newButtonLabel="New Workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />

        </>
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params , setParams] = useWorkflowParams();
    
    return(
        <EntityPagination
        disabled={workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page) => setParams({ ...params, page})}
        />
    )
}


export const WorkflowsContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <EntityContainer
            header={<WorkflowHeader />}
            search={<WorkflowsSearch/>}
            pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    );
};