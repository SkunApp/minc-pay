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
