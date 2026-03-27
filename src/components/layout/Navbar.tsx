"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-minc", label: "Why MINC Pay" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-white/8 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-crimson-600 rounded-sm flex items-center justify-center font-display font-black text-white text-sm">
                M
              </div>
              <div className="absolute -inset-0.5 bg-crimson-600/30 rounded-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              MINC <span className="text-crimson-500">Pay</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-200 font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-white/40 hover:text-white/70 text-xs tracking-widest uppercase transition-colors duration-200 font-mono"
            >
              Admin
            </Link>
            <Link href="/apply" className="btn-primary text-xs py-2.5 px-5">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/8 mt-3">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white text-sm tracking-wide transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/8 flex flex-col gap-3">
              <Link href="/apply" className="btn-primary justify-center">
                Apply Now
              </Link>
              <Link
                href="/admin"
                className="btn-secondary justify-center text-xs"
              >
                Admin Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
