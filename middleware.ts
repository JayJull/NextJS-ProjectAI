import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken');
  const userId = request.cookies.get('userId');

  // Check if the route is a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/pages/Dashboard/Manage') ||
                           request.nextUrl.pathname.startsWith('/admin');

  // If accessing a protected route without being logged in, redirect to login
  if (isProtectedRoute && (!sessionToken || !userId)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};