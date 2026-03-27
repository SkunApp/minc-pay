import Link from "next/link";
import { MessageCircle, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-crimson-600 rounded-sm flex items-center justify-center font-display font-black text-white text-sm">
                M
              </div>
              <span className="font-display text-xl font-bold text-white">
                MINC <span className="text-crimson-500">Pay</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Modern payment infrastructure for South African businesses. Accept
              every payment, everywhere.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {[
                "Card Payments",
                "Contactless",
                "QR Code Payments",
                "Payment Links",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Apply Now", href: "/apply" },
                { label: "Contact Us", href: "/contact" },
                { label: "Admin Portal", href: "/admin" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/27000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/40 text-sm hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@mincpay.co.za"
                  className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                  <Mail size={14} />
                  hello@mincpay.co.za
                </a>
              </li>
              <li>
                <a
                  href="tel:+27000000000"
                  className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                  <Phone size={14} />
                  +27 (0) 00 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-mono">
            © {new Date().getFullYear()} MINC Pay. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
