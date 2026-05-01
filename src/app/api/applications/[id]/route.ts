import { NextRequest, NextResponse } from "next/server";
import { getApplicationById, updateApplicationStatus } from "@/lib/store";
import { sendStatusChangeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const app = await getApplicationById(params.id);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(app);
  } catch (err) {
    console.error("[GET /api/applications/:id]", err);
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await updateApplicationStatus(params.id, status);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Notify the applicant of their new status
    try {
      await sendStatusChangeEmail(updated);
    } catch (emailErr) {
      // Log but don't fail the request — the status is already persisted
      console.error("[PATCH /api/applications/:id] Failed to send status email:", emailErr);
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/applications/:id]", err);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}