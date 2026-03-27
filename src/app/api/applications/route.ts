import { NextRequest, NextResponse } from "next/server";
import { createApplication, getApplications } from "@/lib/store";

export async function GET() {
  try {
    const applications = await getApplications();
    return NextResponse.json(applications);
  } catch {
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
      message: message || "",
    });

    // TODO: Send confirmation email via Resend
    // await resend.emails.send({
    //   from: 'MINC Pay <no-reply@mincpay.co.za>',
    //   to: email,
    //   subject: 'Application Received – MINC Pay',
    //   html: confirmationEmailTemplate(application),
    // })

    // TODO: Create record in Sanity
    // await sanityClient.create({ _type: 'application', ...application })

    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}
