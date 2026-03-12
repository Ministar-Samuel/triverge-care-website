import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Security: Enforce admin authorization before using createAdminClient
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

export async function GET(request: Request) {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (publishedOnly) {
        query = query.not('published_at', 'is', null);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: data || [] });
}

export async function POST(request: Request) {
    // 🛡️ Sentinel: Enforce admin check before insert to prevent unauthorized blog creation
    const authCheck = await verifyAdmin();
    if (authCheck) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

    const supabase = createAdminClient();
    const body = await request.json();

    const { title, slug, content, hero_image, category, excerpt, author, featured, published_at } = body;

    if (!title || !slug) {
        return NextResponse.json({ error: 'title and slug are required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .insert({
            title,
            slug,
            content: content || null,
            hero_image: hero_image || null,
            category: category || null,
            excerpt: excerpt || null,
            author: author || null,
            featured: featured || false,
            published_at: published_at || new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
}
