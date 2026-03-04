import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();

    // Fetch the post
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    // Increment views
    await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

    return NextResponse.json({ post: data });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();
    const body = await request.json();

    const updates: Record<string, unknown> = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.content !== undefined) updates.content = body.content;
    if (body.hero_image !== undefined) updates.hero_image = body.hero_image;
    if (body.category !== undefined) updates.category = body.category;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    if (body.author !== undefined) updates.author = body.author;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.published_at !== undefined) updates.published_at = body.published_at;

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
