"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

const ADMIN_LINKS = [
    { name: "Dashboard", href: "/admin", icon: "solar:widget-bold-duotone" },
    { name: "Bookings", href: "/admin/bookings", icon: "solar:clipboard-list-bold-duotone" },
    { name: "Calendar", href: "/admin/calendar", icon: "solar:calendar-bold-duotone" },
    { name: "Users", href: "/admin/users", icon: "solar:users-group-rounded-bold-duotone" },
    { name: "Settings", href: "/admin/settings", icon: "solar:settings-bold-duotone" },
];

type UserInfo = {
    email: string;
    displayName: string | null;
    avatarUrl: string | null;
    role: string;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const [user, setUser] = useState<UserInfo | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    // Resolve the page title from the current route
    const getPageTitle = () => {
        if (pathname === "/admin") return "Dashboard";
        if (pathname.startsWith("/admin/bookings")) return "Bookings";
        if (pathname === "/admin/calendar") return "Calendar";
        if (pathname === "/admin/users") return "Users";
        if (pathname === "/admin/settings") return "Settings";
        return "Dashboard";
    };

    const fetchUserInfo = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const { data: profile } = await supabase
            .from("profiles")
            .select("display_name, avatar_url, role")
            .eq("id", authUser.id)
            .single();

        setUser({
            email: authUser.email || "",
            displayName: profile?.display_name || null,
            avatarUrl: profile?.avatar_url || null,
            role: profile?.role || "admin",
        });
    };

    useEffect(() => {
        fetchUserInfo();

        // Re-fetch when settings page updates the profile
        const handler = () => fetchUserInfo();
        window.addEventListener("profile-updated", handler);
        return () => window.removeEventListener("profile-updated", handler);
    }, []);

    const handleSignOut = async () => {
        setSigningOut(true);
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    // Don't render the sidebar shell on login/register pages
    if (pathname === "/admin/login" || pathname === "/admin/register") {
        return <>{children}</>;
    }

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
                        const isActive = link.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(link.href);
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

                {/* User Profile Footer */}
                <div className="p-3 lg:p-4 border-t border-gray-100 relative">
                    <div
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-sm">
                                    {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "A"}
                                </div>
                            )}
                        </div>
                        {/* Name & Email */}
                        <div className="hidden lg:block flex-1 min-w-0">
                            <p className="text-sm font-bold text-charcoal truncate">
                                {user?.displayName || "Admin User"}
                            </p>
                            <p className="text-xs text-charcoal/50 truncate">{user?.email || "Loading..."}</p>
                        </div>
                        {/* Menu trigger */}
                        <Icon icon="solar:alt-arrow-up-bold" className={cn(
                            "hidden lg:block text-charcoal/40 text-lg transition-transform duration-200",
                            showUserMenu ? "rotate-0" : "rotate-180"
                        )} />
                    </div>

                    {/* User Popup Menu */}
                    {showUserMenu && (
                        <>
                            <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
                            <div className="absolute left-3 lg:left-4 right-3 lg:right-4 bottom-[76px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-40">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-charcoal truncate">{user?.displayName || "Admin User"}</p>
                                    <p className="text-xs text-charcoal/50 truncate">{user?.email}</p>
                                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-triverge-blue/10 text-triverge-blue text-[10px] font-bold uppercase tracking-wider">
                                        {user?.role || "admin"}
                                    </span>
                                </div>
                                <Link
                                    href="/admin/settings"
                                    onClick={() => setShowUserMenu(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal transition-colors"
                                >
                                    <Icon icon="solar:settings-bold-duotone" className="text-lg text-charcoal/50" />
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 w-full text-left transition-colors disabled:opacity-60"
                                >
                                    {signingOut ? (
                                        <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-lg" />
                                    ) : (
                                        <Icon icon="solar:logout-2-bold-duotone" className="text-lg" />
                                    )}
                                    {signingOut ? "Signing out..." : "Sign Out"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden h-screen">
                {/* Header */}
                <header className="h-[80px] flex-shrink-0 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue">
                        {getPageTitle()}
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
