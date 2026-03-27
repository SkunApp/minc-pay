import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — MINC Pay",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add auth guard here when integrating Sanity/Clerk
  // e.g. redirect to /admin/login if no session
  return <>{children}</>;
}
