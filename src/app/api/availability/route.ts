import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // Format: YYYY-MM-DD

    if (!date) {
        return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Build date range for the selected day (start of day to end of day in UTC)
    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;

    // Fetch appointments for this date (exclude cancelled)
    const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('scheduled_time, client_name, service_type, status')
        .gte('scheduled_time', startOfDay)
        .lte('scheduled_time', endOfDay)
        .neq('status', 'cancelled');

    if (appointmentsError) {
        return NextResponse.json({ error: appointmentsError.message }, { status: 500 });
    }

    // Extract booked time slots from scheduled_time (e.g. "2026-02-19T09:00:00Z" -> "09:00")
    const bookedTimes = appointments?.map((a: { scheduled_time: string }) => {
        const dt = new Date(a.scheduled_time);
        const hours = dt.getUTCHours().toString().padStart(2, '0');
        const minutes = dt.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }) || [];

    // Return structured availability
    return NextResponse.json({
        date,
        bookedSlots: bookedTimes,
        appointments: appointments || [],
        isFullDayBlocked: false,
    });
}
