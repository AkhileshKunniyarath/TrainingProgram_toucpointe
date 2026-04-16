import { NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminSessionOptions,
  validateAdminPassword,
} from '../../../../lib/admin-auth';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid admin password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      getAdminCookieName(),
      createAdminSessionToken(),
      getAdminSessionOptions()
    );

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Unable to sign in' },
      { status: 400 }
    );
  }
}
