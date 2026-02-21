"use client";

import { useEffect, useState, use } from "react";
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

export default function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);
    const [notesSaved, setNotesSaved] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/bookings/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setAppointment(data.appointment);
                    setNotes(data.appointment.notes || "");
                }
            } catch (err) {
                console.error("Failed to fetch booking:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    const saveNotes = async () => {
        setSavingNotes(true);
        setNotesSaved(false);
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes })
            });
            if (res.ok) {
                const data = await res.json();
                setAppointment(data.appointment);
                setNotesSaved(true);
                setTimeout(() => setNotesSaved(false), 3000);
            }
        } catch (err) {
            console.error("Failed to save notes:", err);
        } finally {
            setSavingNotes(false);
        }
    };

    const updateStatus = async (status: string) => {
        setUpdatingStatus(true);
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                const data = await res.json();
                setAppointment(data.appointment);
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setUpdatingStatus(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-charcoal/40">
                    <Icon icon="solar:loading-bold" className="text-3xl animate-spin" />
                    <p>Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-charcoal/40">
                    <Icon icon="solar:close-circle-bold" className="text-4xl text-red-400" />
                    <p className="text-lg font-bold">Booking not found.</p>
                    <Link href="/admin/bookings" className="text-healing-teal font-bold hover:underline">← Back to Bookings</Link>
                </div>
            </div>
        );
    }

    const statusInfo = STATUS_CONFIG[appointment.status] || STATUS_CONFIG.pending;

    return (
        <div className="max-w-[960px] mx-auto flex flex-col gap-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-charcoal/50">
                <Link href="/admin/bookings" className="hover:text-triverge-blue transition-colors font-medium">Bookings</Link>
                <Icon icon="solar:alt-arrow-right-linear" />
                <span className="text-charcoal font-bold">{appointment.client_name}</span>
            </div>

            {/* Header Card */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-triverge-blue/10 flex items-center justify-center text-triverge-blue">
                            <Icon icon="solar:user-bold-duotone" className="text-3xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-heading text-charcoal">{appointment.client_name}</h2>
                            <p className="text-charcoal/50 text-sm mt-0.5">
                                Booked on {format(new Date(appointment.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                            </p>
                        </div>
                    </div>
                    <span className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border",
                        statusInfo.color, statusInfo.bg
                    )}>
                        <Icon icon={statusInfo.icon} />
                        {statusInfo.label}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Details */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Appointment Info */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                            <Icon icon="solar:document-text-bold-duotone" className="text-xl" />
                            Appointment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Service Type</span>
                                <span className="text-base font-bold text-charcoal">{appointment.service_type}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Scheduled Date</span>
                                <span className="text-base font-bold text-charcoal">
                                    {format(new Date(appointment.scheduled_time), "EEEE, MMMM dd, yyyy")}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Scheduled Time</span>
                                <span className="text-base font-bold text-charcoal">
                                    {format(new Date(appointment.scheduled_time), "hh:mm a")}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Booking ID</span>
                                <span className="text-base font-mono text-charcoal/70">{appointment.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold font-heading text-triverge-blue flex items-center gap-2">
                                <Icon icon="solar:notebook-bold-duotone" className="text-xl" />
                                Session Notes
                            </h3>
                            {notesSaved && (
                                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                    <Icon icon="solar:check-circle-bold" />
                                    Saved
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-charcoal/50 mb-4">
                            Record observations, progress, or action items from this appointment.
                        </p>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm resize-none leading-relaxed"
                            placeholder="e.g. Client showed improved mobility today. Follow-up recommended in 2 weeks..."
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={saveNotes}
                                disabled={savingNotes}
                                className="px-5 py-2.5 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <Icon icon="solar:diskette-bold" />
                                {savingNotes ? "Saving..." : "Save Notes"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="flex flex-col gap-6">

                    {/* Quick Actions */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Quick Actions</h3>
                        <div className="flex flex-col gap-2">
                            {appointment.status !== "confirmed" && (
                                <button
                                    onClick={() => updateStatus("confirmed")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:check-circle-bold" className="text-blue-500 text-lg" />
                                    Confirm Booking
                                </button>
                            )}
                            {appointment.status !== "completed" && (
                                <button
                                    onClick={() => updateStatus("completed")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:verified-check-bold" className="text-green-500 text-lg" />
                                    Mark as Completed
                                </button>
                            )}
                            {appointment.status !== "rescheduled" && (
                                <button
                                    onClick={() => updateStatus("rescheduled")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:calendar-bold" className="text-purple-500 text-lg" />
                                    Mark as Rescheduled
                                </button>
                            )}
                            {appointment.status !== "cancelled" && (
                                <button
                                    onClick={() => updateStatus("cancelled")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:close-circle-bold" className="text-orange-500 text-lg" />
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Timeline</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-charcoal/20 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Booking Created</p>
                                    <p className="text-xs text-charcoal/40">{format(new Date(appointment.created_at), "MMM dd, yyyy 'at' hh:mm a")}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", statusInfo.color.replace("text-", "bg-"))} />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Status: {statusInfo.label}</p>
                                    <p className="text-xs text-charcoal/40">Current status</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-healing-teal mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Scheduled</p>
                                    <p className="text-xs text-charcoal/40">
                                        {format(new Date(appointment.scheduled_time), "MMM dd, yyyy 'at' hh:mm a")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    <Link
                        href="/admin/bookings"
                        className="flex items-center gap-2 text-sm font-bold text-charcoal/50 hover:text-triverge-blue transition-colors"
                    >
                        <Icon icon="solar:arrow-left-bold" />
                        Back to All Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
}
