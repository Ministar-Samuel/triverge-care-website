import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ students: data || [] });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const body = await request.json();

    const {
        full_name, email, phone, date_of_birth, gender,
        address, emergency_contact_name, emergency_contact_phone,
        next_of_kin, payment_ref, amount_paid
    } = body;

    if (!full_name || !email) {
        return NextResponse.json({ error: 'full_name and email are required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('students')
        .insert({
            full_name,
            email,
            phone: phone || null,
            date_of_birth: date_of_birth || null,
            gender: gender || null,
            address: address || null,
            emergency_contact_name: emergency_contact_name || null,
            emergency_contact_phone: emergency_contact_phone || null,
            next_of_kin: next_of_kin || null,
            payment_ref: payment_ref || null,
            amount_paid: amount_paid || 0,
            status: 'enrolled',
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ student: data }, { status: 201 });
}
