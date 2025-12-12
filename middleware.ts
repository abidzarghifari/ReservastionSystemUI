import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api from './lib/api';

export const config = {
  matcher: [
    '/guest/reservations/:path*',
    '/guest/account',
    '/admin',
    '/admin/:path*',
    '/owner',
    '/owner/:path*',
  ],
};


/**
 * fungsi ini mengambil argumen berupa NextRequest
 * 
 * fungsi ini akan memeriksa prefix dari NextRequest tersebut lalu melakukan fetching ke server backend sesuai dengan prefix (karena prefix menggunakan jenis aktor)
 * 
 * jika berhasil artinya user telah terutentikasi
 * jika gagal maka akan diredirect ke halaman login yang sesuai dengan user
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const headers = {
    Cookie: request.cookies.toString(),
  };

  if (pathname.startsWith('/guest/')) {
    try {
      await api.get('/web/profile', {
        headers: headers,
      });
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL('/auth/guest/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith('/admin')) {
    try {
      await api.get('/web/adminprofile', {
        headers: headers,
      });
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL('/auth/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith('/owner')) {
    try {
      await api.get('/web/ownerprofile', {
        headers: headers,
      });
      return NextResponse.next();

    } catch (error) {
      const loginUrl = new URL('/auth/owner/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next(); 
}


const AUTH_COOKIE_NAME = 'laravel-session';