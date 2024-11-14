// /app/api/get-session/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ userId: null }, { status: 401 });
  }
  return NextResponse.json({ userId: session.user.user.id });
}