import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — add it to .env.local"
  );
}

/** Write client — server-side only. Never import in client components. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Editor or higher token
  useCdn: false,
});

/** Read-only CDN client — safe in Server Components. */
export const sanityReadClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
