import { ClipboardList, PhoneCall, Package, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Submit Your Application", description: "Fill in your business details using our simple online form. Takes less than 5 minutes. No paperwork, no queues." },
  { icon: PhoneCall,     title: "Our Team Reviews & Contacts You", description: "A MINC Pay representative will review your application and reach out within 24 hours to confirm details and answer questions." },
  { icon: Package,       title: "Receive Your Device", description: "Once approved, we dispatch your payment device. You'll receive setup instructions and full support to get you ready." },
  { icon: CheckCircle2,  title: "Start Accepting Payments", description: "Go live and start accepting card, contactless, QR, and link payments. Funds settle directly into your account." },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.2), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left sticky */}
          <div className="lg:sticky lg:top-32">
            <div className="section-label"><span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />Process</div>
            <h2 className="section-heading mb-6">From application <span className="text-gradient-red">to first payment</span><br />in 48 hours</h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
              We've built a streamlined onboarding process so you spend less time on paperwork and more time running your business.
            </p>
            <a href="/apply" className="btn-primary inline-flex">Start Your Application</a>
          </div>

          {/* Right steps */}
          <div className="relative">
            <div className="absolute left-[23px] top-12 bottom-12 w-px hidden sm:block" style={{ background: "linear-gradient(to bottom, rgba(220,38,38,0.4), var(--border-subtle), transparent)" }} />
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-6 group">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-sm flex items-center justify-center z-10 relative transition-all duration-300"
                        style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                        <Icon size={18} style={{ color: "var(--crimson-400)" }} />
                      </div>
                    </div>
                    <div className="pt-1 pb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(220,38,38,0.55)" }}>{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
