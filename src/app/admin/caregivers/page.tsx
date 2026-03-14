"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Caregiver = {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    location: string | null;
    years_experience: string | null;
    specializations: string[];
    availability: string | null;
    bio: string | null;
    cv_url: string | null;
    status: string;
    created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    new: { label: "New", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:star-bold" },
    reviewed: { label: "Reviewed", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: "solar:eye-bold" },
    approved: { label: "Approved", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "solar:check-circle-bold" },
    rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "solar:close-circle-bold" },
};

const STATUS_FILTERS = ["All", "new", "reviewed", "approved", "rejected"];

export default function AdminCaregiversPage() {
    const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchCaregivers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/caregivers");
            if (res.ok) {
                const data = await res.json();
                setCaregivers(data.caregivers || []);
            }
        } catch (err) {
            console.error("Failed to fetch caregivers:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCaregivers();
    }, [fetchCaregivers]);

    // Computed stats
    const totalCount = caregivers.length;
    const newCount = caregivers.filter(c => c.status === "new").length;
    const reviewedCount = caregivers.filter(c => c.status === "reviewed").length;
    const approvedCount = caregivers.filter(c => c.status === "approved").length;
    const rejectedCount = caregivers.filter(c => c.status === "rejected").length;

    // Filtered
    const filtered = caregivers.filter(c => {
        const matchesSearch = !search ||
            c.full_name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.location && c.location.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statCards = [
        { label: "Total Applicants", value: totalCount.toString(), icon: "solar:users-group-rounded-bold-duotone", color: "text-triverge-blue", bg: "bg-blue-50" },
        { label: "New", value: newCount.toString(), icon: "solar:star-bold-duotone", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Reviewed", value: reviewedCount.toString(), icon: "solar:eye-bold-duotone", color: "text-yellow-600", bg: "bg-yellow-50" },
        { label: "Approved", value: approvedCount.toString(), icon: "solar:check-circle-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Rejected", value: rejectedCount.toString(), icon: "solar:close-circle-bold-duotone", color: "text-red-600", bg: "bg-red-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Caregiver Applications</h2>
                <p className="text-charcoal/60">Review and manage caregiver applications submitted through the &apos;Join Our Team&apos; page.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

            {/* Filters + Table */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {/* Filter Bar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-center gap-3 flex-wrap">
                        {STATUS_FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                                    statusFilter === f
                                        ? "bg-triverge-blue text-white shadow-md"
                                        : "bg-gray-50 text-charcoal/60 hover:bg-gray-100 hover:text-charcoal"
                                )}
                            >
                                {f === "All" ? "All Applicants" : STATUS_CONFIG[f]?.label || f}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-[280px]">
                        <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, or location..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Icon icon="solar:loading-bold" className="text-3xl animate-spin text-charcoal/30" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-charcoal/40">
                        <Icon icon="solar:stethoscope-bold-duotone" className="text-5xl mb-3" />
                        <p className="text-lg font-bold">No applications found</p>
                        <p className="text-sm">
                            {search || statusFilter !== "All"
                                ? "Try adjusting your filters."
                                : "Applications will appear here when caregivers submit forms."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Applicant</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Phone</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Location</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Experience</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Applied</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((cg) => {
                                    const status = STATUS_CONFIG[cg.status] || STATUS_CONFIG.new;
                                    return (
                                        <tr key={cg.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {cg.full_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-charcoal">{cg.full_name}</p>
                                                        <p className="text-xs text-charcoal/50">{cg.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal/70">{cg.phone || "—"}</td>
                                            <td className="px-6 py-4 text-sm text-charcoal/70">{cg.location || "—"}</td>
                                            <td className="px-6 py-4 text-sm text-charcoal/70">{cg.years_experience || "—"}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                                    status.color, status.bg
                                                )}>
                                                    <Icon icon={status.icon} className="text-sm" />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal/70">
                                                {format(new Date(cg.created_at), "MMM dd, yyyy")}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/caregivers/${cg.id}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-triverge-blue hover:bg-triverge-blue/10 transition-colors"
                                                >
                                                    View
                                                    <Icon icon="solar:arrow-right-bold" className="text-sm" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer */}
                {!loading && filtered.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-charcoal/50">
                            Showing <strong>{filtered.length}</strong> of {totalCount} applicants
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
