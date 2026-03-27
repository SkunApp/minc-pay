import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-[120px] md:text-[180px] font-black text-white/4 leading-none select-none">
          404
        </p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            Page not found
          </h1>
          <p className="text-white/40 text-base mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            <ChevronLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
