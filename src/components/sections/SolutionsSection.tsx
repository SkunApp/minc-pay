/* ─── Real brand logos via CDN ───────────────────────────────────────────── */

/** Card Payments – clean card icon, no background */
const CardPaymentIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={38} height={38}>
    <rect x="3" y="10" width="42" height="28" rx="4.5" stroke="#3b82f6" strokeWidth="2.2"/>
    <rect x="3" y="17" width="42" height="8" fill="#3b82f6" opacity="0.18"/>
    <rect x="8" y="26" width="10" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.6"/>
    <line x1="13" y1="26" x2="13" y2="33" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
    <line x1="8" y1="29.5" x2="18" y2="29.5" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
    <rect x="29" y="27" width="14" height="1.8" rx="0.9" fill="#3b82f6" opacity="0.45"/>
    <rect x="29" y="31" width="9" height="1.8" rx="0.9" fill="#3b82f6" opacity="0.3"/>
  </svg>
);

/** Contactless – phone with NFC rings, no background */
const ContactlessIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={38} height={38}>
    <rect x="11" y="5" width="16" height="28" rx="3" stroke="#8b5cf6" strokeWidth="2.2"/>
    <rect x="14.5" y="9" width="9" height="18" rx="1.2" fill="#8b5cf6" opacity="0.14"/>
    <circle cx="19" cy="30" r="1.3" fill="#8b5cf6" opacity="0.55"/>
    <path d="M31 17 Q37 24 31 31" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    <path d="M34.5 13.5 Q43.5 24 34.5 34.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);

/** QR Code – clean minimal QR, no background */
const QRCodeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={38} height={38}>
    <rect x="4" y="4" width="17" height="17" rx="2.5" stroke="#06b6d4" strokeWidth="2"/>
    <rect x="8" y="8" width="9" height="9" rx="1" fill="#06b6d4"/>
    <rect x="27" y="4" width="17" height="17" rx="2.5" stroke="#06b6d4" strokeWidth="2"/>
    <rect x="31" y="8" width="9" height="9" rx="1" fill="#06b6d4"/>
    <rect x="4" y="27" width="17" height="17" rx="2.5" stroke="#06b6d4" strokeWidth="2"/>
    <rect x="8" y="31" width="9" height="9" rx="1" fill="#06b6d4"/>
    <rect x="27" y="27" width="7" height="7" rx="1" fill="#06b6d4" opacity="0.5"/>
    <rect x="37" y="27" width="7" height="7" rx="1" fill="#06b6d4" opacity="0.8"/>
    <rect x="27" y="37" width="7" height="7" rx="1" fill="#06b6d4" opacity="0.8"/>
    <rect x="37" y="37" width="7" height="7" rx="1" fill="#06b6d4"/>
  </svg>
);

/** Payment Links – link + share icon, no background */
const PaymentLinkIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={38} height={38}>
    <path d="M20 28l8-8" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M26 20l4-4a5.657 5.657 0 0 1 8 8l-4 4" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 28l-4 4a5.657 5.657 0 0 1-8-8l4-4" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="37" cy="11" r="6.5" fill="#25D366"/>
    <path d="M37 7.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="white" opacity="0.9"/>
    <path d="M35.5 10.8c.05.15.28.65.28.65s.1.18 0 .28-.36.47-.36.56c0 .17.47.93 1.12 1.22.66.37.74.18.83.18.1-.1.47-.47.56-.65.1-.1.18-.1.37 0l.65.37c.18.1.18.18.1.37-.18.47-.74.83-1.3.74-.74-.1-1.77-.74-2.32-1.67-.37-.65-.47-1.3-.28-1.67.18-.28.37-.47.65-.47h.28z" fill="#25D366"/>
  </svg>
);

/* ─── Real CDN brand badges ──────────────────────────────────────────────── */

const VisaLogo = () => (
  <svg viewBox="0 0 72 24" height={13} width={43} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text
      x="1" y="19"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="22"
      fill="#1A1F71"
      letterSpacing="-0.5"
    >VISA</text>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 38 24" height={20} width={38} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="12" r="10" fill="#EB001B"/>
    <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
    <path d="M19 4.8a10 10 0 0 1 0 14.4A10 10 0 0 1 19 4.8z" fill="#FF5F00"/>
  </svg>
);

