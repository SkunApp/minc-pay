import { CreditCard, Wifi, QrCode, Link2 } from "lucide-react";

const solutions = [
  {
    icon: CreditCard,
    title: "Card Payments",
    description:
      "Accept all major debit and credit cards including Visa, Mastercard, and local South African cards with competitive transaction rates.",
    features: ["Visa & Mastercard", "Instant settlement", "EMV chip & PIN"],
  },
  {
    icon: Wifi,
    title: "Contactless Payments",
    description:
      "Enable tap-and-go transactions for your customers. Fast, secure, and hygienic — perfect for high-volume merchants.",
    features: ["NFC enabled", "Apple & Google Pay", "Under 2 seconds"],
  },
  {
    icon: QrCode,
    title: "QR Code Payments",
    description:
      "Generate dynamic QR codes so customers can pay instantly from any mobile banking or payment app — no hardware required.",
    features: ["No hardware needed", "All major banks", "Instant confirmation"],
  },
  {
    icon: Link2,
    title: "Payment Links",
    description:
      "Create and share secure payment links via WhatsApp, email, or SMS. Collect payments from anywhere, no in-person transaction needed.",
    features: ["Share via WhatsApp", "Remote collection", "Secure checkout"],
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-28 bg-navy-950 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-crimson-700/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label">
            <span className="w-4 h-px bg-crimson-500" />
            Payment Solutions
          </div>
          <h2 className="section-heading mb-4">
            Every way your customers{" "}
            <span className="text-gradient-red">want to pay</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            From physical card terminals to remote payment links — MINC Pay gives
            you the complete toolkit to never miss a sale.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-sm overflow-hidden">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className="glass-card p-8 md:p-10 group hover:bg-navy-700/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 relative inline-block">
                  <div className="w-12 h-12 bg-crimson-600/10 border border-crimson-600/20 rounded-sm flex items-center justify-center group-hover:bg-crimson-600/20 group-hover:border-crimson-600/40 transition-all duration-300">
                    <Icon size={20} className="text-crimson-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="flex flex-wrap gap-2">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="px-3 py-1 bg-white/4 border border-white/8 rounded-sm text-xs text-white/50 font-mono tracking-wide"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Index number */}
                <div className="absolute top-8 right-8 text-4xl font-display font-black text-white/4 select-none group-hover:text-white/8 transition-colors">
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
