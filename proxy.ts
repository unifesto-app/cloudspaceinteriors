import { NextResponse, type NextRequest } from "next/server";
import { isValidSession, SESSION_COOKIE } from "./lib/auth";

// Optimistic gate so logged-out visitors bounce to the login page. Actions re-check via requireAdmin().
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return;
  if (!isValidSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = { matcher: "/admin/:path*" };
