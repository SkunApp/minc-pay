/* ─── Professional payment icons ─────────────────────────────────────────── */

/** Card Payments – realistic card with Visa/MC chip */
const CardPaymentIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
    <rect x="4" y="13" width="48" height="30" rx="4" fill="url(#cardGrad)"/>
    <rect x="4" y="20" width="48" height="8" fill="rgba(0,0,0,0.35)"/>
    <rect x="10" y="28" width="10" height="8" rx="1.5" fill="#f0c040" opacity="0.9"/>
    <line x1="15" y1="28" x2="15" y2="36" stroke="#c8960a" strokeWidth="0.8"/>
    <line x1="10" y1="32" x2="20" y2="32" stroke="#c8960a" strokeWidth="0.8"/>
    <text x="30" y="39" fontFamily="Arial" fontWeight="900" fontSize="8" fill="white" opacity="0.9">VISA</text>
    <circle cx="40" cy="31" r="4" fill="#eb001b" opacity="0.85"/>
    <circle cx="46" cy="31" r="4" fill="#f79e1b" opacity="0.85"/>
    <defs>
      <linearGradient id="cardGrad" x1="4" y1="13" x2="52" y2="43" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e3a8a"/>
        <stop offset="100%" stopColor="#1d4ed8"/>
      </linearGradient>
    </defs>
  </svg>
);

/** Contactless – phone with NFC waves */
const ContactlessIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
    <rect x="14" y="6" width="20" height="34" rx="3.5" fill="url(#phoneGrad)"/>
    <rect x="17" y="10" width="14" height="22" rx="1.5" fill="#0f172a" opacity="0.55"/>
    <circle cx="24" cy="36" r="1.8" fill="white" opacity="0.45"/>
    <path d="M36 21 Q41 27.5 36 34" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <path d="M39.5 17.5 Q47 27.5 39.5 37.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55"/>
    <defs>
      <linearGradient id="phoneGrad" x1="14" y1="6" x2="34" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
);

/** QR Code – clean structured QR with scan line */
const QRCodeIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
    <rect x="5" y="5" width="19" height="19" rx="2.5" fill="rgba(6,182,212,0.18)"/>
    <rect x="5" y="5" width="19" height="19" rx="2.5" stroke="#06b6d4" strokeWidth="1.8"/>
    <rect x="9" y="9" width="11" height="11" rx="1.2" fill="#06b6d4"/>
    <rect x="32" y="5" width="19" height="19" rx="2.5" fill="rgba(6,182,212,0.18)"/>
    <rect x="32" y="5" width="19" height="19" rx="2.5" stroke="#06b6d4" strokeWidth="1.8"/>
    <rect x="36" y="9" width="11" height="11" rx="1.2" fill="#06b6d4"/>
    <rect x="5" y="32" width="19" height="19" rx="2.5" fill="rgba(6,182,212,0.18)"/>
    <rect x="5" y="32" width="19" height="19" rx="2.5" stroke="#06b6d4" strokeWidth="1.8"/>
    <rect x="9" y="36" width="11" height="11" rx="1.2" fill="#06b6d4"/>
    <rect x="32" y="32" width="8" height="8" rx="1" fill="#06b6d4" opacity="0.55"/>
    <rect x="43" y="32" width="8" height="8" rx="1" fill="#06b6d4" opacity="0.8"/>
    <rect x="32" y="43" width="8" height="8" rx="1" fill="#06b6d4" opacity="0.8"/>
    <rect x="43" y="43" width="8" height="8" rx="1" fill="#06b6d4"/>
    <line x1="3" y1="28" x2="53" y2="28" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2.5" opacity="0.85"/>
  </svg>
);

/** Payment Links – chain link + WhatsApp badge */
const PaymentLinkIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
    <rect x="3" y="19" width="23" height="14" rx="7" fill="rgba(245,158,11,0.2)"/>
    <rect x="3" y="19" width="23" height="14" rx="7" stroke="#f59e0b" strokeWidth="1.8"/>
    <rect x="30" y="19" width="23" height="14" rx="7" fill="rgba(245,158,11,0.2)"/>
    <rect x="30" y="19" width="23" height="14" rx="7" stroke="#f59e0b" strokeWidth="1.8"/>
    <line x1="22" y1="26" x2="34" y2="26" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
    {/* WhatsApp badge */}
    <circle cx="46" cy="12" r="8" fill="#25D366"/>
    <path d="M43.5 12.5c0-1.8 1.3-3.2 3-3.2s3 1.4 3 3.2c0 1.1-.6 2-1.4 2.5l.3 1.8-1.6-.9c-.2.1-.4.1-.5.1-1.6 0-2.8-1.4-2.8-3.5z" fill="white"/>
  </svg>
);

