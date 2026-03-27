# MINC Pay — Phase 1 MVP

Dark premium Next.js 14 website · Navy / Crimson Red · App Router · TypeScript · Tailwind CSS · Sanity CMS

---

## Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Framework  | Next.js 14 (App Router)           |
| Styling    | Tailwind CSS + CSS custom properties |
| Language   | TypeScript                        |
| CMS / DB   | Sanity v3                         |
| Icons      | Lucide React                      |
| Email      | Resend (stubbed — Phase 2)        |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Sanity project
```bash
# Option A — Sanity CLI
npx sanity init

# Option B — Web dashboard
# Visit https://sanity.io/manage → New project
```

### 3. Set environment variables
```bash
cp .env.example .env.local
# Fill in your Sanity project ID and API token
```

### 4. Run dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site.  
Open [http://localhost:3000/studio](http://localhost:3000/studio) for the embedded Sanity Studio.

---

## Pages

| Route       | Description                                                  |
|-------------|--------------------------------------------------------------|
| `/`         | Landing page — Hero, Solutions, How It Works, Why MINC Pay   |
| `/apply`    | Merchant application form (writes to Sanity)                 |
| `/contact`  | Contact form + WhatsApp / email / phone                      |
| `/admin`    | Internal applications dashboard (reads/writes Sanity)        |
| `/studio`   | Embedded Sanity Studio                                       |

---

## API Routes

| Method  | Endpoint                    | Description                      |
|---------|-----------------------------|----------------------------------|
| `GET`   | `/api/applications`         | List all applications from Sanity|
| `POST`  | `/api/applications`         | Create new application in Sanity |
| `GET`   | `/api/applications/[id]`    | Fetch single application         |
| `PATCH` | `/api/applications/[id]`    | Update status in Sanity          |
| `POST`  | `/api/contact`              | Save contact message to Sanity   |

---

## Sanity Schemas

Two document types live in `src/sanity/schemas/`:

- **`application`** — Merchant applications with status workflow (pending → approved/rejected)
- **`contactMessage`** — Contact form submissions

### Setting up CORS in Sanity

Go to your [Sanity project settings](https://www.sanity.io/manage) → API → CORS origins  
Add: `http://localhost:3000` (dev) and your production URL.

---

## Theme

The site supports **dark and light themes** while keeping the navy + crimson brand palette in both.

- Default: **dark** (navy `#04070f` background, white text)
- Light: **light** (slate-blue `#f0f4fb` background, dark navy text)
- Accent **crimson red** (`#dc2626`) is consistent in both themes
- Toggle is in the navbar (sun/moon icon)
- Preference is persisted to `localStorage`
- Implemented via CSS custom properties on `[data-theme]` attribute — zero flicker

---

## Adding Resend (Phase 2)

1. `npm install resend`
2. Add `RESEND_API_KEY` to `.env.local`
3. Uncomment the Resend blocks in:
   - `src/app/api/applications/route.ts` — confirmation email on apply
   - `src/app/api/applications/[id]/route.ts` — status change notification
   - `src/app/api/contact/route.ts` — internal team notification

---

## Project Structure

```
minc-pay/
├── sanity.config.ts              # Sanity Studio config + schema registration
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + ThemeProvider
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # CSS variables for dark/light themes
│   │   ├── not-found.tsx         # 404 page
│   │   ├── apply/page.tsx        # Merchant application form
│   │   ├── contact/page.tsx      # Contact page
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin layout (add auth guard here)
│   │   │   └── page.tsx          # Applications dashboard
│   │   ├── studio/[[...tool]]/   # Embedded Sanity Studio
│   │   └── api/
│   │       ├── applications/route.ts
│   │       ├── applications/[id]/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── ThemeProvider.tsx     # Context + localStorage persistence
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Fixed nav, hash-link fix, theme toggle
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── SolutionsSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       └── WhyMincSection.tsx
│   ├── lib/
│   │   ├── store.ts              # Data layer — all Sanity reads/writes
│   │   └── utils.ts              # cn(), formatDate(), formatVolume()
│   ├── sanity/
│   │   ├── client.ts             # sanityClient (write) + sanityReadClient (CDN)
│   │   ├── queries.ts            # GROQ query strings
│   │   └── schemas/
│   │       ├── index.ts
│   │       ├── application.ts
│   │       └── contactMessage.ts
│   └── types/index.ts
```
