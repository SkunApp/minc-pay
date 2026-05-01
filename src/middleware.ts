import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

const SESSION_COOKIE = "minc_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";

// Edge-compatible base64url decode (no Buffer)
function base64urlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded  = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  return atob(padded);
}

// Edge-compatible HMAC-SHA256 using Web Crypto
async function hmacSHA256(secret: string, data: string): Promise<string> {
  const enc        = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", keyMaterial, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    const decoded    = base64urlDecode(token);
    const lastColon  = decoded.lastIndexOf(":");
    const payload    = decoded.slice(0, lastColon);
    const sig        = decoded.slice(lastColon + 1);
    const expected   = await hmacSHA256(SESSION_SECRET, payload);
    return sig === expected;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (token && (await isValidToken(token))) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}