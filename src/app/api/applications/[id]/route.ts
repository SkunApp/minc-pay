import { NextRequest, NextResponse } from "next/server";
import { getApplicationById, updateApplicationStatus } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const app = await getApplicationById(params.id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(app);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const updated = await updateApplicationStatus(params.id, status);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // TODO: Send status notification email via Resend
    // TODO: Update Sanity record

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
