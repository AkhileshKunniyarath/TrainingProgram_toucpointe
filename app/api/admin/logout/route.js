import { NextResponse } from 'next/server';
import { getAdminCookieName, getAdminSessionOptions } from '../../../../lib/admin-auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getAdminCookieName(), '', {
    ...getAdminSessionOptions(),
    maxAge: 0,
  });
  return response;
}
