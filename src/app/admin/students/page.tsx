"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Student = {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    status: string;
    enrollment_date: string;
    payment_ref: string | null;
    amount_paid: number;
    created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    enrolled: { label: "Enrolled", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:book-bold" },
    graduated: { label: "Graduated", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "solar:square-academic-cap-bold" },
    cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "solar:close-circle-bold" },
};

const STATUS_FILTERS = ["All", "enrolled", "graduated", "cancelled"];

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/students");
            if (res.ok) {
                const data = await res.json();
                setStudents(data.students || []);
            }
        } catch (err) {
            console.error("Failed to fetch students:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Computed stats
    const { totalStudents, enrolledCount, graduatedCount, cancelledCount, totalRevenue } = useMemo(() => {
        let enrolled = 0;
        let graduated = 0;
        let cancelled = 0;
        let revenue = 0;

        for (const s of students) {
            if (s.status === "enrolled") enrolled++;
            else if (s.status === "graduated") graduated++;
            else if (s.status === "cancelled") cancelled++;
            revenue += (s.amount_paid || 0);
        }

        return {
            totalStudents: students.length,
            enrolledCount: enrolled,
            graduatedCount: graduated,
            cancelledCount: cancelled,
            totalRevenue: revenue
        };
    }, [students]);

    // Filtered students
    const filtered = students.filter(s => {
        const matchesSearch = !search ||
            s.full_name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statCards = [
        { label: "Total Students", value: totalStudents.toString(), icon: "solar:users-group-rounded-bold-duotone", color: "text-triverge-blue", bg: "bg-blue-50" },
        { label: "Enrolled", value: enrolledCount.toString(), icon: "solar:book-bold-duotone", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Graduated", value: graduatedCount.toString(), icon: "solar:square-academic-cap-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Cancelled", value: cancelledCount.toString(), icon: "solar:close-circle-bold-duotone", color: "text-red-600", bg: "bg-red-50" },
        { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: "solar:wallet-money-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">HCAP Students</h2>
                <p className="text-charcoal/60">Manage all enrolled students in the Home Care Assistant Programme.</p>
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
                                {f === "All" ? "All Students" : STATUS_CONFIG[f]?.label || f}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-[280px]">
                        <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
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
                        <Icon icon="solar:users-group-rounded-bold-duotone" className="text-5xl mb-3" />
                        <p className="text-lg font-bold">No students found</p>
                        <p className="text-sm">
                            {search || statusFilter !== "All"
                                ? "Try adjusting your filters."
                                : "Students will appear here after enrollment."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Student</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Phone</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Enrolled</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Paid</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((student) => {
                                    const status = STATUS_CONFIG[student.status] || STATUS_CONFIG.enrolled;
                                    return (
                                        <tr key={student.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {student.full_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-charcoal">{student.full_name}</p>
                                                        <p className="text-xs text-charcoal/50">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal/70">{student.phone || "—"}</td>
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
                                                {student.enrollment_date ? format(new Date(student.enrollment_date), "MMM dd, yyyy") : "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-charcoal">
                                                ₦{(student.amount_paid || 0).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/students/${student.id}`}
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
                            Showing <strong>{filtered.length}</strong> of {totalStudents} students
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
