"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";

type DashboardStats = {
    bookings: number;
    students: number;
    subscribers: number;
};

type Activity = {
    id: string;
    client_name: string;
    service_type: string;
    created_at: string;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({ bookings: 0, students: 0, subscribers: 0 });
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch counts
                const [
                    { count: bookingsCount },
                    { count: studentsCount },
                    { count: subsCount },
                    { data: activityData }
                ] = await Promise.all([
                    supabase.from("appointments").select("*", { count: "exact", head: true }),
                    supabase.from("students").select("*", { count: "exact", head: true }),
                    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
                    supabase.from("appointments").select("id, client_name, service_type, created_at").order("created_at", { ascending: false }).limit(3)
                ]);

                setStats({
                    bookings: bookingsCount || 0,
                    students: studentsCount || 0,
                    subscribers: subsCount || 0
                });

                if (activityData) setRecentActivity(activityData as Activity[]);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { label: "Total Bookings", value: stats.bookings.toString(), icon: "solar:calendar-bold-duotone", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "HCAP Students", value: stats.students.toString(), icon: "solar:diploma-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Subscribers", value: stats.subscribers.toString(), icon: "solar:letter-bold-duotone", color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Revenue (Mo)", value: "₦0", icon: "solar:wallet-money-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Platform Overview</h2>
                <p className="text-charcoal/60">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 shadow-sm">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <Icon icon={stat.icon} className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-charcoal/50 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold font-heading text-charcoal mt-1">
                                {loading ? "..." : stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold font-heading text-lg text-triverge-blue">Recent Activity</h3>
                        <Link href="/admin/calendar" className="text-sm font-bold text-healing-teal hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <p className="text-center text-charcoal/40 py-8">Loading activity...</p>
                        ) : recentActivity.length === 0 ? (
                            <p className="text-center text-charcoal/40 py-8">No recent activity found.</p>
                        ) : (
                            recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-triverge-blue/10 flex items-center justify-center text-triverge-blue">
                                        <Icon icon="solar:user-bold" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-charcoal">New Appointment Request</p>
                                        <p className="text-xs text-charcoal/50">{activity.client_name} requested {activity.service_type}.</p>
                                    </div>
                                    <span className="text-xs font-bold text-charcoal/40">
                                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-triverge-blue to-[#1e3a8a] p-6 rounded-[24px] text-white shadow-lg">
                    <h3 className="font-bold font-heading text-lg mb-2">Quick Actions</h3>
                    <p className="text-white/70 text-sm mb-6">Manage your platform efficiently.</p>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/calendar" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5 text-center">
                            <Icon icon="solar:calendar-add-bold-duotone" className="text-2xl" />
                            <span className="text-sm font-bold">Manage Calendar</span>
                        </Link>
                        <Link href="/admin/users" className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5 text-center">
                            <Icon icon="solar:user-plus-bold-duotone" className="text-2xl" />
                            <span className="text-sm font-bold">Review Users</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
