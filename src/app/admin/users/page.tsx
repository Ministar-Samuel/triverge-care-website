"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Icon } from "@iconify/react";
import { format } from "date-fns";

type Profile = {
    id: string;
    email: string;
    role: "super_admin" | "admin" | "pending";
    created_at: string;
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        checkUserRole();
        fetchPendingUsers();
    }, []);

    const checkUserRole = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
            setCurrentUserRole(data?.role);
        }
    };

    const fetchPendingUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'pending')
            .order('created_at', { ascending: false });

        if (data) setUsers(data as Profile[]);
        setLoading(false);
    };

    const approveUser = async (userId: string) => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', userId);

        if (!error) {
            // Remove from list locally
            setUsers(prev => prev.filter(u => u.id !== userId));
            alert("User approved successfully!");
        } else {
            alert("Error approving user: " + error.message);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-charcoal/60">Loading users...</div>;
    }

    if (currentUserRole !== 'super_admin') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Icon icon="solar:shield-warning-bold" className="text-6xl text-orange-400 mb-4" />
                <h2 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white">Access Restricted</h2>
                <p className="text-charcoal/60 dark:text-white/60 mt-2 max-w-md">
                    Only Super Administrators can manage system access. Please contact support if you require these permissions.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white">User Management</h1>
                    <p className="text-charcoal/60 dark:text-white/60 mt-1">Review and approve access requests.</p>
                </div>
                <div className="bg-triverge-blue/10 text-triverge-blue px-4 py-2 rounded-full font-bold text-sm">
                    {users.length} Pending Requests
                </div>
            </div>

            {users.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-[24px] p-12 text-center border border-gray-100 dark:border-white/5">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon icon="solar:check-circle-bold" className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-lg text-charcoal dark:text-white">All Caught Up!</h3>
                    <p className="text-charcoal/50 dark:text-white/50">There are no pending access requests at this time.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-full bg-triverge-blue flex items-center justify-center text-white font-bold text-xl">
                                    {user.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal dark:text-white">{user.email}</p>
                                    <p className="text-xs text-charcoal/50 dark:text-white/50">
                                        Requested: {format(new Date(user.created_at), "MMM d, yyyy • h:mm a")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
                                    {user.role}
                                </span>
                                <button
                                    onClick={() => approveUser(user.id)}
                                    className="flex-1 md:flex-none px-6 py-2 bg-healing-teal text-white rounded-xl font-bold hover:bg-healing-teal/90 transition-colors shadow-lg shadow-healing-teal/20"
                                >
                                    Approve Access
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
