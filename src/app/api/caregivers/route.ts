import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('caregivers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ caregivers: data });
}

export async function POST(request: Request) {
    const supabase = createAdminClient();
    const body = await request.json();

    const { full_name, email, phone, location, years_experience, specializations, availability, bio, cv_url } = body;

    if (!full_name || !email) {
        return NextResponse.json({ error: 'Full name and email are required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('caregivers')
        .insert([{
            full_name,
            email,
            phone: phone || null,
            location: location || null,
            years_experience: years_experience || null,
            specializations: specializations || [],
            availability: availability || null,
            bio: bio || null,
            cv_url: cv_url || null,
            status: 'new',
        }])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ caregiver: data }, { status: 201 });
}
