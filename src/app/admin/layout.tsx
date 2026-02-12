"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
    { name: "Dashboard", href: "/admin", icon: "solar:widget-bold-duotone" },
    { name: "Calendar", href: "/admin/calendar", icon: "solar:calendar-bold-duotone" },
    { name: "Bookings", href: "/admin/bookings", icon: "solar:clipboard-list-bold-duotone" },
    { name: "Users", href: "/admin/users", icon: "solar:users-group-rounded-bold-duotone" },
    { name: "Settings", href: "/admin/settings", icon: "solar:settings-bold-duotone" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full bg-[#f8f9fc] dark:bg-slate-950 font-body">
            {/* Sidebar */}
            <aside className="w-[80px] lg:w-[260px] flex-shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300">
                {/* Brand */}
                <div className="h-[80px] flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 flex items-center justify-center bg-triverge-blue rounded-xl text-white">
                        <span className="font-heading font-bold text-xl">T</span>
                    </div>
                    <span className="hidden lg:block ml-3 font-heading font-bold text-triverge-blue dark:text-white text-lg">
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
                                        ? "bg-triverge-blue/10 text-triverge-blue dark:bg-white/10 dark:text-white"
                                        : "text-charcoal/70 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-charcoal dark:hover:text-white"
                                )}
                            >
                                <Icon
                                    icon={link.icon}
                                    className={cn(
                                        "text-2xl transition-colors",
                                        isActive ? "text-triverge-blue dark:text-white" : "text-charcoal/50 dark:text-white/40 group-hover:text-triverge-blue dark:group-hover:text-white"
                                    )}
                                />
                                <span className="hidden lg:block font-medium">{link.name}</span>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-triverge-blue dark:bg-white rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-charcoal/50 dark:text-white/50">
                            <Icon icon="solar:user-bold" className="text-xl" />
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-bold text-charcoal dark:text-white">Admin User</p>
                            <p className="text-xs text-charcoal/50 dark:text-white/50">admin@triverge.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden h-screen">
                {/* Header */}
                <header className="h-[80px] flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-white/5 px-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-charcoal/60 dark:text-white/60 hover:bg-triverge-blue/10 hover:text-triverge-blue transition-colors"
                            title="Go to Home Page"
                        >
                            <Icon icon="solar:home-bold-duotone" className="text-xl" />
                        </Link>
                        <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-charcoal/60 dark:text-white/60 hover:bg-triverge-blue/10 hover:text-triverge-blue transition-colors">
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
