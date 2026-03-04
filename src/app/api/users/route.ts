import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users: data || [] });
}
