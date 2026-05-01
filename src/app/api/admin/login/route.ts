import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";

const SESSION_COOKIE = "minc_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";

// ─── Simple signed token (no extra deps) ─────────────────────────────────────
import { createHmac } from "crypto";

function signToken(username: string): string {
  const payload   = `${username}:${Date.now()}`;
  const sig       = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

// ─── Fetch admin users from Sanity ───────────────────────────────────────────
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

// ─── POST /api/admin/login ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { username, password } = await req.json().catch(() => ({}));

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
  }

  let authenticated = false;

  // 1. Try Sanity users
  const sanityUsers = await fetchAdminUsers();

  if (sanityUsers.length > 0) {
    const match = sanityUsers.find((u) => u.username === username);
    if (match) {
      authenticated = await bcrypt.compare(password, match.passwordHash);
    }
  } else {
    // 2. Fall back to env vars
    const envUser = process.env.ADMIN_USERNAME ?? "admin";
    const envPass = process.env.ADMIN_PASSWORD;
    if (envPass && username === envUser && password === envPass) {
      authenticated = true;
    }
  }

  if (!authenticated) {
    // Artificial delay to slow brute-force
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
  }

  // Set signed session cookie (httpOnly, secure in production)
  const token = signToken(username);
  const res   = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 8, // 8 hours
    path:     "/",
  });

  return res;
}