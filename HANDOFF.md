# Creative Dynasty Events — Project Handoff

Last updated: 2026-09-28 (owner requirements + Creative Asset Plan added)
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
restructuring anything. **No images are being sourced or generated at
this stage** — this is planning only.

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
