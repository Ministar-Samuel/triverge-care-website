"use client";

import { useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";

type Subscriber = {
    id: string;
    email: string;
    subscribed_at: string;
};

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/newsletter");
            if (res.ok) {
                const data = await res.json();
                setSubscribers(data.subscribers || []);
            }
        } catch (err) {
            console.error("Failed to fetch subscribers:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

    const deleteSubscriber = async (email: string) => {
        if (!confirm(`Remove ${email} from the newsletter?`)) return;
        try {
            const res = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, { method: "DELETE" });
            if (res.ok) {
                setSubscribers(prev => prev.filter(s => s.email !== email));
            }
        } catch (err) {
            console.error("Failed to delete subscriber:", err);
        }
    };

    const total = subscribers.length;
    const now = new Date();
    const thisMonth = subscribers.filter(s => {
        const d = new Date(s.subscribed_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const lastMonth = subscribers.filter(s => {
        const d = new Date(s.subscribed_at);
        const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
    }).length;
    const growth = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : (thisMonth > 0 ? 100 : 0);

    const filtered = subscribers.filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()));

    const statCards = [
        { label: "Total Subscribers", value: total.toString(), icon: "solar:users-group-rounded-bold-duotone", color: "text-triverge-blue", bg: "bg-blue-50" },
        { label: "This Month", value: thisMonth.toString(), icon: "solar:calendar-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Growth Rate", value: `${growth >= 0 ? "+" : ""}${growth}%`, icon: "solar:graph-up-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Newsletter Subscribers</h2>
                <p className="text-charcoal/60">Manage subscribers from the blog newsletter section.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/40">All Subscribers</h3>
                    <div className="relative w-[280px]">
                        <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search emails..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Icon icon="solar:loading-bold" className="text-3xl animate-spin text-charcoal/30" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-charcoal/40">
                        <Icon icon="solar:letter-bold-duotone" className="text-5xl mb-3" />
                        <p className="text-lg font-bold">No subscribers yet</p>
                        <p className="text-sm">Subscribers will appear here when people sign up through the blog newsletter.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">#</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Email</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Subscribed</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((sub, i) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-charcoal/40">{i + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-xs">
                                                    {sub.email.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-bold text-charcoal">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-charcoal/60">
                                            {format(new Date(sub.subscribed_at), "MMM dd, yyyy 'at' hh:mm a")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteSubscriber(sub.email)}
                                                className="p-2 rounded-xl text-charcoal/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Delete subscriber"
                                            >
                                                <Icon icon="solar:trash-bin-trash-bold" className="text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && filtered.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-charcoal/50">Showing <strong>{filtered.length}</strong> of {total} subscribers</p>
                    </div>
                )}
            </div>
        </div>
    );
}
