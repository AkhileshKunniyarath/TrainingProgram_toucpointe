import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAdminAuthenticated } from '../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (process.env.CONTENT_READ_ONLY === 'true' || process.env.VERCEL === '1') {
    return NextResponse.json(
      { error: 'Image upload is disabled in this deployment. Use local development or external storage.' },
      { status: 501 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only image files are allowed (jpg, png, webp, gif, svg)' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
      .slice(0, 40);
    const fileName = `${safeName}_${timestamp}.${ext}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
