"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/#solutions",    label: "Solutions",    hash: "solutions" },
  { href: "/#how-it-works", label: "How It Works", hash: "how-it-works" },
  { href: "/#why-minc",     label: "Why MINC Pay", hash: "why-minc" },
  { href: "/contact",       label: "Contact",      hash: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    hash: string | null
  ) => {
    if (!hash) return;
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 420);
    }
    setOpen(false);
  };

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "backdrop-blur-md border-b py-3" : "bg-transparent py-5")}
      style={scrolled ? { backgroundColor: "var(--nav-bg)", borderColor: "var(--border-subtle)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center font-display font-black text-white text-sm" style={{ backgroundColor: "var(--crimson-600)" }}>M</div>
              <div className="absolute -inset-0.5 rounded-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "rgba(220,38,38,0.3)" }} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              MINC <span style={{ color: "var(--crimson-500)" }}>Pay</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" onClick={(e) => handleNavClick(e, link.href, link.hash)}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: theme + admin + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} aria-label="Toggle theme"
              className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200 hover:opacity-70"
              style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <Link href="/admin" className="text-xs tracking-widest uppercase font-mono transition-colors duration-200" style={{ color: "var(--text-muted)" }}>Admin</Link>
            <Link href="/apply" className="btn-primary text-xs py-2.5 px-5">Apply Now</Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme"
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button onClick={() => setOpen(!open)} style={{ color: "var(--text-secondary)" }} aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden backdrop-blur-md border-t mt-3" style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border-subtle)" }}>
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href, link.hash)} className="nav-link py-2.5 px-2 rounded-sm">{link.label}</a>
            ))}
            <div className="pt-4 mt-2 border-t flex flex-col gap-3" style={{ borderColor: "var(--border-subtle)" }}>
              <Link href="/apply" className="btn-primary justify-center">Apply Now</Link>
              <Link href="/admin" className="btn-secondary justify-center text-xs">Admin Portal</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
