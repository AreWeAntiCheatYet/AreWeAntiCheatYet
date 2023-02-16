import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const matches = [...request.nextUrl.pathname.matchAll(/\/(.+)\//g)].map((x) => x[1]);
  const type = matches[0];

  const display = request.cookies.get('display');

  if (display && display.value !== type) {
    return NextResponse.redirect(request.url.replace(type, display.value));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/(grid|table)/:path*',
};
