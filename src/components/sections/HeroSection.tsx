"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".animate-on-load");
    items.forEach((item, i) => {
      setTimeout(() => {
        (item as HTMLElement).style.opacity = "1";
        (item as HTMLElement).style.transform = "translateY(0)";
      }, i * 120);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-crimson-700/10 rounded-full blur-[120px]" />
        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-navy-700/30 rounded-full blur-[100px]" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="animate-on-load mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-sm glass border border-crimson-600/30"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase">
              Now accepting merchant applications
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-on-load font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="text-white block">Accept</span>
            <span className="text-gradient block">every payment.</span>
            <span className="text-white/40 block">Grow faster.</span>
          </h1>

          {/* Sub */}
          <p
            className="animate-on-load text-white/50 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-body"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            MINC Pay gives South African businesses the infrastructure to accept
            card, contactless, QR, and digital payments — with fast onboarding
            and zero complexity.
          </p>

          {/* CTAs */}
          <div
            className="animate-on-load flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <Link href="/apply" className="btn-primary group">
              Get a Device
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              How It Works
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-on-load mt-16 grid grid-cols-3 gap-8 max-w-lg"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {[
              { value: "48hr", label: "Onboarding" },
              { value: "0%", label: "Hidden fees" },
              { value: "4+", label: "Payment types" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-black text-crimson-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-white/30 text-xs tracking-widest uppercase font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
