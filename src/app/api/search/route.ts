import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';
import { SERVICES_DETAILS } from '@/lib/data';

// Static pages for search
const STATIC_PAGES = [
    { title: 'Home', description: 'Your one-stop elderly care provider', href: '/', icon: 'solar:home-smile-bold-duotone' },
    { title: 'About Us', description: 'Learn about Triverge Healthcare and our mission', href: '/about', icon: 'solar:users-group-two-rounded-bold-duotone' },
    { title: 'Services', description: 'Explore our comprehensive elderly care services', href: '/services', icon: 'solar:medical-kit-bold-duotone' },
    { title: 'HCAP Training', description: 'Home Care Assistant Programme — 6-week certification', href: '/hcap', icon: 'solar:diploma-bold-duotone' },
    { title: 'HCAP Enrollment', description: 'Enroll in the Home Care Assistant Programme', href: '/hcap/enroll', icon: 'solar:document-add-bold-duotone' },
    { title: 'Blog', description: 'Health tips, caregiving advice, and company updates', href: '/blog', icon: 'solar:notebook-bold-duotone' },
    { title: 'Contact', description: 'Get in touch with Triverge Healthcare', href: '/contact', icon: 'solar:chat-line-bold-duotone' },
    { title: 'Book Consultation', description: 'Schedule a free 30-minute consultation', href: '/book', icon: 'solar:calendar-add-bold-duotone' },
    { title: 'Ibadan Centre', description: 'Triverge Geriatric Centre at Bashorun, Ibadan', href: '/ibadan-centre', icon: 'solar:buildings-bold-duotone' },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim().toLowerCase();

    if (!query || query.length < 2) {
        return NextResponse.json({ pages: [], services: [], posts: [] });
    }

    // 1. Search static pages
    const pages = STATIC_PAGES.filter(
        (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
    );

    // 2. Search services from static data
    const services = Object.entries(SERVICES_DETAILS)
        .filter(([, svc]) =>
            svc.title.toLowerCase().includes(query) ||
            svc.tagline.toLowerCase().includes(query) ||
            svc.description.toLowerCase().includes(query)
        )
        .map(([slug, svc]) => ({
            title: svc.title,
            tagline: svc.tagline,
            href: `/services/${slug}`,
            icon: 'solar:medical-kit-bold-duotone',
        }));

    // 3. Search blog posts from Supabase
    let posts: Array<{ title: string; excerpt: string; href: string; icon: string }> = [];
    try {
        const supabase = createAdminClient();
        const { data } = await supabase
            .from('blog_posts')
            .select('title, excerpt, slug')
            .not('published_at', 'is', null)
            .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
            .limit(5);

        if (data) {
            posts = data.map((post) => ({
                title: post.title,
                excerpt: post.excerpt || '',
                href: `/blog/${post.slug}`,
                icon: 'solar:notebook-bold-duotone',
            }));
        }
    } catch (err) {
        console.error('Search blog error:', err);
    }

    return NextResponse.json({ pages, services, posts });
}
