import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        executionId : String;
    }>
}

const Page = async ({params}: PageProps ) =>{
await requireAuth();

    const { executionId } = await params;
    return <p>Execution id : {executionId} </p>
};

export default Page;