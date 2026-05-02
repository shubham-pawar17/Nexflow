import { AppHeader } from "@/components/app-header";


const Layout = ({ children }: { children: React.ReactNode; }) => {
    return (
    <>
    <AppHeader/>
        <main>
            {children}
        </main>
    </>
    );
};

export default Layout;