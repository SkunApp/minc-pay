/**
 * Email helpers — powered by Resend.
 *
 * Required env vars:
 *   RESEND_API_KEY        – your Resend secret key
 *   RESEND_FROM_EMAIL     – verified sender address (e.g. no-reply@mincpay.co.za)
 *
 * The support recipient address is pulled from Sanity siteSettings at send-time
 * so it always reflects the latest value without a redeploy.
 */

import { Resend } from "resend";
import type { Application } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.RESEND_FROM_EMAIL ?? "no-reply@mincpay.co.za";

// ─── New-application notification (to support team) ───────────────────────────

export async function sendNewApplicationNotification(
  application: Application,
  supportEmail: string
): Promise<void> {
  const { businessName, ownerFirstName, ownerLastName, email, phone, businessType, monthlyVolume, message, id } = application;

  await resend.emails.send({
    from: FROM,
    to:   supportEmail,
    subject: `New Application — ${businessName}`,
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a">New MINC Pay Application</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:6px 12px;font-weight:600;color:#555;width:160px">Business Name</td><td style="padding:6px 12px">${businessName}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:600;color:#555">Owner</td><td style="padding:6px 12px">${ownerFirstName} ${ownerLastName}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#555">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:600;color:#555">Phone</td><td style="padding:6px 12px">${phone}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#555">Business Type</td><td style="padding:6px 12px">${businessType}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:600;color:#555">Monthly Volume</td><td style="padding:6px 12px">${monthlyVolume}</td></tr>
        ${message ? `<tr><td style="padding:6px 12px;font-weight:600;color:#555">Message</td><td style="padding:6px 12px">${message}</td></tr>` : ""}
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Application ID: ${id}</p>
    `,
  });
}

// ─── Status-change notification (to applicant) ────────────────────────────────

const STATUS_COPY: Record<Application["status"], { subject: string; heading: string; body: string; color: string }> = {
  approved: {
    subject: "Your MINC Pay application has been approved 🎉",
    heading: "Congratulations — you&rsquo;re approved!",
    body:    "We&rsquo;re thrilled to welcome you to MINC Pay. A member of our team will be in touch shortly to walk you through the next steps and get you set up.",
    color:   "#16a34a",
  },
  rejected: {
    subject: "Update on your MINC Pay application",
    heading: "Application update",
    body:    "Thank you for applying to MINC Pay. After careful review, we are unable to proceed with your application at this time. If you believe this decision was made in error or would like to discuss it further, please don&rsquo;t hesitate to reach out to our support team.",
    color:   "#dc2626",
  },
  pending: {
    subject: "Your MINC Pay application is under review",
    heading: "We&rsquo;ve received your application",
    body:    "Your application is currently under review. We aim to respond within 2&ndash;3 business days. You don&rsquo;t need to do anything else right now.",
    color:   "#d97706",
  },
};

export async function sendStatusChangeEmail(application: Application): Promise<void> {
  const copy = STATUS_COPY[application.status];

  await resend.emails.send({
    from:    FROM,
    to:      application.email,
    subject: copy.subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:${copy.color};padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">${copy.heading}</h1>
        </div>
        <div style="background:#fff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
          <p style="color:#374151;font-size:15px;line-height:1.6">Hi ${application.ownerFirstName},</p>
          <p style="color:#374151;font-size:15px;line-height:1.6">${copy.body}</p>
          <p style="color:#6b7280;font-size:13px;margin-top:32px">
            If you have questions, reply to this email or contact our support team.<br/>
            — The MINC Pay Team
          </p>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Application ref: ${application.id}</p>
      </div>
    `,
  });
}