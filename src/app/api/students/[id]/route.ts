import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ student: data });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.status) updates.status = body.status;
    if (body.full_name) updates.full_name = body.full_name;
    if (body.email) updates.email = body.email;
    if (body.phone !== undefined) updates.phone = body.phone;
    if (body.address !== undefined) updates.address = body.address;

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ student: data });
}
