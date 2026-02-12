import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // Format: YYYY-MM-DD

    if (!date) {
        return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Fetch Bookings for this date
    const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('start_time')
        .eq('booking_date', date)
        .neq('status', 'cancelled'); // Don't count cancelled bookings

    if (bookingsError) {
        return NextResponse.json({ error: bookingsError.message }, { status: 500 });
    }

    // 2. Fetch Overrides (Blocked full days or specific slots)
    const { data: overrides, error: overridesError } = await supabase
        .from('availability_overrides')
        .select('*')
        .eq('date', date)
        .eq('is_available', false);

    if (overridesError) {
        return NextResponse.json({ error: overridesError.message }, { status: 500 });
    }

    // Process blocked slots
    const bookedTimes = bookings?.map((b: { start_time: string }) => b.start_time.slice(0, 5)) || []; // "09:00:00" -> "09:00"

    // If there's a full day override, block everything
    const isFullDayBlocked = overrides?.some((o: { start_time: string | null, end_time: string | null }) => !o.start_time && !o.end_time);

    // Return structured availability
    return NextResponse.json({
        date,
        bookedSlots: bookedTimes,
        isFullDayBlocked: !!isFullDayBlocked,
        overrides: overrides || []
    });
}
