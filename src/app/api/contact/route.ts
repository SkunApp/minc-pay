import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const msg = await createContactMessage({ name, email, phone: phone ?? "", subject, message });

    // TODO (Phase 2): await sendInternalNotification(msg) via Resend

    return NextResponse.json(msg, { status: 201 });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
