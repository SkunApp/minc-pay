"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wifi, CreditCard, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const highlights = [
  { icon: CreditCard, label: "Tap, Chip & Swipe" },
  { icon: Wifi,       label: "Wi-Fi & SIM Ready" },
  { icon: Zap,        label: "Fast Settlement"   },
];

const devices = [
  {
    name: "MincPay P5SE",
    image: "/images/P5SE-removebg-preview.png",
    tagline: "Compact. Fast. Essential.",
    description:
      "The P5SE is MINC Pay's entry-level smart terminal — lightweight and portable, built for merchants who need reliable card and contactless payments on the go.",
    width: 380,
    height: 480,
  },
  {
    name: "MincPay P5",
    image: "/images/p5-removebg-preview.png",
    tagline: "The flagship standalone terminal.",
    description:
      "A sleek, full-featured payment terminal built for South African merchants. Accept all major cards, contactless, and QR payments — anywhere.",
    width: 420,
    height: 520,
  },
  {
    name: "MincPay P5L",
    image: "/images/P5L-removebg-preview.png",
    tagline: "Large screen. Bigger experience.",
    description:
      "The P5L brings a larger display for high-volume environments where screen real estate matters — perfect for busy retail counters and restaurants.",
    width: 420,
    height: 520,
  },
  {
    name: "MincPay P5SE + P5L",
    image: "/images/P5SE_and_P5L-removebg-preview.png",
    tagline: "The perfect duo.",
    description:
      "Pair the compact P5SE with the spacious P5L for a complete point-of-sale setup — one for the counter, one for the customer.",
    width: 480,
    height: 480,
  },
  {
    name: "MincPay P5SE, P5L & P5",
    image: "/images/3-removebg-preview.png",
    tagline: "The full fleet.",
    description:
      "Deploy the complete MINC Pay terminal range across your business. Every size, every need — covered by one unified payment platform.",
    width: 520,
    height: 480,
  },
];

export default function SpeedPointSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 320);
  }, [animating]);

  const prev = useCallback(() => {
    const idx = (active - 1 + devices.length) % devices.length;
    goTo(idx, "left");
  }, [active, goTo]);

  const next = useCallback(() => {
    const idx = (active + 1) % devices.length;
    goTo(idx, "right");
  }, [active, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, next]);

  // Entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll(".sp-anim");
            items?.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const device = devices[active];

  const slideStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === "right" ? "24px" : "-24px"})`
      : "translateX(0)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Red glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)", opacity: 0.8 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow */}
            <div
              className="sp-anim glass rounded-sm inline-flex items-center gap-3 px-4 py-2 mb-8"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--crimson-500)" }} />
              <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                Featured Device
              </span>
            </div>

            {/* Dynamic heading */}
            <div
              className="sp-anim mb-6"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <h2
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
                style={slideStyle}
              >
                {/* <span style={{ color: "var(--text-primary)" }}></span> */}
                {/* <br /> */}
                <span className="text-gradient">{device.name}</span>
              </h2>
            </div>

            {/* Device image — shown here on mobile / between header and copy */}
            <div className="relative flex items-center justify-center mb-10 lg:hidden" style={slideStyle}>
              <div
                className="absolute w-56 h-56 rounded-full blur-[60px]"
                style={{ backgroundColor: "rgba(220,38,38,0.18)" }}
              />
              <Image
                src={device.image}
                alt={device.name}
                width={device.width}
                height={device.height}
                className="relative z-10 drop-shadow-2xl w-full max-w-[260px] object-contain"
                priority
              />
            </div>

            {/* Tagline */}
            <p
              className="text-sm font-mono tracking-widest uppercase mb-3"
              style={{ ...slideStyle, color: "var(--crimson-400)" }}
            >
              {device.tagline}
            </p>

            {/* Description */}
            <p
              className="sp-anim text-lg leading-relaxed mb-10 max-w-md"
              style={{
                ...slideStyle,
                color: "var(--text-secondary)",
                opacity: animating ? 0 : undefined,
                transition: "opacity 0.32s ease, transform 0.32s ease",
              }}
            >
              {device.description}
            </p>

            {/* Highlights */}
            <div
              className="sp-anim flex flex-col gap-4 mb-10"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.2)" }}
                  >
                    <Icon size={14} style={{ color: "var(--crimson-400)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="sp-anim flex flex-col sm:flex-row items-start gap-4 mb-10"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <Link href="/apply" className="btn-primary group">
                Get This Device
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/devices" className="btn-secondary">
                View All Devices
              </Link>
            </div>

            {/* Slider controls */}
            <div
              className="sp-anim flex items-center gap-4"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <button
                onClick={prev}
                aria-label="Previous device"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-elevated)",
                  color: "var(--text-secondary)",
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {devices.map((d, i) => (
                  <button
                    key={d.name}
                    onClick={() => goTo(i, i > active ? "right" : "left")}
                    aria-label={`Go to ${d.name}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "24px" : "8px",
                      height: "8px",
                      backgroundColor: i === active ? "var(--crimson-500)" : "var(--border-strong)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next device"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-elevated)",
                  color: "var(--text-secondary)",
                }}
              >
                <ChevronRight size={18} />
              </button>

              <span className="text-xs font-mono ml-2" style={{ color: "var(--text-muted)" }}>
                {String(active + 1).padStart(2, "0")} / {String(devices.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Right: Device image (desktop only) ── */}
          <div className="relative hidden lg:flex items-center justify-center" style={slideStyle}>
            {/* Glow ring */}
            <div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-[80px]"
              style={{ backgroundColor: "rgba(220,38,38,0.15)" }}
            />

            {/* Floating badges */}
            <div
              className="absolute top-4 right-8 glass rounded-sm px-3 py-2 flex items-center gap-2"
              style={{ border: "1px solid var(--border-default)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>Online & Ready</span>
            </div>

            <div
              className="absolute bottom-8 left-8 glass rounded-sm px-3 py-2"
              style={{ border: "1px solid var(--border-default)" }}
            >
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-muted)" }}>Settlement</div>
              <div className="text-sm font-bold" style={{ color: "var(--crimson-400)" }}>Next Day</div>
            </div>

            <Image
              src={device.image}
              alt={device.name}
              width={device.width}
              height={device.height}
              className="relative z-10 drop-shadow-2xl w-full max-w-[340px] md:max-w-[420px] object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}