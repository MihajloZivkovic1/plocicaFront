// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { login } from '../../../../lib'; // Adjust the import to your login helper path

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await login(
      {
        email, password
      }
    );
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}