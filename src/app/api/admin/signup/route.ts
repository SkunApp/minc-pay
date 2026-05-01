import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";

export async function POST(req: NextRequest) {
  const { username, displayName, password } = await req.json().catch(() => ({}));

  // Basic validation
  if (!username || !displayName || !password) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }
  if (username.length < 3 || username.length > 40) {
    return NextResponse.json({ message: "Username must be 3–40 characters." }, { status: 400 });
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
    return NextResponse.json({ message: "Username may only contain letters, numbers, _, ., or -." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token     = process.env.SANITY_API_TOKEN;

  if (!projectId || !token) {
    return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  // Reject duplicate usernames
  const existing = await client
    .fetch<{ username: string } | null>(
      `*[_type == "adminUser" && username == $u][0]{ username }`,
      { u: username }
    )
    .catch(() => null);

  if (existing) {
    return NextResponse.json({ message: "That username is already taken." }, { status: 409 });
  }

  // Hash the password (bcrypt, 12 rounds) and store in Sanity
  const passwordHash = await bcrypt.hash(password, 12);

  await client.create({
    _type:        "adminUser",
    username,
    displayName,
    passwordHash,
    isActive:     true,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
