import { sanityReadClient } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SiteSettings } from "@/types";

const FALLBACK_SETTINGS: SiteSettings = {
  brandName: "MINC Pay",
  supportEmail: "talifhani@skun.co.za",
  supportPhoneDisplay: "+27 (0) 00 000 0000",
  supportPhoneE164: "+27000000000",
  whatsAppNumberE164: "+27000000000",
  supportHours: "Mon–Fri, 8am–5pm SAST",
  country: "South Africa",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

function stableSettings(input: Partial<SiteSettings> | null | undefined): SiteSettings {
  return {
    ...FALLBACK_SETTINGS,
    ...(input ?? {}),
  };
}

/**
 * Server-only helper to read site settings from Sanity.
 * Uses the CDN read client for performance and revalidates periodically.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityReadClient.fetch<Partial<SiteSettings> | null>(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );
  return stableSettings(data);
}

