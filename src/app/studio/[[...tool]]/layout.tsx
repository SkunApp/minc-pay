import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'MINC Pay — Sanity Studio',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // In the App Router, only the root `app/layout.tsx` should render `<html>/<body>`.
  // Rendering them again in a nested segment layout can cause hydration mismatches.
  return <div style={{ margin: 0, minHeight: '100dvh' }}>{children}</div>
}
