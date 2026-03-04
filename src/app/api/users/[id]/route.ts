import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.role) updates.role = body.role;
    if (body.display_name !== undefined) updates.display_name = body.display_name;

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
