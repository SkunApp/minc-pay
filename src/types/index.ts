export interface ApplicationDocument {
  url: string;
  originalName: string;
  assetId: string;
}

export interface Application {
  id: string;
  businessName: string;
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  phone: string;
  businessType: string;
  monthlyVolume: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  // Company applicant fields
  applicantType?: "individual" | "company";
  companyRegistrationDoc?: ApplicationDocument;
  directorIdDoc?: ApplicationDocument;
  proofOfBankDoc?: ApplicationDocument;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export type SiteLink = {
  label: string;
  url: string;
};

export type LegalLink = {
  label: string;
  href: string;
};

export interface SiteSettings {
  brandName: string;
  supportEmail: string;
  supportPhoneDisplay: string;
  supportPhoneE164: string;
  whatsAppNumberE164: string;
  supportHours?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  socialLinks?: SiteLink[];
  legalLinks?: LegalLink[];
}

export type PaymentMethod = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};
