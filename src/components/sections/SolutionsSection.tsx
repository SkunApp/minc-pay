import { CreditCard, Wifi, QrCode, Link2 } from "lucide-react";

const solutions = [
  {
    icon: CreditCard,
    title: "Card Payments",
    description: "Accept all major debit and credit cards including Visa, Mastercard, and local South African cards with competitive transaction rates.",
    features: ["Visa & Mastercard", "Instant settlement", "EMV chip & PIN"],
  },
  {
    icon: Wifi,
    title: "Contactless Payments",
    description: "Enable tap-and-go transactions for your customers. Fast, secure, and hygienic — perfect for high-volume merchants.",
    features: ["NFC enabled", "Apple & Google Pay", "Under 2 seconds"],
  },
  {
    icon: QrCode,
    title: "QR Code Payments",
    description: "Generate dynamic QR codes so customers can pay instantly from any mobile banking or payment app — no hardware required.",
    features: ["No hardware needed", "All major banks", "Instant confirmation"],
  },
  {
    icon: Link2,
    title: "Payment Links",
    description: "Create and share secure payment links via WhatsApp, email, or SMS. Collect payments from anywhere, no in-person transaction needed.",
    features: ["Share via WhatsApp", "Remote collection", "Secure checkout"],
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-28 overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)" }} />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-sm overflow-hidden"
          style={{ backgroundColor: "var(--border-subtle)" }}>
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <div key={solution.title}
                className="glass-card hover-card p-8 md:p-10 relative transition-colors duration-300">
                <div className="mb-6 inline-block">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.18)" }}>
                    <Icon size={20} style={{ color: "var(--crimson-400)" }} />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {solution.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  {solution.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="px-3 py-1 rounded-sm text-xs font-mono tracking-wide"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="absolute top-8 right-8 text-4xl font-display font-black select-none pointer-events-none"
                  style={{ color: "var(--text-faint)" }}>
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
