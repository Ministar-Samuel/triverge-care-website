import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ subscribers: data || [] });
}

export async function POST(request: Request) {
    const supabase = createAdminClient();
    const body = await request.json();

    if (!body.email) {
        return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email: body.email }, { onConflict: 'email' })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ subscriber: data }, { status: 201 });
}

export async function DELETE(request: Request) {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', email);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