/* ─── Inline brand / feature icons ───────────────────────────────────────── */

const VisaLogo = () => (
  <svg viewBox="0 0 40 14" height={12} width={34}>
    <text x="1" y="12" fontFamily="Arial" fontWeight="900" fontSize="13" fill="#1a1f71" letterSpacing="-0.3">VISA</text>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 28 18" height={15} width={24} fill="none">
    <circle cx="9" cy="9" r="9" fill="#EB001B"/>
    <circle cx="19" cy="9" r="9" fill="#F79E1B"/>
    <path d="M14 2.5a9 9 0 0 1 0 13A9 9 0 0 1 14 2.5z" fill="#FF5F00"/>
  </svg>
);

const ApplePayBadge = () => (
  <svg viewBox="0 0 52 18" height={14} width={46} fill="none">
    <rect width="52" height="18" rx="3" fill="black"/>
    {/* Apple logo path */}
    <path d="M10.5 5.2c.6-.7.5-1.7.5-1.7s-1 .1-1.6.7c-.6.6-.6 1.6-.6 1.6s1.2.1 1.7-.6z" fill="white"/>
    <path d="M11 6.1c-.9-.1-1.6.5-2.1.5-.5 0-1.1-.5-1.8-.5-1.2.1-2.4 1-2.4 2.8 0 1.3.5 2.7 1.1 3.6.5.7.9 1.2 1.6 1.2.6 0 .9-.4 1.7-.4.7 0 1 .4 1.7.4.7 0 1.2-.6 1.7-1.3.4-.6.6-1.3.7-1.3-.1 0-1.4-.6-1.4-2 0-1.3 1-1.8 1-1.9-.5-.8-1.5-.9-1.8-1z" fill="white"/>
    <text x="16" y="13" fontFamily="-apple-system, Helvetica" fontWeight="500" fontSize="9" fill="white">Pay</text>
  </svg>
);

const GooglePayBadge = () => (
  <svg viewBox="0 0 62 18" height={14} width={56} fill="none">
    <rect width="62" height="18" rx="3" fill="white" stroke="#dadce0" strokeWidth="1"/>
    <text x="5" y="13" fontFamily="Arial" fontWeight="500" fontSize="10">
      <tspan fill="#4285F4">G</tspan>
      <tspan fill="#EA4335">o</tspan>
      <tspan fill="#FBBC05">o</tspan>
      <tspan fill="#4285F4">g</tspan>
      <tspan fill="#34A853">le</tspan>
    </text>
    <text x="34" y="13" fontFamily="Arial" fontWeight="600" fontSize="10" fill="#5f6368">Pay</text>
  </svg>
);

const NFCBadge = () => (
  <svg viewBox="0 0 14 14" height={13} width={13} fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="#10b981" strokeWidth="1"/>
    <path d="M7 10V7.5c0-.8-.5-1.5-1.3-1.5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M7 10V7c0-1.1.9-2 2-2" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
    <circle cx="7" cy="10" r="1" fill="#10b981"/>
  </svg>
);

