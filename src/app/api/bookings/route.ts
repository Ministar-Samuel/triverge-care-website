import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('scheduled_time', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointments: data || [] });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const body = await request.json();

    const { client_name, service_type, scheduled_time, status, notes } = body;

    if (!client_name || !service_type || !scheduled_time) {
        return NextResponse.json({ error: 'client_name, service_type, and scheduled_time are required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('appointments')
        .insert({
            client_name,
            service_type,
            scheduled_time,
            status: status || 'pending',
            notes: notes || null
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointment: data }, { status: 201 });
}
