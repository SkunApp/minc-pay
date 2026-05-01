import { NextRequest, NextResponse } from "next/server";
import { createApplication, getApplications } from "@/lib/store";
import { getSiteSettings } from "@/sanity/siteSettings";
import { sendNewApplicationNotification } from "@/lib/email";

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

    // Send new-application notification to the support email defined in Sanity
    try {
      const { supportEmail } = await getSiteSettings();
      await sendNewApplicationNotification(application, supportEmail);
    } catch (emailErr) {
      // Log but don't fail the request — the application is already saved
      console.error("[POST /api/applications] Failed to send notification email:", emailErr);
    }

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("[POST /api/applications]", err);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}