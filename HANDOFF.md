# Creative Dynasty Events — Project Handoff

Last updated: 2026-09-28
This file is the source of truth for project status across sessions. Read
it before doing any further work on this repo.

> **PRODUCTION DOMAIN NOT CONNECTED**
> **EXISTING DNS/EMAIL RECORDS NOT MODIFIED**

---

## Current status: Checkpoint 1 complete. Checkpoints 2–4 exist but predate the audit-first process and need reconciliation before continuing.

### What actually happened, in order

1. An earlier session built a full Astro + Tailwind site (hero, credibility
   strip, bento-grid experience section, gallery, events list, contact
   form) and deployed it to Cloudflare Pages at a temporary URL, **before**
   the strict audit-first / no-fabrication process below was established.
   That build used invented placeholder content in several places (made-up
   event dates, a placeholder contact email/phone, gallery categories that
   don't match the real site) alongside some content that happened to be
   accurate (the award nomination text, the three experience names).
2. This session received a formal project brief (see "Governing rules"
   below) that requires: audit before rebuilding, zero fabricated content,
   temporary-URL-only deployment until explicit approval, and checkpoint-
   gated delivery with a maintained `HANDOFF.md`.
3. **Checkpoint 1 (audit) has now been done properly** — see `AUDIT.md` for
   the full findings. It used direct HTTP fetches of all 9 real pages on
   `www.creativedynastyevents.com`, not summaries, so it's source-verified.
4. **The existing build has NOT yet been reconciled against the audit.**
   Concretely, the following in the current codebase are known to conflict
   with verified reality and must be fixed before this can be considered a
   real Checkpoint 2–4 pass:
   - `src/data/events.ts` — contains 3 fabricated events with invented
     dates. The real site currently has **zero** upcoming events ("No
     events at the moment"). Must be replaced with an honest empty/"Details
     Coming Soon" state, per the Event Logic rules.
   - `src/components/Contact.astro` — placeholder email
     (`hello@creativedynastyevents.com`), placeholder phone (`(555)
     010-0100`), and placeholder (`#`) social links. Real verified email is
     `creativedynastevents3@gmail.com`; no real phone or address exists to
     publish; Instagram is `instagram.com/creative_dynasty_events`
     (unconfirmed by owner); Facebook has no verified real URL yet.
   - `src/data/gallery.ts` — categories (`Sip & Paint / Private Socials /
     Galas`) don't match the real Events page filters (`ALL / SIGNATURE /
     SOCIAL / FAMILY / PRIVATE`).
   - `src/components/CredibilityStrip.astro` — award wording happens to
     match the verified real text, no change needed there.
   - `src/components/Hero.astro` and gallery images — all placeholder SVGs,
     none are real Creative Dynasty Events photography. 9 real images were
     identified in the audit (Wix CDN) but not yet pulled in — needs owner
     approval on which to use (see `AUDIT.md` §8).
   - No page currently has a unique title/meta description — same defect
     as the live Wix site, just not yet fixed here either.
5. **Do not treat the current deployed preview
   (`https://creativedynasty.pages.dev`) as reviewable/final.** It still
   contains the pre-audit fabricated content above.

### Recommended immediate next step

Reconcile the existing components/data against `AUDIT.md` (Checkpoint
2–4 cleanup pass), THEN move to Checkpoint 5+ (internal pages, SEO,
accessibility, mobile QA). Do not add new fabricated content in the
process — anything still unknown after the audit stays marked
`[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` in the code and content
data files, and the production build should fail if any such marker
remains at build time (not yet implemented — see Outstanding below).

---

## Governing rules for this project (do not deviate without the user's say-so)

- Audit before implementing (Checkpoint 1 — done, see `AUDIT.md`).
- Never invent events, dates, locations, testimonials, partnerships,
  awards, numbers, reviews, pricing, or credentials. Unknowns are marked
  `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`.
- Do not connect the production domain (`creativedynastyevents.com`) or
  touch its DNS/MX/SPF/DKIM/DMARC records. Deploy only to the `*.pages.dev`
  temporary URL until the owner explicitly approves domain migration.
- Never fabricate a redirect. Only the one documented in `AUDIT.md` §6 is
  real.
- Never show a "Register Now" state on an event unless registration is
  actually confirmed open. Use honest states: Coming Soon / Details Coming
  Soon / Registration Open / Registration Closed / Event Complete.
- The production build should fail if unresolved `[CONTENT REQUIRED...]`
  markers remain (not yet implemented — see Outstanding).
- Work in checkpoints; report progress at each one; don't skip ahead.

---

## Architecture

- **Framework:** Astro 7, static output (`output: 'static'` in
  `astro.config.mjs`).
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`, custom design
  tokens in `src/styles/global.css` (`@theme` block — colors, fonts). No
  `tailwind.config.js` needed under v4.
- **Hosting:** Cloudflare Pages. Build command `npm run build`, output
  `dist`, Functions auto-detected from top-level `functions/`.
- **Forms:** `functions/api/contact.js` is a Cloudflare Pages Function
  that validates input and sends via Resend when `RESEND_API_KEY` is set;
  degrades gracefully (`delivered:false`) when the key isn't configured
  yet. Non-secret `TO_EMAIL`/`FROM_EMAIL` live in `wrangler.toml [vars]`
  — **these currently hold placeholder addresses, not the verified real
  email**; must be updated to `creativedynastevents3@gmail.com` (or
  whatever the owner confirms per `AUDIT.md` §8 Q1) before this is
  trustworthy.
- **Content model:** plain `.ts` data files under `src/data/` (`events.ts`,
  `gallery.ts`) — simple arrays, no content collections yet. Fine for this
  site's size; revisit only if it grows meaningfully.

## Routes (current)

- `/` — single page (`src/pages/index.astro`), all sections as components
  under `src/components/`.

No internal multi-page routing has been built yet (Checkpoint 5). The real
site has 9 pages (see `AUDIT.md` §1) — the rebuild's IA (§5 of the audit)
proposes consolidating `/private-booking-page` into `/private-bookings`
and keeping the rest, including 3 real experience detail pages, which do
not exist yet in this codebase.

## Components (current)

`Header`, `Hero`, `CredibilityStrip`, `Experience` (bento grid), `Gallery`
(filterable), `Events`, `Contact`, `Footer` — all under `src/components/`.
See "What actually happened" above for which of these contain content that
needs correcting.

## SEO status

Not started for the new site. Current build has no per-page titles beyond
the single homepage `<title>`, no sitemap, no robots.txt, no structured
data. This mirrors gaps found in the audit of the live Wix site — needs to
be done properly here, not copied.

## Accessibility status

Not audited yet for the new build. The live Wix site's biggest known issue
(filename-as-alt-text on every image) must specifically be avoided when
real photography is added here.

## Cloudflare configuration

- Pages project connected via GitHub integration to
  `https://github.com/jitmalhi/creativeDynasty` (branch `main`), auto-
  deploys on push.
- Temporary preview URL: **`https://creativedynasty.pages.dev`** — review
  only, contains pre-audit placeholder content (see above), not ready for
  owner review yet.
- `RESEND_API_KEY` secret: not yet set (owner/developer action, via
  `npx wrangler pages secret put RESEND_API_KEY`).
- No custom domain attached. No DNS changes made anywhere.

## Production-domain status

**NOT CONNECTED.** `creativedynastyevents.com` still points at the
existing Wix hosting. No nameserver, DNS, MX, SPF, DKIM, or DMARC records
have been touched.

## DNS status

Unchanged. A full DNS migration checklist has not been created yet —
required before any domain migration step, per the governing rules above.

## GitHub / ownership

Repo: `https://github.com/jitmalhi/creativeDynasty`, owned by the
developer's personal GitHub account (`jitmalhi`) as of this writing. **Not
yet confirmed** whether long-term ownership transfers to Creative Dynasty
Events or stays with the developer under an agreed arrangement — flagged
as an owner question (`AUDIT.md` §8 Q8).

## Outstanding / not yet built

- Reconcile existing components/data against `AUDIT.md` (see "Recommended
  immediate next step").
- Multi-page routing for the real 9-page IA.
- Per-page SEO (titles, descriptions, OG images, canonical URLs, sitemap,
  robots.txt, structured data where justified by verified info).
- Accessibility pass (alt text plan for real photography, focus states,
  reduced-motion, form error handling).
- Build-time failure on unresolved `[CONTENT REQUIRED...]` markers.
- DNS migration checklist (before any domain connection).
- Mobile visual QA with an actual browser/device (this session had no
  screenshot/browser tool available).
- Resolve the two duplicate private-booking forms per `AUDIT.md` §5.

## Next recommended step

Reconcile `src/data/events.ts`, `src/data/gallery.ts`, and
`src/components/Contact.astro` against `AUDIT.md` so the deployed preview
stops showing fabricated content — this is the fastest way to get the
temporary URL to a state that's actually safe to show the owner. Then
proceed to Checkpoint 5 (internal pages) using the IA in `AUDIT.md` §5.