const CheckBadge = () => (
  <svg viewBox="0 0 14 14" height={12} width={12} fill="none">
    <circle cx="7" cy="7" r="6" fill="#10b981" opacity="0.18"/>
    <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BankBadge = () => (
  <svg viewBox="0 0 14 14" height={12} width={12} fill="none">
    <path d="M2 6h10M2 11h10M7 2l5 4H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3.5" y="6" width="2" height="5" rx="0.4" fill="currentColor" opacity="0.5"/>
    <rect x="6" y="6" width="2" height="5" rx="0.4" fill="currentColor" opacity="0.5"/>
    <rect x="8.5" y="6" width="2" height="5" rx="0.4" fill="currentColor" opacity="0.5"/>
  </svg>
);

const WhatsAppBadge = () => (
  <svg viewBox="0 0 14 14" height={14} width={14} fill="none">
    <circle cx="7" cy="7" r="7" fill="#25D366"/>
    <path d="M7 3.5a3.5 3.5 0 0 0-3 5.3l-.5 1.7 1.8-.5A3.5 3.5 0 1 0 7 3.5z" fill="white"/>
    <path d="M5.6 5.5c.1.2.3.7.3.7s.1.2 0 .3c-.1.1-.4.5-.4.6 0 .2.5 1 1.2 1.3.7.4.8.2.9.2.1-.1.5-.5.6-.7.1-.1.2-.1.4 0l.7.4c.2.1.2.2.1.4-.2.5-.8.9-1.4.8-.8-.1-1.9-.8-2.5-1.8-.4-.7-.5-1.4-.3-1.8.2-.3.4-.5.7-.5h.3z" fill="#25D366"/>
  </svg>
);

/* ─── Data ────────────────────────────────────────────────────────────────── */

type FeaturePill = { label: string; icon: React.ReactNode };

const solutions: {
  IconComponent: React.FC;
  title: string;
  description: string;
  features: FeaturePill[];
  accentColor: string;
  borderColor: string;
}[] = [
  {
    IconComponent: CardPaymentIcon,
    title: "Card Payments",
    description: "Accept all major debit and credit cards including Visa, Mastercard, and local South African cards with competitive transaction rates.",
    features: [
      { label: "Visa", icon: <VisaLogo /> },
      { label: "Mastercard", icon: <MastercardLogo /> },
      { label: "EMV chip & PIN", icon: <CheckBadge /> },
      { label: "Instant settlement", icon: <CheckBadge /> },
    ],
    accentColor: "rgba(29,78,216,0.1)",
    borderColor: "rgba(59,130,246,0.28)",
  },
  {
    IconComponent: ContactlessIcon,
    title: "Contactless Payments",
    description: "Enable tap-and-go transactions for your customers. Fast, secure, and hygienic — perfect for high-volume merchants.",
    features: [
      { label: "NFC", icon: <NFCBadge /> },
      { label: "Apple Pay", icon: <ApplePayBadge /> },
      { label: "Google Pay", icon: <GooglePayBadge /> },
      { label: "Under 2 seconds", icon: <CheckBadge /> },
    ],
    accentColor: "rgba(139,92,246,0.1)",
    borderColor: "rgba(139,92,246,0.28)",
  },
  {
    IconComponent: QRCodeIcon,
    title: "QR Code Payments",
    description: "Generate dynamic QR codes so customers can pay instantly from any mobile banking or payment app — no hardware required.",
    features: [
      { label: "No hardware needed", icon: <CheckBadge /> },
      { label: "All major banks", icon: <BankBadge /> },
      { label: "Instant confirmation", icon: <CheckBadge /> },
    ],
    accentColor: "rgba(6,182,212,0.1)",
    borderColor: "rgba(6,182,212,0.28)",
  },
  {
    IconComponent: PaymentLinkIcon,
    title: "Payment Links",
    description: "Create and share secure payment links via WhatsApp, email, or SMS. Collect payments from anywhere, no in-person transaction needed.",
    features: [
      { label: "WhatsApp", icon: <WhatsAppBadge /> },
      { label: "Remote collection", icon: <CheckBadge /> },
      { label: "Secure checkout", icon: <CheckBadge /> },
    ],
    accentColor: "rgba(245,158,11,0.1)",
    borderColor: "rgba(245,158,11,0.28)",
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-28 overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="section-label">
            <span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />
            Payment Solutions
          </div>
          <h2 className="section-heading mb-4">
            Every way your customers <span className="text-gradient-red">want to pay</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            From physical card terminals to remote payment links — MINC Pay gives you the complete toolkit to never miss a sale.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-sm overflow-hidden"
          style={{ backgroundColor: "var(--border-subtle)" }}
        >
          {solutions.map((solution, i) => {
            const Icon = solution.IconComponent;
            return (
              <div
                key={solution.title}
                className="glass-card hover-card p-8 md:p-10 relative transition-colors duration-300"
              >
                {/* Icon box */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{ backgroundColor: solution.accentColor, border: `1.5px solid ${solution.borderColor}` }}>
                  <Icon />
                </div>

                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {solution.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  {solution.description}
                </p>

                {/* Feature pills */}
                <ul className="flex flex-wrap gap-2">
                  {solution.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {feature.icon}
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>

                {/* Number watermark */}
                <div
                  className="absolute top-8 right-8 text-4xl font-display font-black select-none pointer-events-none"
                  style={{ color: "var(--text-faint)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
