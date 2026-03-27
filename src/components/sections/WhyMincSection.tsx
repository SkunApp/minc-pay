import { Zap, Shield, HeadphonesIcon, TrendingUp, Smartphone, Users } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Onboarding",
    description: "Go from application to live payments in as little as 48 hours. No lengthy approval processes.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "PCI-DSS compliant infrastructure. Your customers' payment data is always protected.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Real humans available via WhatsApp and email. We're here when you need us.",
  },
  {
    icon: TrendingUp,
    title: "Grow With Us",
    description: "Start with the basics, expand to advanced analytics and multi-user tools as your business scales.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Manage your payments from any device. Built for the way South African businesses operate.",
  },
  {
    icon: Users,
    title: "Built for SA Businesses",
    description: "Designed with local merchants in mind. We understand the South African market.",
  },
];

export default function WhyMincSection() {
  return (
    <section id="why-minc" className="relative py-28 bg-navy-950 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label justify-center">
            <span className="w-4 h-px bg-crimson-500" />
            Why MINC Pay
            <span className="w-4 h-px bg-crimson-500" />
          </div>
          <h2 className="section-heading mb-4">
            Built for merchants who{" "}
            <span className="text-gradient-red">mean business</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            We handle the complexity of payments infrastructure so you can focus
            on what you do best — running your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="glass-card rounded-sm p-7 group hover:border-crimson-600/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-crimson-600/8 border border-crimson-600/15 rounded-sm flex items-center justify-center group-hover:bg-crimson-600/15 transition-colors duration-300">
                    <Icon size={16} className="text-crimson-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 relative overflow-hidden rounded-sm glass-card border-crimson-600/20 p-10 md:p-14">
          <div className="absolute inset-0 bg-gradient-to-r from-crimson-700/10 to-transparent" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl font-black text-white mb-2">
                Ready to get started?
              </h3>
              <p className="text-white/40 text-base">
                Apply today. No commitment. No hidden fees.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/apply" className="btn-primary whitespace-nowrap">
                Apply Now
              </a>
              <a href="/contact" className="btn-secondary whitespace-nowrap">
                Talk to Us
              </a>
            </div>
          </div>
          {/* Decorative large text */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-display font-black text-white/3 select-none leading-none pointer-events-none">
            PAY
          </div>
        </div>
      </div>
    </section>
  );
}
