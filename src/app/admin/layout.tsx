"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
    { name: "Dashboard", href: "/admin", icon: "solar:widget-bold-duotone" },
    { name: "Calendar", href: "/admin/calendar", icon: "solar:calendar-bold-duotone" },
    { name: "Users", href: "/admin/users", icon: "solar:users-group-rounded-bold-duotone" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full bg-[#f8f9fc] font-body">
            {/* Sidebar */}
            <aside className="w-[80px] lg:w-[260px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
                {/* Brand */}
                <div className="h-[80px] flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-100">
                    <div className="w-10 h-10 flex items-center justify-center bg-triverge-blue rounded-xl text-white">
                        <span className="font-heading font-bold text-xl">T</span>
                    </div>
                    <span className="hidden lg:block ml-3 font-heading font-bold text-triverge-blue text-lg">
                        Triverge Admin
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 flex flex-col gap-2 px-2 lg:px-4">
                    {ADMIN_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl transition-colors group relative",
                                    isActive
                                        ? "bg-triverge-blue/10 text-triverge-blue"
                                        : "text-charcoal/70 hover:bg-gray-50 hover:text-charcoal"
                                )}
                            >
                                <Icon
                                    icon={link.icon}
                                    className={cn(
                                        "text-2xl transition-colors",
                                        isActive ? "text-triverge-blue" : "text-charcoal/50 group-hover:text-triverge-blue"
                                    )}
                                />
                                <span className="hidden lg:block font-medium">{link.name}</span>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-triverge-blue rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-charcoal/50">
                            <Icon icon="solar:user-bold" className="text-xl" />
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-bold text-charcoal">Admin User</p>
                            <p className="text-xs text-charcoal/50">admin@triverge.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden h-screen">
                {/* Header */}
                <header className="h-[80px] flex-shrink-0 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-charcoal/60 hover:bg-triverge-blue/10 hover:text-triverge-blue transition-colors"
                            title="Go to Home Page"
                        >
                            <Icon icon="solar:home-bold-duotone" className="text-xl" />
                        </Link>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-charcoal/60 hover:bg-triverge-blue/10 hover:text-triverge-blue transition-colors">
                            <Icon icon="solar:bell-bold-duotone" className="text-xl" />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
