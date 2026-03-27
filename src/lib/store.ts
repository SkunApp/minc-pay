import { Application, ContactMessage } from "@/types";

// ─── In-memory store ─────────────────────────────────────────────────────────
// TODO: Replace with Sanity client when integrating Phase 2 backend
// import { sanityClient } from './sanity'

let applications: Application[] = [
  {
    id: "APP-001",
    businessName: "Cape Town Coffee Roasters",
    ownerFirstName: "Sarah",
    ownerLastName: "Van der Berg",
    email: "sarah@ctcoffee.co.za",
    phone: "0821234567",
    businessType: "food_beverage",
    monthlyVolume: "50k_200k",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "APP-002",
    businessName: "Durban Fashion Boutique",
    ownerFirstName: "Priya",
    ownerLastName: "Naidoo",
    email: "priya@dbnfashion.co.za",
    phone: "0839876543",
    businessType: "retail",
    monthlyVolume: "200k_500k",
    status: "approved",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "APP-003",
    businessName: "Johannesburg Auto Spares",
    ownerFirstName: "Thabo",
    ownerLastName: "Dlamini",
    email: "thabo@jhauto.co.za",
    phone: "0114445566",
    businessType: "automotive",
    monthlyVolume: "500k_plus",
    status: "rejected",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

let contactMessages: ContactMessage[] = [];

// ─── Applications ─────────────────────────────────────────────────────────────

export async function getApplications(): Promise<Application[]> {
  // TODO: return await sanityClient.fetch('*[_type == "application"] | order(submittedAt desc)')
  return [...applications].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function getApplicationById(id: string): Promise<Application | null> {
  return applications.find((a) => a.id === id) ?? null;
}

export async function createApplication(
  data: Omit<Application, "id" | "status" | "submittedAt">
): Promise<Application> {
  const app: Application = {
    ...data,
    id: `APP-${String(applications.length + 1).padStart(3, "0")}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  applications.push(app);
  // TODO: await sanityClient.create({ _type: 'application', ...app })
  // TODO: await sendConfirmationEmail(app) — wire Resend here
  return app;
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<Application | null> {
  const idx = applications.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  applications[idx] = { ...applications[idx], status };
  return applications[idx];
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function createContactMessage(
  data: Omit<ContactMessage, "id" | "submittedAt">
): Promise<ContactMessage> {
  const msg: ContactMessage = {
    ...data,
    id: `MSG-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
  contactMessages.push(msg);
  return msg;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return [...contactMessages].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}
