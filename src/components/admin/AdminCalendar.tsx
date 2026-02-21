"use client";

import { useEffect, useState, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import "react-day-picker/dist/style.css";

interface AdminCalendarProps {
    className?: string;
}

type Appointment = {
    id?: string;
    scheduled_time: string;
    client_name: string;
    service_type: string;
    status: string;
};

export function AdminCalendar({ className }: AdminCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"month" | "week">("month");
    const [data, setData] = useState<{ bookedSlots: string[], appointments: Appointment[] }>({ bookedSlots: [], appointments: [] });
    const [loading, setLoading] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [prefillTime, setPrefillTime] = useState("");

    const fetchAvailability = useCallback(async () => {
        if (!selectedDate) return;
        setLoading(true);
        try {
            const dateStr = format(selectedDate, "yyyy-MM-dd");
            const res = await fetch(`/api/availability?date=${dateStr}`);
            if (res.ok) {
                const result = await res.json();
                setData(result);
            }
        } catch (error) {
            console.error("Error fetching availability:", error);
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchAvailability();
    }, [fetchAvailability]);

    const openBookingModal = (time?: string) => {
        setPrefillTime(time || "09:00");
        setShowBookingModal(true);
    };

    const handleBookingSaved = () => {
        setShowBookingModal(false);
        fetchAvailability();
    };

    const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${className}`}>
                {/* Calendar Widget */}
                <div
                    className="lg:col-span-4 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100"
                    style={{ "--rdp-cell-size": "45px", "--rdp-background-color": "#e0f2f1" } as React.CSSProperties}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading font-bold text-lg text-triverge-blue">Calendar</h3>
                        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setView("month")}
                                className={`p-1.5 rounded-md transition-all ${view === "month" ? "bg-white shadow text-triverge-blue" : "text-gray-400"}`}
                            >
                                <Icon icon="solar:calendar-minimalistic-bold" />
                            </button>
                            <button
                                onClick={() => setView("week")}
                                className={`p-1.5 rounded-md transition-all ${view === "week" ? "bg-white shadow text-triverge-blue" : "text-gray-400"}`}
                            >
                                <Icon icon="solar:list-bold" />
                            </button>
                        </div>
                    </div>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        showOutsideDays
                        className="w-full flex justify-center"
                        modifiersClassNames={{
                            selected: "bg-healing-teal text-white rounded-full"
                        }}
                    />
                </div>

                {/* Selected Date Details */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-triverge-blue">
                                    {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Select a date"}
                                </h2>
                                <p className="text-charcoal/60">
                                    {loading ? "Loading..." : `${TIME_SLOTS.length - data.bookedSlots.length} slots available · ${data.bookedSlots.length} bookings`}
                                </p>
                            </div>
                            <button
                                onClick={() => openBookingModal()}
                                className="px-4 py-2 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors flex items-center gap-2"
                            >
                                <Icon icon="solar:add-circle-bold" />
                                Add Block
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            {/* Time Slots */}
                            <div className="flex flex-col gap-4">
                                {TIME_SLOTS.map((time, i) => {
                                    const booking = data.appointments.find(a => {
                                        const dt = new Date(a.scheduled_time);
                                        const h = dt.getUTCHours().toString().padStart(2, '0');
                                        const m = dt.getUTCMinutes().toString().padStart(2, '0');
                                        return `${h}:${m}` === time;
                                    });

                                    return (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-[100px] text-right font-bold text-charcoal/40 font-heading">
                                                {format(new Date(`2000-01-01T${time}:00Z`), "hh:mm a")}
                                            </div>
                                            <div className="flex-1 min-h-[60px] relative">
                                                {loading ? (
                                                    <div className="absolute inset-0 bg-gray-50 animate-pulse rounded-xl" />
                                                ) : booking ? (
                                                    <div className="absolute inset-0 bg-triverge-blue/5 border-l-4 border-triverge-blue rounded-r-xl p-3 flex justify-between items-center hover:bg-triverge-blue/10 transition-colors cursor-pointer">
                                                        <div>
                                                            <p className="font-bold text-triverge-blue">{booking.client_name}</p>
                                                            <span className="text-xs font-bold uppercase tracking-wider text-healing-teal">{booking.service_type}</span>
                                                        </div>
                                                        <Icon icon="solar:menu-dots-bold" className="text-triverge-blue/50" />
                                                    </div>
                                                ) : (
                                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-100 group-hover:bg-healing-teal/30 transition-colors">
                                                        <button
                                                            onClick={() => openBookingModal(time)}
                                                            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 px-3 py-1 bg-healing-teal/10 text-healing-teal text-xs font-bold rounded-lg hover:bg-healing-teal hover:text-white transition-all"
                                                        >
                                                            + Book Slot
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedDate && (
                <CalendarBookingModal
                    date={format(selectedDate, "yyyy-MM-dd")}
                    time={prefillTime}
                    onClose={() => setShowBookingModal(false)}
                    onSaved={handleBookingSaved}
                />
            )}
        </>
    );
}

/* ──────────── Booking Modal (Calendar-specific) ──────────── */

function CalendarBookingModal({ date, time, onClose, onSaved }: {
    date: string;
    time: string;
    onClose: () => void;
    onSaved: () => void;
}) {
    const [form, setForm] = useState({
        client_name: "",
        service_type: "Home Care",
        time,
        status: "confirmed",
        notes: ""
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.client_name) {
            setError("Client name is required.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const scheduled_time = `${date}T${form.time}:00Z`;
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
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold font-heading text-triverge-blue">Book Appointment</h3>
                        <p className="text-sm text-charcoal/50">
                            {format(new Date(date + "T00:00:00"), "EEEE, MMMM dd, yyyy")}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Icon icon="solar:close-circle-bold" className="text-xl text-charcoal/40" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
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
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Service</label>
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

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Time Slot</label>
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

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-1.5">Notes (optional)</label>
                        <textarea
                            value={form.notes}
                            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm resize-none"
                            placeholder="Any notes..."
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
                                    Book
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
