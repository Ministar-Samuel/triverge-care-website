"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Appointment = {
    id: string;
    client_name: string;
    service_type: string;
    scheduled_time: string;
    status: string;
    notes: string | null;
    created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: "solar:clock-circle-bold" },
    confirmed: { label: "Confirmed", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:check-circle-bold" },
    completed: { label: "Completed", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "solar:verified-check-bold" },
    cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "solar:close-circle-bold" },
    rescheduled: { label: "Rescheduled", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: "solar:calendar-bold" },
};

const SERVICE_TYPES = ["All", "Home Care", "Rehabilitation", "Respite Care", "Free Consultation", "Skilled Nursing", "Dementia Care", "Physiotherapy"];

export default function AdminBookingsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [actionMenuId, setActionMenuId] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/bookings");
            if (res.ok) {
                const data = await res.json();
                setAppointments(data.appointments);
            }
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            setActionMenuId(null);
            fetchBookings();
        } catch (err) {
            console.error("Failed to update:", err);
        }
    };

    const deleteBooking = async (id: string) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;
        try {
            await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            setActionMenuId(null);
            fetchBookings();
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    // Filtered list
    const filtered = appointments.filter(a => {
        const matchService = filter === "All" || a.service_type.toLowerCase().includes(filter.toLowerCase());
        const matchStatus = statusFilter === "All" || a.status === statusFilter.toLowerCase();
        return matchService && matchStatus;
    });

    // Stats
    const totalBookings = appointments.length;
    const pending = appointments.filter(a => a.status === "pending").length;
    const confirmed = appointments.filter(a => a.status === "confirmed").length;
    const completed = appointments.filter(a => a.status === "completed").length;
    const cancelled = appointments.filter(a => a.status === "cancelled").length;

    const statCards = [
        { label: "Total Bookings", value: totalBookings, icon: "solar:calendar-bold-duotone", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending", value: pending, icon: "solar:clock-circle-bold-duotone", color: "text-yellow-600", bg: "bg-yellow-50" },
        { label: "Confirmed", value: confirmed, icon: "solar:check-circle-bold-duotone", color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Completed", value: completed, icon: "solar:verified-check-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Cancelled", value: cancelled, icon: "solar:close-circle-bold-duotone", color: "text-red-600", bg: "bg-red-50" },
    ];

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold font-heading text-charcoal mb-1">Bookings Management</h2>
                    <p className="text-charcoal/60">Overview and management of all appointments.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Icon icon="solar:add-circle-bold" className="text-xl" />
                    Add Booking
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <Icon icon={stat.icon} className="text-xl" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold font-heading text-charcoal">{loading ? "..." : stat.value}</p>
                        <p className="text-xs text-charcoal/50 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <Icon icon="solar:filter-bold-duotone" className="text-charcoal/40" />
                    <span className="text-sm font-bold text-charcoal/60">Filter:</span>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-charcoal bg-gray-50 focus:outline-none focus:ring-2 focus:ring-healing-teal/30"
                >
                    {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-charcoal bg-gray-50 focus:outline-none focus:ring-2 focus:ring-healing-teal/30"
                >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                </select>
                <span className="ml-auto text-sm text-charcoal/50">{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm min-h-[500px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/50">Client</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/50">Service</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/50">Date & Time</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/50">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-charcoal/40">Loading bookings...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-charcoal/40">No bookings found.</td></tr>
                            ) : (
                                filtered.map((appt) => {
                                    const statusInfo = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending;
                                    return (
                                        <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/bookings/${appt.id}`} className="hover:text-triverge-blue transition-colors">
                                                    <p className="font-bold text-charcoal">{appt.client_name}</p>
                                                    <p className="text-xs text-charcoal/40 mt-0.5">ID: {appt.id.slice(0, 8)}...</p>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-charcoal">{appt.service_type}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-charcoal">
                                                    {format(new Date(appt.scheduled_time), "MMM dd, yyyy")}
                                                </p>
                                                <p className="text-xs text-charcoal/50">
                                                    {format(new Date(appt.scheduled_time), "hh:mm a")}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                                    statusInfo.color, statusInfo.bg
                                                )}>
                                                    <Icon icon={statusInfo.icon} className="text-sm" />
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right relative">
                                                <button
                                                    onClick={() => setActionMenuId(actionMenuId === appt.id ? null : appt.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Icon icon="solar:menu-dots-bold" className="text-charcoal/50" />
                                                </button>
                                                {actionMenuId === appt.id && (
                                                    <div className="absolute right-6 bottom-0 mb-10 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 min-w-[200px]">
                                                        <Link
                                                            href={`/admin/bookings/${appt.id}`}
                                                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal transition-colors"
                                                        >
                                                            <Icon icon="solar:eye-bold" className="text-blue-500" />
                                                            View Details
                                                        </Link>
                                                        {appt.status !== "confirmed" && (
                                                            <button onClick={() => updateStatus(appt.id, "confirmed")} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal w-full text-left transition-colors">
                                                                <Icon icon="solar:check-circle-bold" className="text-blue-500" />
                                                                Mark Confirmed
                                                            </button>
                                                        )}
                                                        {appt.status !== "completed" && (
                                                            <button onClick={() => updateStatus(appt.id, "completed")} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal w-full text-left transition-colors">
                                                                <Icon icon="solar:verified-check-bold" className="text-green-500" />
                                                                Mark Completed
                                                            </button>
                                                        )}
                                                        {appt.status !== "rescheduled" && (
                                                            <button onClick={() => updateStatus(appt.id, "rescheduled")} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal w-full text-left transition-colors">
                                                                <Icon icon="solar:calendar-bold" className="text-purple-500" />
                                                                Mark Rescheduled
                                                            </button>
                                                        )}
                                                        {appt.status !== "cancelled" && (
                                                            <button onClick={() => updateStatus(appt.id, "cancelled")} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-charcoal w-full text-left transition-colors">
                                                                <Icon icon="solar:close-circle-bold" className="text-orange-500" />
                                                                Cancel Booking
                                                            </button>
                                                        )}
                                                        <div className="border-t border-gray-100 my-1" />
                                                        <button onClick={() => deleteBooking(appt.id)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 w-full text-left transition-colors">
                                                            <Icon icon="solar:trash-bin-trash-bold" className="text-red-500" />
                                                            Delete Booking
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Booking Modal */}
            {showAddModal && (
                <AddBookingModal
                    onClose={() => setShowAddModal(false)}
                    onSaved={() => { setShowAddModal(false); fetchBookings(); }}
                />
            )}
        </div>
    );
}

/* ──────────── Add Booking Modal ──────────── */

function AddBookingModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
    const [form, setForm] = useState({
        client_name: "",
        service_type: "Home Care",
        date: "",
        time: "09:00",
        status: "confirmed",
        notes: ""
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.client_name || !form.date || !form.time) {
            setError("Please fill in all required fields.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const scheduled_time = `${form.date}T${form.time}:00Z`;
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_name: form.client_name,
                    service_type: form.service_type,
                    scheduled_time,
                    status: form.status,
                    notes: form.notes || null
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create booking");
            }
            onSaved();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[520px] overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold font-heading text-triverge-blue">Add New Booking</h3>
                        <p className="text-sm text-charcoal/50">Manually create an appointment.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Icon icon="solar:close-circle-bold" className="text-xl text-charcoal/40" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">{error}</div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Client Name *</label>
                        <input
                            type="text"
                            value={form.client_name}
                            onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                            placeholder="e.g. Mrs. Folake Adebayo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Service Type *</label>
                        <select
                            value={form.service_type}
                            onChange={e => setForm(f => ({ ...f, service_type: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm bg-white"
                        >
                            <option>Home Care</option>
                            <option>Rehabilitation</option>
                            <option>Respite Care</option>
                            <option>Free Consultation</option>
                            <option>Skilled Nursing</option>
                            <option>Dementia Care</option>
                            <option>Physiotherapy</option>
                            <option>Occupational Therapy</option>
                            <option>Palliative Care</option>
                            <option>Residential Care</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-charcoal mb-1.5">Date *</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-charcoal mb-1.5">Time *</label>
                            <select
                                value={form.time}
                                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm bg-white"
                            >
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="13:00">01:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Status</label>
                        <select
                            value={form.status}
                            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm bg-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Notes (optional)</label>
                        <textarea
                            value={form.notes}
                            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm resize-none"
                            placeholder="Any additional notes..."
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-charcoal hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-4 py-3 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving ? "Saving..." : (
                                <>
                                    <Icon icon="solar:check-circle-bold" />
                                    Create Booking
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
