import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const msg = await createContactMessage({ name, email, phone, subject, message });

    // TODO: Send notification to internal team via Resend
    // await resend.emails.send({
    //   from: 'MINC Pay <no-reply@mincpay.co.za>',
    //   to: 'hello@mincpay.co.za',
    //   subject: `New contact enquiry: ${subject}`,
    //   html: contactNotificationTemplate(msg),
    // })

    return NextResponse.json(msg, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
