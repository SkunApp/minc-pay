/**
 * Data layer — all reads/writes go through Sanity.
 * The sanityClient uses SANITY_API_TOKEN (server-only) for writes.
 * Reads use the CDN client for speed.
 */
import { sanityClient, sanityReadClient } from "@/sanity/client";
import {
  ALL_APPLICATIONS_QUERY,
  APPLICATION_BY_ID_QUERY,
  ALL_CONTACT_MESSAGES_QUERY,
} from "@/sanity/queries";
import { Application, ContactMessage } from "@/types";

// ─── Applications ─────────────────────────────────────────────────────────────

export async function getApplications(): Promise<Application[]> {
  return sanityReadClient.fetch(ALL_APPLICATIONS_QUERY);
}

export async function getApplicationById(id: string): Promise<Application | null> {
  return sanityReadClient.fetch(APPLICATION_BY_ID_QUERY, { id });
}

export async function createApplication(
  data: Omit<Application, "id" | "status" | "submittedAt">
): Promise<Application> {
  const doc = await sanityClient.create({
    _type: "application",
    ...data,
    status: "pending",
    submittedAt: new Date().toISOString(),
  });

  return {
    id: doc._id,
    businessName:   doc.businessName,
    ownerFirstName: doc.ownerFirstName,
    ownerLastName:  doc.ownerLastName,
    email:          doc.email,
    phone:          doc.phone,
    businessType:   doc.businessType,
    monthlyVolume:  doc.monthlyVolume,
    message:        doc.message ?? "",
    status:         "pending",
    submittedAt:    doc.submittedAt,
  };
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<Application | null> {
  await sanityClient.patch(id).set({ status }).commit();
  return sanityReadClient.fetch(APPLICATION_BY_ID_QUERY, { id });
}

// ─── Contact messages ─────────────────────────────────────────────────────────

export async function createContactMessage(
  data: Omit<ContactMessage, "id" | "submittedAt">
): Promise<ContactMessage> {
  const doc = await sanityClient.create({
    _type: "contactMessage",
    ...data,
    submittedAt: new Date().toISOString(),
  });

  return {
    id:          doc._id,
    name:        doc.name,
    email:       doc.email,
    phone:       doc.phone ?? "",
    subject:     doc.subject,
    message:     doc.message,
    submittedAt: doc.submittedAt,
  };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return sanityReadClient.fetch(ALL_CONTACT_MESSAGES_QUERY);
}
