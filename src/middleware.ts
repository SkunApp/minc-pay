import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export const config = {
  matcher: ["/admin/:path*"],
};

const SESSION_COOKIE  = "minc_admin_session";
const SESSION_SECRET  = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";

function isValidToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    // format: username:timestamp:signature
    const lastColon = decoded.lastIndexOf(":");
    const payload   = decoded.slice(0, lastColon);
    const sig       = decoded.slice(lastColon + 1);
    const expected  = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
    return sig === expected;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow the login page through
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (token && isValidToken(token)) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login, preserving the intended destination
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}