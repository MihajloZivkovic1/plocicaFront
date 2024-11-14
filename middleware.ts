
import { NextResponse, NextRequest } from "next/server"
import { cookies } from 'next/headers'
import { decrypt } from "./lib"


const protectedRoutes = ['/dashboard', '/edit-profile']
const publicRoutes = ['/login']

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered');

  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  console.log('Accessing path:', path);
  console.log('Is Protected Route:', isProtectedRoute);
  console.log('Session Cookie:', cookie);


  if (!cookie) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
  try {
    const session = await decrypt(cookie);

    console.log("this is session", session);
    if (isProtectedRoute && !session?.user.user.id) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // if (session.expires && new Date(session.expires) < new Date()) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    if (
      isPublicRoute &&
      session?.user.user.id &&
      !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next();


  } catch (error) {
    console.error(error)
  }

}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

// import { NextRequest } from "next/server";
// import { updateSession } from "./lib";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }