import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DeviceCard, { type Device } from "@/components/sections/DeviceCard";

export const metadata = {
  title: "Devices We Offer | MINC Pay",
  description:
    "Browse the full range of MincPay payment terminals. Find the right device for your business.",
};

const devices: Device[] = [
  {
    id: "p5",
    name: "MincPay P5",
    tagline: "The everyday all-rounder",
    image: "/images/p5-removebg-preview.png",
    imageWidth: 200,
    description:
      "A compact, powerful standalone Android POS terminal built for South African merchants. Accept all major cards, contactless, and QR payments with fast settlement.",
    features: [
      "Tap, Chip & Swipe",
      "Wi-Fi & 4G SIM",
      "Android-powered",
      "Long-life battery",
      "Built-in receipt printer",
    ],
    badge: "Most Popular",
    badgeColor: "var(--crimson-500)",
  },
  {
    id: "p5l",
    name: "MincPay P5L",
    subtitle: "EMV Android Mini POS",
    tagline: "Compact. Capable. Connected.",
    image: "/images/P5L-removebg-preview.png",
    imageWidth: 200,
    description:
      "The EMV Android Mini POS — perfectly sized for countertop use with all the power of a full terminal. Ideal for retail and hospitality environments.",
    features: [
      "EMV chip & contactless",
      "Android mini form factor",
      "Wi-Fi & 4G SIM",
      "All major card types",
      "Built-in printer",
    ],
    badge: "Best for Retail",
    badgeColor: "#2563eb",
  },
  {
    id: "p5se",
    name: "MincPay P5SE",
    subtitle: "EMV Android POS",
    tagline: "Slim, smart, portable",
    image: "/images/P5SE-removebg-preview.png",
    imageWidth: 180,
    description:
      "The EMV Android POS in its slimmest form. Built for mobile traders, market vendors, and on-the-go professionals who need full payment capability anywhere.",
    features: [
      "Ultra-slim EMV design",
      "4G & Wi-Fi enabled",
      "Contactless & QR",
      "Lightweight & durable",
      "Android OS",
    ],
    badge: "Best for Mobile",
    badgeColor: "#059669",
  },
  {
    id: "p5se-p5l-bundle",
    name: "MincPay P5SE + P5L",
    subtitle: "EMV Android POS & EMV Android Mini POS",
    tagline: "The complete dual-device solution",
    image: "/images/P5SE_and_P5L-removebg-preview.png",
    imageWidth: 320,
    description:
      "Both the P5SE (EMV Android POS) and P5L (EMV Android Mini POS) together — giving your business a countertop terminal and a portable unit for complete payment coverage.",
    features: [
      "Two devices in one package",
      "Countertop + portable setup",
      "Centralised dashboard",
      "All EMV payment types",
      "Priority support",
    ],
    badge: "Best Value",
    badgeColor: "#7c3aed",
  },
  {
    id: "triple",
    name: "MincPay P5SE, P5L & P5",
    subtitle: "Full Device Range",
    tagline: "Everything, everywhere",
    image: "/images/3-removebg-preview.png",
    imageWidth: 380,
    description:
      "The complete MINC Pay device family — the MincPay P5SE, MincPay P5L, and MincPay P5 together. Perfect for multi-location businesses or merchants who need the full range.",
    features: [
      "All three devices included",
      "Full payment type coverage",
      "Multi-location management",
      "Unified reporting dashboard",
      "Dedicated account manager",
    ],
    badge: "Full Range",
    badgeColor: "#d97706",
  },
];

export default function DevicesPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base)" }}>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "var(--glow-primary)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="glass rounded-sm inline-flex items-center gap-3 px-4 py-2 mb-8"
            style={{ border: "1px solid rgba(220,38,38,0.25)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--crimson-500)" }}
            />
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Our Device Range
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Devices We <span className="text-gradient">Offer</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Every MINC Pay merchant gets access to industry-leading EMV Android terminals — trusted across South African businesses of every size.
          </p>
        </div>
      </section>

      {/* ── Device Grid ── */}
      <section className="py-8 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top row: 3 individual devices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {devices.slice(0, 3).map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>

          {/* Bottom row: bundle + full range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devices.slice(3).map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div
              className="glass rounded-lg p-10 max-w-2xl mx-auto"
              style={{ border: "1px solid var(--border-default)" }}
            >
              <h3
                className="font-display text-3xl font-black mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Not sure which device is right for you?
              </h3>
              <p className="mb-8 text-base" style={{ color: "var(--text-secondary)" }}>
                Our team will help you choose the perfect terminal for your business size and payment volume.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-secondary">
                  Talk to Us
                </Link>
                <Link href="/apply" className="btn-primary group">
                  Start Application
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}