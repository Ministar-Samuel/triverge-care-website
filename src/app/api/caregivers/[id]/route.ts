import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('caregivers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ caregiver: data });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.status) updates.status = body.status;
    if (body.notes !== undefined) updates.notes = body.notes;

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('caregivers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ caregiver: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { error } = await supabase
        .from('caregivers')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