const ApplePayBadge = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
    alt="Apple Pay"
    height={16}
    width={46}
    style={{ objectFit: "contain", display: "block" }}
  />
);

const GooglePayBadge = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
    alt="Google Pay"
    height={18}
    width={52}
    style={{ objectFit: "contain", display: "block" }}
  />
);

const WhatsAppBadge = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    height={18}
    width={18}
    style={{ objectFit: "contain", display: "block" }}
  />
);

const NFCBadge = () => (
  <svg viewBox="0 0 16 16" height={15} width={15} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="#10b981" strokeWidth="1.2"/>
    <path d="M6 11V9c0-1.1.9-2 2-2" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 11V8c0-1.7-1.3-3-3-3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
    <circle cx="6" cy="11" r="1.1" fill="#10b981"/>
  </svg>
);

const CheckBadge = () => (
  <svg viewBox="0 0 14 14" height={13} width={13} fill="none">
    <circle cx="7" cy="7" r="6" fill="#10b981" opacity="0.18"/>
    <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BankBadge = () => (
  <svg viewBox="0 0 16 16" height={14} width={14} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7h12M2 13h12M8 2l6 5H2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3.5" y="7" width="2" height="6" rx="0.4" fill="currentColor" opacity="0.45"/>
    <rect x="7" y="7" width="2" height="6" rx="0.4" fill="currentColor" opacity="0.45"/>
    <rect x="10.5" y="7" width="2" height="6" rx="0.4" fill="currentColor" opacity="0.45"/>
  </svg>
);

const RemoteLocationBadge = () => (
  <svg viewBox="0 0 16 16" height={15} width={15} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="#f59e0b" strokeWidth="1.3"/>
    <circle cx="8" cy="6" r="1.6" fill="#f59e0b"/>
  </svg>
);

const SecureCheckoutBadge = () => (
  <svg viewBox="0 0 16 16" height={15} width={15} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5L13.5 4v4c0 3-2.5 5.5-5.5 6.5C5 13.5 2.5 11 2.5 8V4z" stroke="#10b981" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M5.5 8l1.8 1.8 3-3.6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ────────────────────────────────────────────────────────────────── */

type FeaturePill = { label: string; icon: React.ReactNode; hideLabel?: boolean };

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
      { label: "Visa", icon: <VisaLogo />, hideLabel: true },
      { label: "Mastercard", icon: <MastercardLogo />, hideLabel: true },
      { label: "EMV chip & PIN", icon: <CheckBadge /> },
      { label: "Instant settlement", icon: <CheckBadge /> },
    ],
    accentColor: "transparent",
    borderColor: "transparent",
  },
  {
    IconComponent: ContactlessIcon,
    title: "Contactless Payments",
    description: "Enable tap-and-go transactions for your customers. Fast, secure, and hygienic — perfect for high-volume merchants.",
    features: [
      { label: "NFC", icon: <NFCBadge /> },
      { label: "Apple Pay", icon: <ApplePayBadge />, hideLabel: true },
      { label: "Google Pay", icon: <GooglePayBadge />, hideLabel: true },
      { label: "Under 2 seconds", icon: <CheckBadge /> },
    ],
    accentColor: "transparent",
    borderColor: "transparent",
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
    accentColor: "transparent",
    borderColor: "transparent",
  },
  {
    IconComponent: PaymentLinkIcon,
    title: "Payment Links",
    description: "Create and share secure payment links via WhatsApp, email, or SMS. Collect payments from anywhere, no in-person transaction needed.",
    features: [
      { label: "WhatsApp", icon: <WhatsAppBadge /> },
      { label: "Remote collection", icon: <RemoteLocationBadge /> },
      { label: "Secure checkout", icon: <SecureCheckoutBadge /> },
    ],
    accentColor: "transparent",
    borderColor: "transparent",
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
                {/* Icon — no box, just the bare icon */}
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12">
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
                      {!feature.hideLabel && <span>{feature.label}</span>}
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