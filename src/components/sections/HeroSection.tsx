"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll(".anim");
    items?.forEach((item, i) => {
      setTimeout(() => {
        (item as HTMLElement).style.opacity = "1";
        (item as HTMLElement).style.transform = "translateY(0)";
      }, i * 130);
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      {/* Grid */}
      <div className="absolute inset-0 opacity-100 pointer-events-none" style={{
        backgroundImage: "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: "var(--glow-primary)" }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[280px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "var(--bg-elevated)", opacity: 0.4 }} />
      {/* Decorative line */}
      <div className="absolute left-8 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, var(--border-default), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="anim glass rounded-sm inline-flex items-center gap-3 px-4 py-2 mb-8" style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease", border: "1px solid rgba(220,38,38,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--crimson-500)" }} />
            <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>Now accepting merchant applications</span>
          </div>

          {/* Headline */}
          <h1 className="anim font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ color: "var(--text-primary)" }} className="block">Accept</span>
            <span className="text-gradient block">every payment.</span>
            <span style={{ color: "var(--text-muted)" }} className="block">Grow faster.</span>
          </h1>

          {/* Sub */}
          <p className="anim text-lg md:text-xl leading-relaxed max-w-xl mb-10"
            style={{ color: "var(--text-secondary)", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            MINC Pay gives South African businesses the infrastructure to accept card, contactless, QR, and digital payments — with fast onboarding and zero complexity.
          </p>

          {/* CTAs */}
          <div className="anim flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <Link href="/apply" className="btn-primary group">
              Get a Device
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="/#how-it-works" className="btn-secondary">How It Works</a>
          </div>

          {/* Stats */}
          <div className="anim mt-16 grid grid-cols-3 gap-8 max-w-lg"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            {[
              { value: "48hr", label: "Onboarding" },
              { value: "0%",   label: "Hidden fees" },
              { value: "4+",   label: "Payment types" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-black mb-1" style={{ color: "var(--crimson-500)" }}>{stat.value}</div>
                <div className="text-xs tracking-widest uppercase font-mono" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--text-faint)" }}>
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
