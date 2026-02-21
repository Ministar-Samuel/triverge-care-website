import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ appointment: data });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.status) updates.status = body.status;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.scheduled_time) updates.scheduled_time = body.scheduled_time;
    if (body.client_name) updates.client_name = body.client_name;
    if (body.service_type) updates.service_type = body.service_type;

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointment: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
