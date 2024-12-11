// app/api/logout/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  (await cookies()).set('session', '', { expires: new Date(0) });
  return NextResponse.redirect('https://plocica-front.vercel.app/login');


  // return NextResponse.redirect(' http://localhost:3001/login');
}