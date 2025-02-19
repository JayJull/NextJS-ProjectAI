import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  if (url.pathname.startsWith('/aifree/')) {
    // Ambil URL target dengan menghapus /aifree/
    const targetUrl = url.pathname.replace('/aifree/', '')
    
    // Redirect ke URL asli dengan https
    return NextResponse.redirect(`https://${targetUrl}`)
  }
}

export const config = {
  matcher: '/aifree/:path*',
}