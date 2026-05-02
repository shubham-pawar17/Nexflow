"use client";

import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const menuItems = [
    {
        title: "Main",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            }
        ],
    },
    {
        title: "Credentials",
        items: [
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            }
        ],
    },
    {
        title: "Executions",
        items: [
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            }
        ],
    }
];


export const AppSidebar = () => {
    const router=useRouter();
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                    <Link href="/" prefetch>
                    <Image src="/logos/logo.svg" alt="Nexflow" width={120} height={120}/>
                    <span className="font-semibold text-sm">Nexflow</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={
                                            item.url === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(item.url)
                                        }
                                        asChild
                                        className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.url} prefetch>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        tooltip={"Upgrade to pro"}
                        className="gap-x-4 h-10 px-4"
                        onClick={()=>{}}
                        >
                            <StarIcon className="h-4 w-4"/>
                            <span>Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        tooltip={"Billing Portal"}
                        className="gap-x-4 h-10 px-4"
                        onClick={()=>{}}
                        >
                            <CreditCardIcon className="h-4 w-4"/>
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        tooltip={"Sign Out"}
                        className="gap-x-4 h-10 px-4 color-red"
                        onClick={()=>authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/login")
                                },
                            }
                        })}
                        >
                            <LogOutIcon className="h-4 w-4"/>
                            <span>SignOut</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
    ;
}