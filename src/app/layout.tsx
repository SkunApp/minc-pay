import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "MINC Pay — Modern Payment Solutions for South African Businesses",
  description: "Accept card, contactless, QR code, and payment link transactions. Fast onboarding. No hidden fees. Built for South African merchants.",
  keywords: "payment solutions, card payments, QR payments, South Africa, merchant services, MINC Pay",
  openGraph: {
    title: "MINC Pay — Modern Payment Solutions",
    description: "Accept every payment. Grow your business.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
