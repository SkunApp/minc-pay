import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — MINC Pay",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth is handled by middleware.ts — Basic Auth on all /admin/* routes
  return <>{children}</>;
}