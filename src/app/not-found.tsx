import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="text-center">
        <p className="font-display text-[120px] md:text-[180px] font-black leading-none select-none" style={{ color: "var(--text-faint)" }}>404</p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: "var(--text-primary)" }}>Page not found</h1>
          <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: "var(--text-secondary)" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            <ChevronLeft size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
