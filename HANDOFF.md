# Creative Dynasty Events — Project Handoff

Last updated: 2026-09-28 (Checkpoint 2 — design system, IA, and pages built)
This file is the source of truth for project status across sessions. Read
it before doing any further work on this repo.

> **PRODUCTION DOMAIN NOT CONNECTED**
> **EXISTING DNS/EMAIL RECORDS NOT MODIFIED**

---

## Current status: Checkpoint 2 (design system + information architecture) complete. See "Checkpoint 2 Complete" below.

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
4. **The pre-audit build has now been reconciled against the audit.** See
   "Reconciliation Complete" below for the full before/after. The temporary
   preview (`https://creativedynasty.pages.dev`) will reflect the corrected
   content once this commit deploys.

---

## Reconciliation Complete (2026-09-28)

Full content-integrity pass against `AUDIT.md` and the Owner requirements
table above. No design-system or visual-architecture changes were made —
this was strictly a content correction pass within the existing layout.

### What was removed (unsupported/fabricated — deleted, not hidden)

- **3 invented events** from `src/data/events.ts` ("After Dark: Bold
  Strokes," "Little Creators: Autumn Palette," "The Collective: Open
  Studio Social"), each with a made-up date and a fake `#` registration
  link. The live site verifiably shows zero events — the array is now
  genuinely empty, not just visually hidden.
- **Fake "Reserve Your Seat" registration buttons and a fabricated
  "Connect Eventbrite" teaser line** from `src/components/Events.astro` —
  neither corresponded to a real, working registration path.
- **A fabricated phone number** (`(555) 010-0100`) from
  `src/components/Contact.astro` — no phone number exists anywhere on the
  live site.
- **The Facebook and TikTok links** from `src/components/Contact.astro` —
  no verified Facebook URL exists (the live site's own Facebook icon
  points to Wix's own page, `facebook.com/wix`, not the business's), and
  no TikTok presence was found anywhere in the audit.
- **A row of 4 generic partner/press labels** ("Local Press," "Partner
  Studio," "Featured In," "Community Partner") from
  `src/components/CredibilityStrip.astro` — `AUDIT.md` found zero press
  mentions or confirmed partners anywhere on the live site.
- **3 fabricated gallery categories** (`Sip & Paint`, `Private Socials`,
  `Galas`) from `src/data/gallery.ts`, replaced — not renamed — with the
  live site's real, verified Events-page filters (`All / Signature /
  Social / Family / Private`).
- **Alt text describing specific fictional scenes** ("Guests connecting
  over cocktails," "Live music at a Creative Dynasty gala") on every
  gallery placeholder — replaced with honest "awaiting approved
  photography" alt text.
- **References to "Sip & Paint nights, private socials, and galas"** as
  if they were real offering categories, in the sitewide default meta
  description (`Layout.astro`) and the hero subheadline
  (`Hero.astro`) — Creative Dynasty Events' real offerings are After Dark,
  Little Creators, and The Collective; replaced with the site's actual
  verified tagline copy.
- **An unverified "live music" claim** in the Experience bento grid — the
  audit only confirmed "music + high-energy atmosphere," not specifically
  live music. Softened to "music."
- **Placeholder sender/recipient email addresses**
  (`hello@creativedynastyevents.com`, `bookings@creativedynastyevents.com`)
  in `functions/api/contact.js` and `wrangler.toml` — replaced with the
  real, verified recipient address and Resend's own default sender (see
  "corrected" below for why).

### What was corrected (kept, but fixed to match verified reality)

- **Contact email** (`src/components/Contact.astro`,
  `functions/api/contact.js`, `wrangler.toml`) now uses the real, verified
  `creativedynastevents3@gmail.com` found via a working `mailto:` link on
  the live site — kept visible (not blanked to a placeholder token)
  because it's a real, functioning address, but flagged in code comments
  as OWNER CONFIRMATION REQUIRED on spelling.
- **Instagram link** now uses the real found handle
  (`instagram.com/creative_dynasty_events`) but is shown with a visible
  "(pending confirmation)" tag rather than presented as verified — per the
  explicit instruction not to publish an unconfirmed social URL as fact.
- **Email sender domain**: `FROM_EMAIL` now uses Resend's own
  `onboarding@resend.dev` instead of an invented
  `@creativedynastyevents.com` address, since sending from the real domain
  would require adding DNS records there — off-limits until domain
  migration is approved.
- **Events system** (`src/data/events.ts`, `src/components/Events.astro`)
  was rebuilt (data model + rendering, not visual style) to support
  Coming Soon / Registration Open / Registration Closed / Event Complete
  states, with a registration button only ever rendered when status is
  genuinely "registration-open" and a real link is present. With zero
  events, the section now renders an honest "No public events scheduled
  right now" state with a legitimate CTA to the (verified, working)
  contact/private-booking path — instead of silently showing nothing or
  leaving fake content in place.
- **Booking form fields** (`Contact.astro`) gained a "Number of guests"
  field — not new content, just matching the verified real booking
  process, which the audit confirmed includes this field on both existing
  Wix forms.

### What remains owner-confirmation-required

Unchanged from the Owner requirements table above — nothing new was
resolved by this pass, since reconciliation only works with what's already
verified. Real blockers: contact email spelling, phone/address (still
absent), Facebook URL (still none), Instagram handle currency, founder
photo approval, and photography approval generally.

### What's ready for implementation

Everything now in the codebase is either verified-real (experiences,
booking process, testimonials not yet re-added to markup — see below,
mission/values content already used in `Experience.astro`/
`CredibilityStrip.astro`) or an honest, clearly-marked interim state
(empty events, "pending confirmation" Instagram, no phone/address shown).
Safe to build on top of without further cleanup.

### New issues discovered during this pass

- The build previously had **no way to verify** at build time that no
  `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` marker or fabricated
  content slips into production — still not implemented (see Outstanding).
- The single-page `Contact.astro` section conflates general contact and
  private-booking inquiries into one form under a "Private Booking"
  eyebrow label, while the real site treats `/contact` and
  `/private-bookings` as two distinct pages with two different forms.
  Not fixed in this pass (would require multi-page routing, i.e. a
  structural/design change, explicitly out of scope for a reconciliation-
  only pass) — flagged for Checkpoint 5.
- The site's 6 verified testimonials (`AUDIT.md` §4) are not yet rendered
  anywhere in the current single-page build — the pre-audit build never
  included a testimonials section. Not a fabrication issue, just a gap;
  worth adding once Checkpoint 5+ resumes.

---

## Checkpoint 2 Complete (2026-09-28) — Design system, information architecture, pages

Moved from the single-page reconciled build into a real multi-page site
with a documented design system. No new fabricated content — every page
uses only what `AUDIT.md` verified, or an honest interim/owner-required
state. Ecoverdevaleting.co.uk was used only as a quality/structure
benchmark (see "Design inspiration references" below) — nothing was
copied from it.

### Design system decisions

Formalized, not reinvented — the existing dark/gold palette from the
single-page build already fit the "premium, art-gallery, not generic
SaaS" brief, so Checkpoint 2 productized it into reusable primitives
rather than starting over.

- **Typography:** `Fraunces` (display serif, headings/quotes) + `Inter`
  (sans, body/UI), both loaded once in `Layout.astro`. Scale: `text-4xl
  sm:text-5xl` for section headings, `text-lg` for lead paragraphs,
  `text-sm` for UI labels/eyebrows (`text-xs uppercase tracking-[0.2em]
  text-gold`).
- **Color tokens** (`src/styles/global.css` `@theme` block, unchanged from
  the reconciliation pass): `ink`/`ink-soft` (near-black backgrounds),
  `surface`/`surface-soft` (card backgrounds), `line` (borders), `paper`
  (primary text on dark), `smoke`/`smoke-dim` (secondary text), `gold`/
  `gold-soft` (primary accent), `wine`/`wine-soft` (secondary accent, used
  sparingly for gradients).
- **Spacing rhythm:** sections use `py-20 sm:py-28` (secondary pages) or
  `py-24 sm:py-32` (homepage sections); containers are `max-w-7xl` (wide
  grids), `max-w-5xl`/`max-w-6xl` (medium), `max-w-3xl`/`max-w-2xl`
  (text-focused), all with `px-6 lg:px-10` side padding.
- **Radius/shadow:** cards use `rounded-3xl` with a `border border-line`
  and no box-shadow — depth comes from the border + background contrast,
  not shadows, per the "premium doesn't mean busy" instruction. Buttons
  and pills use `rounded-full`. No blur/glow decoration was added in this
  pass (the old bento grid's glow blobs were removed along with it).
- **Buttons:** 3 variants in `src/components/ui/Button.astro` — `primary`
  (solid gold), `secondary` (outline, paper text), `ghost` (outline, gold
  text). One component, used everywhere, instead of ad hoc button markup
  per page.
- **Forms:** consistent `rounded-xl border border-line bg-ink` inputs
  across both the general contact form and the private-booking form, with
  visible `<label>` elements (not placeholder-only) and a live-region
  status message on submit.
- **Motion:** none added beyond what already existed (hover color/scale
  transitions, a CSS-only FAQ accordion via native `<details>`). No
  parallax, no scroll-triggered animation, no JS-driven interaction beyond
  the mobile menu toggle and gallery filter — deliberately, per the
  "premium doesn't mean busy" instruction.
- **Focus states:** default browser focus rings are intact (nothing in
  `global.css` suppresses `outline`); the FAQ accordion additionally gets
  an explicit gold `focus-visible` ring since `<summary>` styling varies
  across browsers.
- **Responsive breakpoints:** Tailwind defaults (`sm`/`lg`) used
  throughout; every grid collapses to a single column below `sm`, the
  header collapses to a hamburger menu below `md`.

### Page architecture (routes)

Matches the IA recommended in `AUDIT.md` §5 — the real verified 9-page
structure, consolidated where the audit found duplication, with no
invented pages:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About (story, "More Than a Paint Event," founder, mission, values, community, CTA) |
| `/experiences/after-dark`, `/experiences/little-creators`, `/experiences/the-collective` | The 3 real experience detail pages, one dynamic route (`src/pages/experiences/[slug].astro`) driven by `src/data/experiences.ts` |
| `/events` | Events (honest empty state today, category explanations, Events-page testimonials) |
| `/private-bookings` | Private booking info + the detailed booking form (absorbs the old duplicate `/private-booking-page`, per `AUDIT.md` §6) |
| `/contact` | General inquiries only — split from private bookings per this checkpoint's explicit instruction |

No `/experiences` index page was built — the real live site has no such
hub either; the three pages are reachable via Home's "Signature
Experiences" section, Private Bookings' "Choose Your Experience" section,
and a header dropdown.

### Component architecture

New reusable primitives in `src/components/ui/`: `Button`, `SectionHeading`,
`PageHero` (secondary-page hero, lighter than the homepage `Hero`),
`ExperienceCard`, `Testimonial` + `TestimonialsGrid`, `Founder` (full,
used on About), `FAQ` (zero-JS, native `<details>`), `ContactInfoPanel`
(shared email/Instagram panel used on both `/contact` and
`/private-bookings`). Home-only sections live in `src/components/home/`
(`WhyChooseUs`, `SignatureExperiences`, `RootedInCommunity`,
`FounderTeaser`, `FinalCTA`) since they're single-use and page-specific.

Removed: the old single-page `Experience.astro` (bento grid with
improvised headlines that didn't match the real site's actual Home
structure) and the old combined `Contact.astro` (replaced by the
`/contact` + `/private-bookings` split). Neither is referenced anywhere
— confirmed by grep before deletion.

New data files: `src/data/experiences.ts` (structured, verified copy for
all 3 experiences, shared by Home, Private Bookings, and the detail
pages), `src/data/testimonials.ts` (all 6 verified quotes with correct
attribution level), `src/data/founder.ts` (verified name/quote/bio, photo
slot explicitly `null`).

### Testimonials implementation

All 6 verified quotes are now live: the 3 attributed ones (Erica, Leah,
Christine) on Home, matching their real placement; the 3 unattributed
ones on `/events`, also matching their real placement. No quote appears
on both pages, and no name/company/title was invented for the
unattributed ones — `Testimonial.astro` simply omits the attribution line
when `name` is `null`.

### Founder visibility

Per this checkpoint's explicit instruction, the founder is now more
visible than on the live site: a condensed teaser (quote + monogram +
"Read Her Story" link) on Home, plus the full section (bio, quote, larger
photo slot) on `/about`. **No photograph of Natassha Johnson was
generated or substituted** — both the teaser and the full section render
a gold monogram ("NJ") in a dashed-border frame when `founder.photo` is
`null`, with an accessible label stating the photo is pending owner
approval. Dropping in a real photo later is a one-line change
(`src/data/founder.ts`) — no layout changes needed.

### New issues discovered / decisions made this pass

- The live Events page's "Limited spots available. Early Bookings
  Recommended." banner directly contradicts its own "No events at the
  moment" message (flagged in `AUDIT.md` §2). Deliberately **not**
  reproduced on `/events` here.
- The live Events page also has a mailing-list signup ("Subscribe to get
  exclusive updates"). **Deferred, not built** — it requires choosing an
  email-list provider, which wasn't part of this checkpoint's scope and
  would need an owner decision. Logged in Outstanding below.
- `/contact`'s form gained an Email field (the live site's real form has
  none — a confirmed defect in `AUDIT.md` §2.7). Not new content, a
  functional fix.
- Both `/contact` and `/private-bookings` submit to the same
  `functions/api/contact.js` endpoint — it already accepts arbitrary
  fields, so no backend change was needed to support two form shapes.

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
  `gallery.ts`, `experiences.ts`, `testimonials.ts`, `founder.ts`) —
  simple arrays/objects, no content collections. Still fine for this
  site's size.

## Routes (current)

Real multi-page site — see "Page architecture" under Checkpoint 2 Complete
above for the full route table (`/`, `/about`, `/events`,
`/private-bookings`, `/contact`, and the 3 `/experiences/*` detail pages).
8 pages build cleanly today.

## Components (current)

- `src/components/` — `Header` (multi-page nav + Experiences dropdown),
  `Hero`, `CredibilityStrip`, `Gallery` (filterable), `Events`, `Footer`.
- `src/components/ui/` — shared primitives: `Button`, `SectionHeading`,
  `PageHero`, `ExperienceCard`, `Testimonial`, `TestimonialsGrid`,
  `Founder`, `FAQ`, `ContactInfoPanel`.
- `src/components/home/` — Home-only sections: `WhyChooseUs`,
  `SignatureExperiences`, `RootedInCommunity`, `FounderTeaser`, `FinalCTA`.

## SEO status

Basic hygiene in place: every page sets its own `<title>` and meta
description via `Layout.astro` props (no more single shared homepage
title). Still not done: sitemap, robots.txt, canonical URLs, OG images,
structured data. Deferred to the dedicated SEO checkpoint (was Checkpoint
7 in the original numbering) rather than done piecemeal here.

## Accessibility status

Not formally audited/tested yet — no compliance claimed. What's already
true by construction: every page has exactly one `<h1>` (verified across
all 8 pages), every form input has a visible `<label for>`, decorative
images use `alt=""` while placeholder content images carry honest
"awaiting approval" alt text (never a fabricated description), the FAQ
accordion is native `<details>`/`<summary>` (keyboard accessible with no
JS), and default browser focus outlines are intact (nothing in
`global.css` suppresses them). Not yet done: a real reduced-motion check,
color-contrast verification, and touch-target sizing review on actual
devices — this session has no screenshot/browser tool, so mobile visual
QA still needs a real browser or device.

## Cloudflare configuration

- Pages project connected via GitHub integration to
  `https://github.com/jitmalhi/creativeDynasty` (branch `main`), auto-
  deploys on push.
- Temporary preview URL: **`https://creativedynasty.pages.dev`** — now
  reflects the reconciled, multi-page Checkpoint 2 build once this commit
  deploys. Still not "final" — see Owner requirements below for what's
  still pending before it's ready for a full owner sign-off.
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

- Sitemap, robots.txt, canonical URLs, OG images, structured data (SEO checkpoint).
- Full accessibility pass: contrast verification, reduced-motion,
  real-device touch targets, screen-reader pass.
- Mailing-list signup on `/events` (real site has one) — deferred, needs
  an owner decision on which provider to use.
- Build-time failure on unresolved `[CONTENT REQUIRED...]` markers.
- DNS migration checklist (before any domain connection).
- Mobile visual QA with an actual browser/device (this session had no
  screenshot/browser tool available) — layout was built mobile-first with
  Tailwind responsive classes throughout, but not yet visually confirmed
  on a real viewport.
- The real photography/founder-photo/social-URL/contact-info blockers
  from Owner requirements below — nothing code-side left to do until
  those answers arrive.

## Next recommended step

The temporary preview now reflects a real, multi-page, on-brand site with
zero fabricated content. Two sensible paths from here: (a) send the
preview URL to the owner for a first look now that it's substantively
complete, gathering the outstanding owner-confirmation answers in
parallel, or (b) proceed straight into the SEO/accessibility/mobile QA
checkpoint, since that work doesn't depend on any outstanding answer
either. Actual approved photography, a founder photo, and confirmed
contact/social details are the only things that still require the owner
directly.

---

## Owner requirements (prioritized, updated 2026-09-28)

Reorganized from `AUDIT.md` §7–8 into the 10 priority areas the user asked
for, each marked as a **blocker** (final content can't be published
without it) or **can wait** (doesn't stop other work). Nothing here is
invented — every "known" value is copied verbatim from `AUDIT.md`, and
every gap stays `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` until
the owner answers.

| # | Area | Status | Blocker? |
| - | --- | --- | --- |
| 1 | Organization contact info | Email found: `creativedynastevents3@gmail.com` (verified `mailto:` on live site) but spelling is unusual — needs owner confirmation it's correct, not a typo. Phone: `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`. Address: `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` (or confirmation there isn't one to publish). | **Blocker** for a final, trustworthy Contact section and for `wrangler.toml` `TO_EMAIL`. |
| 2 | Social media URLs | Instagram found (`instagram.com/creative_dynasty_events`) but unconfirmed as current/owner-controlled. Facebook is confirmed **wrong** (links to `facebook.com/wix`) — real URL is `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`. TikTok/other: `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`. | **Blocker** for publishing any social links (better to omit than publish wrong/unconfirmed ones). |
| 3 | Founder info + approved photo | Name, quote, and bio verified (`AUDIT.md` §4 — Natassha Johnson). **No approved founder photograph confirmed** — the 9 real images found on the live site are general event photos, not a confirmed headshot. `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` for a founder photo specifically. | **Blocker** only for the founder-photo asset; the bio/quote text is already safe to use. |
| 4 | Current experiences/programs offered | Fully verified: After Dark, Little Creators, The Collective — names, taglines, full descriptions, "who it's for," "what's included" all confirmed (`AUDIT.md` §4). | Not a blocker — ready to use as-is. |
| 5 | Public events currently scheduled | Verified: the live site shows **zero** ("No events at the moment"). Owner should confirm whether this is accurate/current or the Wix site is simply stale. | Not a blocker for building the events system (an honest empty state is a valid, correct state) — only a blocker for populating actual events. |
| 6 | Event dates, locations, pricing, registration | None exist yet (depends on #5). `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` for all fields, per event, once any are scheduled. | Blocker for populating real events; not a blocker for building the event template/status-state logic. |
| 7 | Private-event/booking process | Fully verified: 3-step process, full field list from both existing forms, "perfect for" categories, what's included (`AUDIT.md` §4). | Not a blocker — ready to use as-is. |
| 8 | Verified testimonials/reviews | 6 verified quotes captured verbatim (`AUDIT.md` §4) — 3 attributed by first name (Erica, Leah, Christine), 3 unattributed. These were already public on the live site. Recommend a light owner confirmation that these may be reused on the new site, but this is a formality, not a real unknown. | Not a real blocker — can proceed with these; flag the reuse confirmation as a courtesy check. |
| 9 | Legitimate review platform for a review-count signal | No evidence of an aggregated review platform (no Google Business Profile, Checkatrade-equivalent, etc. found anywhere in the audit). `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` if one exists. | Not a blocker — this trust-signal pattern (see Ecoverde reference below) is simply omitted until/unless confirmed. Never invent a count. |
| 10 | Approved photography + permission | 9 real media assets identified on the live Wix site (`AUDIT.md` §4), but no owner confirmation on which are approved for reuse, whether higher-resolution originals exist, or whether the one confirmed AI-generated asset should be kept, replaced, or dropped. | **Blocker** for finalizing real imagery — but see "Creative Asset Plan" below for how the layout can proceed without waiting. |

### Summary

**Real blockers** (final content cannot be published without these): #1
(phone/address + email confirmation), #2 (real social URLs), #3 (founder
photo), #10 (photo approval). Everything else in this content set is
either already fully usable (#4, #7, #8) or has an honest interim state
that doesn't require the answer to keep building (#5, #6, #9).

---

## Creative Asset Plan

Documents every meaningful image slot in the planned site so the layout
can be built now and real photography (or, where explicitly appropriate,
AI-generated supporting imagery) can be dropped in later without
restructuring anything. **No real images are being sourced or generated
at this stage** — the table below is planning; the implementation status
column reflects Checkpoint 2's actual code.

**Update (Checkpoint 2):** every slot below now exists in real code, not
just as a plan. Swapping in an approved photo means changing one string
(a `src`/`image` field in `src/data/experiences.ts`,
`src/data/gallery.ts`, or `src/data/founder.ts`) — no component or layout
changes required. Two slots not anticipated in the original plan were
added this pass: a founder-teaser photo/monogram on Home (same source as
the About founder photo — `src/data/founder.ts`), and one dedicated
placeholder image per experience (`public/images/experiences/*.svg`,
referenced from `src/data/experiences.ts`) used on the experience cards
and detail-page heroes.

Ground rule carried over from the project brief: AI-generated imagery may
only be used where it's clearly generic/abstract and could never be
mistaken for a real Creative Dynasty Events event, customer, or the
founder. Anywhere a slot says "real preferred," AI imagery is not an
acceptable permanent substitute — at most a neutral placeholder until real
photography is approved.

| Section | Purpose | Orientation / aspect ratio | Recommended subject | Real photography? | AI-generated appropriate? |
| --- | --- | --- | --- | --- | --- |
| Home — Hero | First impression; sets the "art-infused experience" tone | Wide/landscape, full-bleed (~21:9 desktop, crops to ~4:5 mobile) | Guests actively painting/mingling in ambient event lighting | **Strongly preferred** — this is the site's core credibility moment | No — would misrepresent what the events actually look like |
| Home — "More Than Events" support image | Reinforces the sensory-experience message | Portrait or square | Close-up: canvas, brushes, shared table, food | Preferred | Only as an abstract texture (e.g. paint-splatter), never depicting people |
| Home — Signature Experiences (3 cards) | Differentiate After Dark / Little Creators / The Collective | Square or 4:5 portrait, one per card | One representative real photo per experience type | **Strongly preferred** — these are three distinct real offerings | No |
| Home — Testimonials | Humanize the 6 verified quotes | Small circular avatar, if used at all | N/A — no verified customer photos exist | N/A | **No** — do not use stock/AI faces standing in for real reviewers; use initials/monogram instead |
| About / Home — Founder | Builds personal trust (see Ecoverde reference pattern) | Portrait, 4:5 or 1:1 | Natassha Johnson | **Required to be real** — see Owner requirements #3 | Never |
| About — "Rooted in Community" | Shows local-business partnership | Wide/landscape | Community/partner event moment | Preferred | Acceptable only as generic decorative background if no real photo exists |
| Events — category tiles (Signature/Social/Family/Private) | Visually differentiate the 4 real filter categories | Square, one per tile | Representative real photo per category | Preferred | Acceptable as neutral abstract placeholder until real photos are sorted by category |
| Events — individual event card | Represents a specific scheduled event | Landscape thumbnail | Photo from a comparable past event, once one exists | Preferred once available | No — never imply a specific fabricated event happened; use a plain neutral/no-image state until real events exist |
| Private Bookings — hero/support image | Sells the private-booking experience | Wide/landscape | Table set up with painting supplies + food | Preferred | Acceptable only as generic decorative texture |
| Portfolio/Gallery grid | Entire purpose is proving real past events happened | Mixed portrait/landscape, masonry | The 4 real event photos already identified (`AUDIT.md` §4), plus any newly approved ones | **Required to be real, no exceptions** | Never — AI imagery here would be actively misleading |
| Contact page | Supporting visual texture only, no claims of reality | Any | Abstract brushstroke/paint texture | Not needed | Acceptable — no people or event implied |
| Sitewide — logo/favicon | Brand mark | Square/icon | Existing "Cd submark logo" asset (already brand-approved, already in use) | Already real and approved | N/A |

Note: the one existing asset filenamed `ChatGPT Image Apr 11, 2026,
09_42_18 AM.png` (confirmed AI-generated, `AUDIT.md` §2.9) should only ever
be considered for a slot marked "AI-generated appropriate," never for a
"real preferred/required" slot — pending owner decision per Owner
requirements #10.

---

## Design inspiration references

Not project rules — just patterns worth considering when Checkpoint 3
(design system) resumes. Logged here so they aren't lost between sessions.

### ecoverdevaleting.co.uk (reviewed 2026-09-28)

A UK mobile car-valeting site, offered as a reference by the user, not a
site being cloned. Transferable patterns for Creative Dynasty Events:

- **Founder-led trust, surfaced early.** They run a "Meet the Founder"
  section with photo + personal narrative near the top of the funnel, not
  buried. Creative Dynasty already has real founder content (Natassha
  Johnson, verified in `AUDIT.md` §4) sitting only on `/about` — worth
  considering a condensed version on the homepage too.
- **Low-friction alternative contact channel.** They lead with WhatsApp
  alongside a form. This directly addresses a real audit finding: the live
  Creative Dynasty contact form has no email field at all
  (`AUDIT.md` §2.7). Worth asking the owner whether Instagram DM or
  WhatsApp is already how people actually reach them informally, as a
  fallback/companion to fixing the form.
- **Photo-forward, not stock-forward.** Real before/after and in-progress
  work photos, not polished stock imagery, and it still reads as
  professional through layout/typography. Reinforces the project's own
  image-strategy rule — Creative Dynasty's casual real event photos
  (`AUDIT.md` §4, "Real photography available for reuse") can work the
  same way once given a consistent treatment.
- **FAQ block addressing objections.** ("Can you come to my home?" etc.)
  Creative Dynasty's three experience detail pages already contain
  FAQ-shaped verified content ("Who it's for," "What's included") that
  could be reformatted as an explicit FAQ section rather than plain prose.
- **Review-count trust signals near the hero.** They aggregate review
  counts from multiple platforms (Google, Checkatrade, Facebook) right
  under the hero. Creative Dynasty has 6 verified testimonials but no
  known aggregated review-platform presence — worth an owner question if
  one exists (Google Business Profile, Facebook reviews) to borrow this
  pattern honestly rather than inventing a count.

No action taken on these — they're inputs for the design-system checkpoint,
not commitments.
