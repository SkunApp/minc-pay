import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";
import { createHmac } from "crypto";

const SESSION_COOKIE = "minc_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";

function signToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  const sig     = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

type SanityAdminUser = { username: string; passwordHash: string };

async function fetchAdminUsers(): Promise<SanityAdminUser[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token     = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) return [];

  try {
    const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });
    return await client.fetch<SanityAdminUser[]>(
      `*[_type == "adminUser" && isActive == true]{ username, passwordHash }`
    );
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { username, password, redirectTo } = body;

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
  }

  let authenticated = false;

  const sanityUsers = await fetchAdminUsers();

  if (sanityUsers.length > 0) {
    const match = sanityUsers.find((u) => u.username === username);
    if (match) {
      authenticated = await bcrypt.compare(password, match.passwordHash);
    }
  } else {
    const envUser = process.env.ADMIN_USERNAME ?? "admin";
    const envPass = process.env.ADMIN_PASSWORD;
    if (envPass && username === envUser && password === envPass) {
      authenticated = true;
    }
  }

  if (!authenticated) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
  }

  const dest =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("/admin/login")
      ? redirectTo
      : "/admin";

  // Return 200 with the cookie + destination. The client does the navigation
  // so the browser commits the cookie before requesting /admin.
  const res = NextResponse.json({ ok: true, redirectTo: dest });

  res.cookies.set(SESSION_COOKIE, signToken(username), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 8,
    path:     "/",
  });

  return res;
}