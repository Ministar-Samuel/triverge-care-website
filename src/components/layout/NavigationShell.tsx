"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";

export function NavigationShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            <main className={cn("flex-grow bg-background", !isAdmin && "pt-[80px]")}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}
