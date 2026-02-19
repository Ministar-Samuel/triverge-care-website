"use client";

import { AdminCalendar } from "@/components/admin/AdminCalendar";

export default function AdminCalendarPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Availability Manager</h2>
                <p className="text-charcoal/60">Manage your weekly schedule and view appointment details.</p>
            </div>

            <AdminCalendar />
        </div>
    );
}
