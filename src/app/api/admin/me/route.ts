import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const SESSION_COOKIE = "minc_admin_session";

function base64urlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded  = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  return Buffer.from(padded, "base64").toString("utf-8");
}

function getUsernameFromCookie(token: string): string | null {
  try {
    const decoded = base64urlDecode(token);
    // format: username:timestamp:signature
    const parts = decoded.split(":");
    if (parts.length < 3) return null;
    // username is everything before the second-to-last colon (timestamp) and last colon (sig)
    return parts.slice(0, parts.length - 2).join(":");
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const token    = req.cookies.get(SESSION_COOKIE)?.value;
  const username = token ? getUsernameFromCookie(token) : null;

  if (!username) {
    return NextResponse.json({ displayName: "Admin", username: "admin" });
  }

  // Try to fetch the display name from Sanity
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiToken  = process.env.SANITY_API_TOKEN;

  if (projectId && apiToken) {
    try {
      const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token: apiToken, useCdn: false });
      const user = await client.fetch<{ displayName: string; username: string } | null>(
        `*[_type == "adminUser" && username == $u][0]{ displayName, username }`,
        { u: username }
      );
      if (user) return NextResponse.json(user);
    } catch { /* fall through */ }
  }

  // Fall back to env-var admin
  return NextResponse.json({ displayName: username, username });
}