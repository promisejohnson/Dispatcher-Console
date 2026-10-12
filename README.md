Dispatcher Console (Next.js + TypeScript)

An internal, auth-gated console for dispatch personnel to issue and
manage public emergency alerts — built on the Next.js App Router to lean
into server-rendering, middleware-based route protection, and Server
Actions instead of a client-side API layer.

Why App Router for this one

The other two projects in this set (ecommerce, notification preferences)
are client-heavy SPAs — a good fit for Vite. A dispatcher console is the
opposite: mostly reading and writing a small amount of authoritative data,
where server-rendering avoids a client-side fetch waterfall and Server
Actions remove the need to hand-write API routes for simple mutations. It's
also the more realistic stack for anything WASK would actually run
internally, given SEO/perf isn't the point — auth and correctness are.

## Features

Middleware-gated auth** (`middleware.ts`) — every `/dashboard/*` request
  is checked for a session cookie before it reaches a page; unauthenticated
  requests are redirected to `/login` with a `?from=` param preserved. The
  dashboard layout re-checks server-side as a second line of defense.
Server Actions for every mutation — login, logout, creating an alert,
  and updating an alert's status all happen via `'use server'` functions in
  `lib/actions.ts`, called directly from forms (`useFormState`) or client
  event handlers (`useTransition`), with zero hand-written API routes.
Server-rendered filtering — the alerts list filters by status and
  severity via URL search params read directly in the Server Component; the
  filter chips are plain links, so the page works with JavaScript disabled.
Dashboard overview — live counts (active alerts, critical alerts,
  affected regions, resolved in 24h) computed server-side on each request.
New alert form - with per-severity guidance text, wired to a Server
  Action with typed validation.
Alert detail + status workflow — Active → Resolved/Cancelled, updated
  via a Server Action called directly from a client component.

## Demo credentials


Email:    dispatcher@promise.africa
Password: promise-2026



## Setup

Requires Node.js 18+.

bash
npm install
npm run dev


Open `http://localhost:3000` — you'll land on `/login` if not authenticated,
or `/dashboard` if you already have a session cookie.

bash
npm run build
npm run start


## Project structure


app/
  layout.tsx                       Root layout, fonts, globals.css
  page.tsx                         Redirects to /login or /dashboard
  not-found.tsx                    Themed 404
  login/
    page.tsx                        Login page shell
    page.module.css
  dashboard/
    layout.tsx                      Auth check + sidebar shell
    page.tsx                        Overview: stats + recent alerts
    alerts/
      page.tsx                      Alerts list, filterable via search params
      [id]/page.tsx                 Alert detail + status controls
      new/page.tsx                  New alert form
middleware.ts                      Route protection for /dashboard/*
lib/
  auth.ts                          Session cookie helpers + demo credentials
  actions.ts                       All Server Actions (login, logout, alert CRUD)
  data.ts                          In-memory mock "database", async like a real one
components/
  Sidebar.tsx, StatCard.tsx, Badges.tsx, AlertsTable.tsx
  LoginForm.tsx, NewAlertForm.tsx, StatusUpdateControls.tsx  (client components)
types/index.ts                     DispatchAlert, DispatchUser, etc.
```

## Notes for reviewers

Data layer is swappable in one file.** `lib/data.ts` holds an in-memory
  array behind async functions (`getAlerts`, `createAlert`, etc.) — every
  Server Component and Action calls these, never the array directly. Point
  them at Postgres/Prisma/Supabase and nothing else in the app changes.
Auth is swappable in one file. `lib/auth.ts` is the only place that
  knows about the session cookie or the hardcoded demo account. Swapping to
  NextAuth/Clerk/Lucia means rewriting `getSession`/`createSession` and
  leaving `middleware.ts` and every page as-is, since they only call those
  two functions.
Why both middleware and a layout check auth: middleware runs on the
  edge before rendering starts (fast, cheap redirect), but relying on it
  alone means a page rendered outside the matcher pattern would be
  unprotected. The dashboard layout's own `getSession()` check is a second,
  independent gate — this is the same "defense in depth" pattern you'd want
  before this touched anything real.
The in-memory store resets- on server restart (and on every hot reload
  in dev, since Next.js reloads modules). That's expected for a demo — it's
  called out here rather than left as a surprise.
