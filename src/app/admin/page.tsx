"use client";

import { Icon } from "@iconify/react";

const STATS = [
    { label: "Total Bookings", value: "124", icon: "solar:calendar-bold-duotone", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
    { label: "HCAP Students", value: "45", icon: "solar:diploma-bold-duotone", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/10" },
    { label: "Subscribers", value: "892", icon: "solar:letter-bold-duotone", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/10" },
    { label: "Revenue (Mo)", value: "₦4.2M", icon: "solar:wallet-money-bold-duotone", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal dark:text-white mb-2">Platform Overview</h2>
                <p className="text-charcoal/60 dark:text-white/60">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <Icon icon={stat.icon} className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-charcoal/50 dark:text-white/50 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold font-heading text-charcoal dark:text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold font-heading text-lg text-triverge-blue dark:text-white">Recent Activity</h3>
                        <button className="text-sm font-bold text-healing-teal hover:underline">View All</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                                <div className="w-10 h-10 rounded-full bg-triverge-blue/10 flex items-center justify-center text-triverge-blue">
                                    <Icon icon="solar:user-bold" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-charcoal dark:text-white">New Booking Request</p>
                                    <p className="text-xs text-charcoal/50 dark:text-white/50">Mrs. Adebayo scheduled a consultation.</p>
                                </div>
                                <span className="text-xs font-bold text-charcoal/40">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-triverge-blue to-[#1e3a8a] p-6 rounded-[24px] text-white shadow-lg">
                    <h3 className="font-bold font-heading text-lg mb-2">Quick Actions</h3>
                    <p className="text-white/70 text-sm mb-6">Manage your platform efficiently.</p>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <Icon icon="solar:calendar-add-bold-duotone" className="text-2xl" />
                            <span className="text-sm font-bold">Add Booking</span>
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <Icon icon="solar:user-plus-bold-duotone" className="text-2xl" />
                            <span className="text-sm font-bold">Enroll Student</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
