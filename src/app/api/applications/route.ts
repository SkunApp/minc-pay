import { NextRequest, NextResponse } from "next/server";
import { createApplication, getApplications } from "@/lib/store";
import { getSiteSettings } from "@/sanity/siteSettings";
import { sendNewApplicationNotification, sendApplicationConfirmation } from "@/lib/email";
import { sanityClient } from "@/sanity/client";
import { ApplicationDocument } from "@/types";

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

async function uploadFileToSanity(
  file: File
): Promise<ApplicationDocument> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const asset = await sanityClient.assets.upload("file", buffer, {
    filename: file.name,
    contentType: file.type,
  });

  return {
    url:          asset.url,
    originalName: file.name,
    assetId:      asset._id,
  };
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";

    let body: Record<string, string>;
    let companyRegistrationDoc: ApplicationDocument | undefined;
    let directorIdDoc: ApplicationDocument | undefined;
    let proofOfBankDoc: ApplicationDocument | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      body = {
        businessName:   String(formData.get("businessName") ?? ""),
        ownerFirstName: String(formData.get("ownerFirstName") ?? ""),
        ownerLastName:  String(formData.get("ownerLastName") ?? ""),
        email:          String(formData.get("email") ?? ""),
        phone:          String(formData.get("phone") ?? ""),
        businessType:   String(formData.get("businessType") ?? ""),
        monthlyVolume:  String(formData.get("monthlyVolume") ?? ""),
        message:        String(formData.get("message") ?? ""),
        applicantType:  String(formData.get("applicantType") ?? "individual"),
      };

      // Upload documents if present
      const regFile  = formData.get("companyRegistrationDoc") as File | null;
      const idFile   = formData.get("directorIdDoc") as File | null;
      const bankFile = formData.get("proofOfBankDoc") as File | null;

      if (regFile  && regFile.size  > 0) companyRegistrationDoc = await uploadFileToSanity(regFile);
      if (idFile   && idFile.size   > 0) directorIdDoc          = await uploadFileToSanity(idFile);
      if (bankFile && bankFile.size > 0) proofOfBankDoc         = await uploadFileToSanity(bankFile);
    } else {
      body = await req.json();
    }

    const {
      businessName, ownerFirstName, ownerLastName,
      email, phone, businessType, monthlyVolume, message,
      applicantType,
    } = body;

    if (!businessName || !ownerFirstName || !ownerLastName || !email || !phone || !businessType || !monthlyVolume) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate company documents
    if (applicantType === "company") {
      if (!companyRegistrationDoc) {
        return NextResponse.json({ error: "Company registration document is required" }, { status: 400 });
      }
      if (!directorIdDoc) {
        return NextResponse.json({ error: "Director ID document is required" }, { status: 400 });
      }
      if (!proofOfBankDoc) {
        return NextResponse.json({ error: "Proof of bank account is required" }, { status: 400 });
      }
    }

    const application = await createApplication({
      businessName,
      ownerFirstName,
      ownerLastName,
      email,
      phone,
      businessType,
      monthlyVolume,
      message:        message ?? "",
      applicantType:  (applicantType as "individual" | "company") ?? "individual",
      companyRegistrationDoc,
      directorIdDoc,
      proofOfBankDoc,
    });

    // Send emails in parallel — log failures but don't block the response
    try {
      const { supportEmail } = await getSiteSettings();
      await Promise.all([
        sendNewApplicationNotification(application, supportEmail),
        sendApplicationConfirmation(application),
      ]);
    } catch (emailErr) {
      console.error("[POST /api/applications] Failed to send emails:", emailErr);
    }

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("[POST /api/applications]", err);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}