import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('student_notes')
        .select('*')
        .eq('student_id', id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ notes: data || [] });
}

export async function POST(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = await createClient();
    const body = await request.json();

    if (!body.content) {
        return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('student_notes')
        .insert({
            student_id: id,
            content: body.content,
            author_email: body.author_email || null,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ note: data }, { status: 201 });
}
