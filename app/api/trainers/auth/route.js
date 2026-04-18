import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.TRAINERS_USERNAME;
    const validPassword = process.env.TRAINERS_PASSWORD;

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Auth failed' }, { status: 500 });
  }
}
