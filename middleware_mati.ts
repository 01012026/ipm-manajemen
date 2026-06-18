import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mengecek apakah user punya "Karcis VIP" bernama auth_token di browsernya
  const token = request.cookies.get('auth_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Skenario 1: Belum login, tapi nekat masuk ke dashboard -> Tendang ke /login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Skenario 2: Sudah login, tapi iseng buka halaman /login lagi -> Kembalikan ke dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika aman, silakan lewat
  return NextResponse.next();
}

// Menentukan halaman mana saja yang dijaga satpam ini (semua halaman kecuali aset static/api)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};