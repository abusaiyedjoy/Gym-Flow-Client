import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/signin',
  '/signup',
  '/forgot-password',
  '/otp-verification',
  '/reset-password',
  '/verify-email',
  '/about',
  '/trainers',
  '/membership',
  '/faq',
  '/contact',
  '/classes'
];
const authRoutes = ['/signin', '/signup', '/forgot-password', '/otp-verification', '/reset-password', '/verify-email'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if route is auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Protected routes - dashboard
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // Redirect to login if accessing protected route without any token
  if (isDashboardRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Redirect to dashboard if accessing auth routes with token
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};