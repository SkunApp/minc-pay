import { NextRequest, NextResponse } from "next/server";
import { getApplicationById, updateApplicationStatus, deleteApplication } from "@/lib/store";
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

    try {
      await sendStatusChangeEmail(updated);
    } catch (emailErr) {
      console.error("[PATCH /api/applications/:id] Failed to send status email:", emailErr);
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/applications/:id]", err);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const app = await getApplicationById(params.id);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteApplication(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/applications/:id]", err);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
