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

    if (payment_ref) {
        try {
            const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
            if (!paystackSecret) {
                console.error('PAYSTACK_SECRET_KEY is not defined in environment variables');
            } else {
                const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${payment_ref}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${paystackSecret}`,
                    },
                });

                const verifyData = await verifyRes.json();

                if (!verifyData.status || verifyData.data.status !== 'success') {
                    return NextResponse.json({ error: 'Invalid or incomplete payment verification' }, { status: 400 });
                }
            }
        } catch (err: unknown) {
            console.error('Paystack verification error:', err);
            return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
        }
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
