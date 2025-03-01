// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if this is an admin route
  if (request.nextUrl.pathname.startsWith('/pages/Dashboard') || 
      request.nextUrl.pathname.startsWith('/admin')) {
    
    const sessionToken = request.cookies.get('sessionToken')?.value;
    const userId = request.cookies.get('userId')?.value;
    
    // If no session token or user ID, redirect to login
    if (!sessionToken || !userId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/pages/Dashboard/:path*', '/admin/:path*'],
};