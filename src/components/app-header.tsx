import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () =>{
    return(
        <header className="flex h-4 shrink items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger/>
        </header>
    );
};