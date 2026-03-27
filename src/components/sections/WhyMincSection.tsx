import { Zap, Shield, HeadphonesIcon, TrendingUp, Smartphone, Users } from "lucide-react";

const reasons = [
  { icon: Zap,            title: "Fast Onboarding",        description: "Go from application to live payments in as little as 48 hours. No lengthy approval processes." },
  { icon: Shield,         title: "Secure & Compliant",     description: "PCI-DSS compliant infrastructure. Your customers' payment data is always protected." },
  { icon: HeadphonesIcon, title: "Dedicated Support",      description: "Real humans available via WhatsApp and email. We're here when you need us." },
  { icon: TrendingUp,     title: "Grow With Us",           description: "Start with the basics, expand to advanced analytics and multi-user tools as your business scales." },
  { icon: Smartphone,     title: "Mobile Ready",           description: "Manage your payments from any device. Built for the way South African businesses operate." },
  { icon: Users,          title: "Built for SA Businesses", description: "Designed with local merchants in mind. We understand the South African market." },
];

export default function WhyMincSection() {
  return (
    <section id="why-minc" className="relative py-28 overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute right-0 top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border-subtle), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label justify-center">
            <span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />
            Why MINC Pay
            <span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />
          </div>
          <h2 className="section-heading mb-4">
            Built for merchants who <span className="text-gradient-red">mean business</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            We handle the complexity of payments infrastructure so you can focus on what you do best — running your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title}
                className="glass-card hover-border-accent rounded-sm p-7 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.14)" }}>
                    <Icon size={16} style={{ color: "var(--crimson-400)" }} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-sm glass-card p-10 md:p-14"
          style={{ borderColor: "rgba(220,38,38,0.18)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--glow-primary), transparent)" }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
                Ready to get started?
              </h3>
              <p style={{ color: "var(--text-secondary)" }}>Apply today. No commitment. No hidden fees.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/apply" className="btn-primary whitespace-nowrap">Apply Now</a>
              <a href="/contact" className="btn-secondary whitespace-nowrap">Talk to Us</a>
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-display font-black select-none leading-none pointer-events-none"
            style={{ color: "var(--text-faint)" }}>PAY</div>
        </div>
      </div>
    </section>
  );
}
