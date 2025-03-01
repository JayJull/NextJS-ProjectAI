import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if this is a protected route
  if (request.nextUrl.pathname.startsWith('/pages/Dashboard') || 
      request.nextUrl.pathname.startsWith('/admin')) {
    
    const sessionToken = request.cookies.get('sessionToken')?.value;
    const userId = request.cookies.get('userId')?.value;
    
    // If no session token or user ID, redirect to homepage with loginModal=true
    if (!sessionToken || !userId) {
      // Store the intended URL to redirect back after login
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/?loginModal=true&returnUrl=${returnUrl}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/pages/Dashboard/:path*', '/admin/:path*'],
};
