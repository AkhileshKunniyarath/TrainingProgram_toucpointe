import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '../../../lib/content-store';
import { isAdminAuthenticated } from '../../../lib/admin-auth';

export const runtime = 'nodejs';

async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  return authenticated;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid content payload' },
        { status: 400 }
      );
    }

    const updated = await updateSiteContent(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update content' },
      { status: 500 }
    );
  }
}
