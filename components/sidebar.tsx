"use client";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { Code, Download, ImageIcon,
         LayoutDashboard,
         MessageSquare,
         Music,
         Settings,
         VideoIcon}
         from "lucide-react";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./theme";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({
    weight: "600", 
    subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href:"/dashboard",
        color:"text-teal-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href:"/conversation",
        color:"text-red-400",
    },
    {
        label: "Image Generation Station",
        icon: ImageIcon,
        href:"/image",
        color:"text-rose-600",
    },
    {
        label: "Video Generation Office",
        icon: VideoIcon,
        href:"/video",
        color:"text-fuchsia-300",
    },
    {
        label: "Music Studio",
        icon: Music,
        href:"/music",
        color:"text-cyan-500",
    },
    {
        label: "ChatPPT",
        icon: Code,
        href:"/code",
        color:"text-emerald-500",
    },
    {
        label:"Saved Messages",
        icon: Download,
        href:"/saved",
        color:"text-blue-500", // Adjust color as needed
    },
    {
        label: "Settings Fam",
        icon: Settings,
        href:"/settings",
        color:"text-slate-300",
    },
    
];

interface SidebarProps {
    userApiUsage: number;
    isPro: boolean;
};

const Sidebar = ({
    userApiUsage = 0,
    isPro = false,
}: SidebarProps) => {
    const pathname = usePathname();
    return (
    <ThemeProvider attribute="class">
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-12 h-8 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/logo.png"
                            // width={32}  Adjust width as needed
                            // height={32} Adjust height as needed
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold",montserrat.className)}>
                        Genuis
                    </h1> {/* Adjust text size as needed */}
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                        href ={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-helvetica cursor-pointer hover:text-white hover:bg-slate-400/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                        )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    )) }
                </div>
            </div>
            <div>
                <FreeCounter 
                 isPro = {isPro}
                 userApiUsage = {userApiUsage}
                
                />
                </div>
                 <div className="">
                    <div className="flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
        </div>
    </ThemeProvider>
    );
}

export default Sidebar;

