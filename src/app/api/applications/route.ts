import { NextRequest, NextResponse } from "next/server";
import { createApplication, getApplications } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const applications = await getApplications();
    return NextResponse.json(applications);
  } catch (err) {
    console.error("[GET /api/applications]", err);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, ownerFirstName, ownerLastName, email, phone, businessType, monthlyVolume, message } = body;

    if (!businessName || !ownerFirstName || !ownerLastName || !email || !phone || !businessType || !monthlyVolume) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await createApplication({
      businessName,
      ownerFirstName,
      ownerLastName,
      email,
      phone,
      businessType,
      monthlyVolume,
      message: message ?? "",
    });

    // TODO (Phase 2): await sendConfirmationEmail(application) via Resend

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("[POST /api/applications]", err);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}
