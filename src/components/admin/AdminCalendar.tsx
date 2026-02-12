"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import "react-day-picker/dist/style.css";

interface AdminCalendarProps {
    className?: string;
}

export function AdminCalendar({ className }: AdminCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"month" | "week">("month");

    // Sample data for booked slots (would come from Supabase)
    const bookings = [
        { date: new Date(), time: "09:00 AM", name: "Mrs. Folake Adebayo", type: "Home Care" },
        { date: new Date(), time: "02:00 PM", name: "Mr. Chun", type: "Rehabilitation" },
    ];

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);
    };

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${className}`}>
            {/* Calendar Widget */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-[24px] shadow-sm border border-gray-100 dark:border-white/5">
                <style>{`
                    .rdp { --rdp-cell-size: 45px; --rdp-accent-color: #2ea69a; --rdp-background-color: #e0f2f1; }
                    .rdp-day_selected:not([disabled]) { background-color: var(--rdp-accent-color); color: white; font-weight: bold; border-radius: 50%; }
                    .rdp-day_selected:hover:not([disabled]) { background-color: var(--rdp-accent-color); opacity: 0.8; }
                `}</style>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-lg text-triverge-blue dark:text-white">Calendar</h3>
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                        <button
                            onClick={() => setView("month")}
                            className={`p-1.5 rounded-md transition-all ${view === "month" ? "bg-white dark:bg-slate-800 shadow text-triverge-blue dark:text-white" : "text-gray-400"}`}
                        >
                            <Icon icon="solar:calendar-minimalistic-bold" />
                        </button>
                        <button
                            onClick={() => setView("week")}
                            className={`p-1.5 rounded-md transition-all ${view === "week" ? "bg-white dark:bg-slate-800 shadow text-triverge-blue dark:text-white" : "text-gray-400"}`}
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
                <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white">
                                {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Select a date"}
                            </h2>
                            <p className="text-charcoal/60 dark:text-white/60">
                                {4} slots available · {2} bookings
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors flex items-center gap-2">
                            <Icon icon="solar:add-circle-bold" />
                            Add Block
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                        {/* Time Slots */}
                        <div className="flex flex-col gap-4">
                            {["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"].map((time, i) => {
                                const booking = bookings.find(b => b.time === time);
                                return (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-[100px] text-right font-bold text-charcoal/40 dark:text-white/40 font-heading">
                                            {time}
                                        </div>
                                        <div className="flex-1 min-h-[60px] relative">
                                            {booking ? (
                                                <div className="absolute inset-0 bg-triverge-blue/5 border-l-4 border-triverge-blue rounded-r-xl p-3 flex justify-between items-center hover:bg-triverge-blue/10 transition-colors cursor-pointer">
                                                    <div>
                                                        <p className="font-bold text-triverge-blue dark:text-white">{booking.name}</p>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-healing-teal">{booking.type}</span>
                                                    </div>
                                                    <Icon icon="solar:menu-dots-bold" className="text-triverge-blue/50" />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-100 dark:bg-white/5 group-hover:bg-healing-teal/30 transition-colors">
                                                    <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 px-3 py-1 bg-healing-teal/10 text-healing-teal text-xs font-bold rounded-lg hover:bg-healing-teal hover:text-white transition-all">
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
    );
}
