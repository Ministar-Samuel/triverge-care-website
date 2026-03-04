import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: Request) {
    const supabase = createAdminClient();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size exceeds 2MB limit' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
        });

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl }, { status: 201 });
}
