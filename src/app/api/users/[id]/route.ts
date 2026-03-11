import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

async function verifyAdmin() {
    const supabaseClient = await createClient();
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
        return { error: 'Unauthorized', status: 401 };
    }

    const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profileError || (profile?.role !== 'admin' && profile?.role !== 'super_admin')) {
        return { error: 'Forbidden', status: 403 };
    }

    return null;
}

export async function PATCH(request: Request, context: RouteContext) {
    const authCheck = await verifyAdmin();
    if (authCheck) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

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
    const authCheck = await verifyAdmin();
    if (authCheck) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

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
