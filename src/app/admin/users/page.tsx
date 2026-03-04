"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Profile = {
    id: string;
    email: string;
    role: "super_admin" | "admin" | "pending";
    created_at: string;
    last_sign_in_at: string | null;
};

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    super_admin: { label: "Super Admin", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: "solar:shield-star-bold" },
    admin: { label: "Admin", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:shield-check-bold" },
    pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: "solar:clock-circle-bold" },
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editRole, setEditRole] = useState("");
    const supabase = createClient();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setCurrentUserId(user.id);
            const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
            setCurrentUserRole(data?.role);

            // Update last_sign_in_at
            await supabase.from("profiles").update({ last_sign_in_at: new Date().toISOString() }).eq("id", user.id);
        }
        fetchUsers();
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            if (res.ok) {
                setEditingId(null);
                fetchUsers();
            }
        } catch (err) {
            console.error("Failed to update role:", err);
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        try {
            const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
            if (res.ok) fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    const totalUsers = users.length;
    const superAdmins = users.filter(u => u.role === "super_admin").length;
    const admins = users.filter(u => u.role === "admin").length;
    const pending = users.filter(u => u.role === "pending").length;

    const lastActive = users
        .filter(u => u.last_sign_in_at)
        .sort((a, b) => new Date(b.last_sign_in_at!).getTime() - new Date(a.last_sign_in_at!).getTime())[0];

    if (currentUserRole && currentUserRole !== "super_admin") {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Icon icon="solar:shield-warning-bold" className="text-6xl text-orange-400 mb-4" />
                <h2 className="text-2xl font-bold font-heading text-triverge-blue">Access Restricted</h2>
                <p className="text-charcoal/60 mt-2 max-w-md">
                    Only Super Administrators can manage system access.
                </p>
            </div>
        );
    }

    const statCards = [
        { label: "Total Users", value: totalUsers.toString(), icon: "solar:users-group-rounded-bold-duotone", color: "text-triverge-blue", bg: "bg-blue-50" },
        { label: "Super Admins", value: superAdmins.toString(), icon: "solar:shield-star-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Admins", value: admins.toString(), icon: "solar:shield-check-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending", value: pending.toString(), icon: "solar:clock-circle-bold-duotone", color: "text-yellow-600", bg: "bg-yellow-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">User Management</h2>
                <p className="text-charcoal/60">Manage all admin users, roles, and access permissions.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-[20px] border border-gray-100 flex items-center gap-4 shadow-sm">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <Icon icon={stat.icon} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-bold font-heading text-charcoal mt-0.5">
                                {loading ? "..." : stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Last Active Info */}
            {lastActive && (
                <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50 text-green-600">
                        <Icon icon="solar:login-3-bold-duotone" className="text-xl" />
                    </div>
                    <div>
                        <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">Last Active Admin</p>
                        <p className="text-sm font-bold text-charcoal">
                            {lastActive.email} — {format(new Date(lastActive.last_sign_in_at!), "MMM dd, yyyy 'at' hh:mm a")}
                        </p>
                    </div>
                </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Icon icon="solar:loading-bold" className="text-3xl animate-spin text-charcoal/30" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">User</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Role</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Joined</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Last Active</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user) => {
                                    const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.pending;
                                    const isMe = user.id === currentUserId;
                                    return (
                                        <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-charcoal">
                                                            {user.email}
                                                            {isMe && <span className="ml-2 text-xs text-healing-teal">(You)</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === user.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={editRole}
                                                            onChange={e => setEditRole(e.target.value)}
                                                            className="px-3 py-1 rounded-lg border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-healing-teal/30"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="super_admin">Super Admin</option>
                                                        </select>
                                                        <button onClick={() => updateRole(user.id, editRole)} className="p-1 text-green-600 hover:bg-green-50 rounded-lg">
                                                            <Icon icon="solar:check-circle-bold" className="text-lg" />
                                                        </button>
                                                        <button onClick={() => setEditingId(null)} className="p-1 text-red-500 hover:bg-red-50 rounded-lg">
                                                            <Icon icon="solar:close-circle-bold" className="text-lg" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", role.color, role.bg)}>
                                                        <Icon icon={role.icon} className="text-sm" />
                                                        {role.label}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal/60">
                                                {format(new Date(user.created_at), "MMM dd, yyyy")}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal/60">
                                                {user.last_sign_in_at
                                                    ? format(new Date(user.last_sign_in_at), "MMM dd, yyyy")
                                                    : "—"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    {!isMe && (
                                                        <>
                                                            <button
                                                                onClick={() => { setEditingId(user.id); setEditRole(user.role); }}
                                                                className="p-2 rounded-lg hover:bg-blue-50 text-charcoal/50 hover:text-triverge-blue transition-colors"
                                                                title="Edit Role"
                                                            >
                                                                <Icon icon="solar:pen-bold" className="text-lg" />
                                                            </button>
                                                            {user.role === "admin" && (
                                                                <button
                                                                    onClick={() => updateRole(user.id, "super_admin")}
                                                                    className="p-2 rounded-lg hover:bg-purple-50 text-charcoal/50 hover:text-purple-600 transition-colors"
                                                                    title="Promote to Super Admin"
                                                                >
                                                                    <Icon icon="solar:shield-star-bold" className="text-lg" />
                                                                </button>
                                                            )}
                                                            {user.role === "pending" && (
                                                                <button
                                                                    onClick={() => updateRole(user.id, "admin")}
                                                                    className="p-2 rounded-lg hover:bg-green-50 text-charcoal/50 hover:text-green-600 transition-colors"
                                                                    title="Approve as Admin"
                                                                >
                                                                    <Icon icon="solar:check-circle-bold" className="text-lg" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteUser(user.id)}
                                                                className="p-2 rounded-lg hover:bg-red-50 text-charcoal/50 hover:text-red-600 transition-colors"
                                                                title="Delete User"
                                                            >
                                                                <Icon icon="solar:trash-bin-trash-bold" className="text-lg" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
