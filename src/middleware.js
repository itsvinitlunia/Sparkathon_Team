import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  // Remove all create.xyz headers and rewrites
  // If you need custom middleware, add it here. Otherwise, just return NextResponse.next()
  return NextResponse.next();
}