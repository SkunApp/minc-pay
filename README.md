# MINC Pay — Phase 1 MVP

A production-ready Next.js 14 website for the MINC Pay platform.  
Dark premium theme · Navy / Black / Crimson Red · App Router · TypeScript · Tailwind CSS

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Icons | Lucide React |
| Email (TODO) | Resend |
| CMS/DB (TODO) | Sanity |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your values

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — Hero, Solutions, How It Works, Why MINC |
| `/apply` | Merchant application form |
| `/contact` | Contact form + WhatsApp / email / phone |
| `/admin` | Internal applications dashboard |

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/applications` | List all applications |
| `POST` | `/api/applications` | Submit new application |
| `GET` | `/api/applications/[id]` | Get single application |
| `PATCH` | `/api/applications/[id]` | Update application status |
| `POST` | `/api/contact` | Submit contact message |

---

## Integrating Resend (Email)

1. Install: `npm install resend`
2. Add `RESEND_API_KEY` to `.env.local`
3. Uncomment the Resend blocks in:
   - `src/app/api/applications/route.ts` — confirmation email on apply
   - `src/app/api/contact/route.ts` — internal notification on contact

---

## Integrating Sanity (Database)

1. `npm install @sanity/client`
2. Add project ID + token to `.env.local`
3. Create schemas for `application` and `contactMessage`
4. Replace the in-memory store in `src/lib/store.ts` with Sanity client calls  
   (all TODO comments are marked for you)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── not-found.tsx       # 404 page
│   ├── apply/
│   │   └── page.tsx        # Application form
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   ├── admin/
│   │   ├── layout.tsx      # Admin layout (add auth here)
│   │   └── page.tsx        # Applications dashboard
│   └── api/
│       ├── applications/
│       │   ├── route.ts    # GET all / POST new
│       │   └── [id]/
│       │       └── route.ts # GET one / PATCH status
│       └── contact/
│           └── route.ts    # POST contact message
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── SolutionsSection.tsx
│       ├── HowItWorksSection.tsx
│       └── WhyMincSection.tsx
├── lib/
│   ├── store.ts            # In-memory data store (swap with Sanity)
│   └── utils.ts            # Helpers: cn, formatDate, etc.
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## Phase 2 Roadmap

See `MINC_Pay_Website_Features.pdf` for full Phase 2 scope including:
- Merchant dashboard
- Real-time transaction monitoring
- Multi-user staff accounts
- Device management
- Payment link generation & invoicing
- Mobile app
