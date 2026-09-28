# Creative Dynasty Events — Project Handoff

Last updated: 2026-09-28 (Checkpoint 3 — technical QA complete)
This file is the source of truth for project status across sessions. Read
it before doing any further work on this repo.

> **PRODUCTION DOMAIN NOT CONNECTED**
> **EXISTING DNS/EMAIL RECORDS NOT MODIFIED**

---

## Current status: Checkpoint 4 (premium creative/visual audit) complete. See "Checkpoint 4 — Premium Creative / Visual Audit" below. This was an audit-only pass — no redesign, no architecture change. The site is ready for deliberate creative production using this audit as the blueprint.

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

## Checkpoint 3 — Technical QA (2026-09-28)

A technical QA pass across all 9 pages (the 8 content pages plus a new
404), done without a visual browser/screenshot tool (none is available in
this session) — so this is a rigorous code-level and computed audit
(responsive class review, WCAG contrast math, live HTTP testing against a
local Cloudflare emulator), not a pixel-verified visual pass. That
limitation is called out explicitly wherever it applies below, per the
instruction not to claim compliance without having actually tested it.
Ecoverdevaleting.co.uk was used only as a quality/polish benchmark during
this pass — nothing from it was copied.

### 1–2. Mobile & desktop QA

**Method:** reviewed every page's Tailwind responsive classes for the
classic failure modes (fixed pixel widths, unguarded `min-w`, negative
margins, `whitespace-nowrap`/`truncate` that can force overflow, elements
without a responsive column-collapse). A repo-wide grep for `w-[`,
`min-w-`, risky negative margins, and `whitespace-nowrap`/`truncate`
returned **zero matches** — no known overflow-causing patterns exist
anywhere in the codebase.

**Found and fixed (technical):**
- Header brand text (`Creative Dynasty Events` in the display serif) sat
  directly next to the hamburger button with no mobile size reduction —
  tight enough on ≤360px screens to risk cramping or wrapping. Now
  `text-base sm:text-lg`.
- The mobile menu hamburger button was a `p-2` icon button (~36×36px,
  under the 44×44px minimum touch target). Now explicitly `h-11 w-11`
  (44×44px).
- The hero's scroll-down bounce animation had no `prefers-reduced-motion`
  guard. Now `motion-reduce:animate-none`.

**Reviewed, no issue found:** every grid collapses to a single column
below `sm` (`grid-cols-1 sm:grid-cols-2/3`); the header collapses to a
hamburger below `md` with the desktop Experiences dropdown never
rendering on mobile (it's nested inside the `hidden md:flex` desktop nav,
confirmed by reading the markup); the Events date column's fixed `w-40`
is ~160px, safe even at a 320px viewport; the masonry gallery uses native
CSS multi-column (`columns-1 sm:columns-2 lg:columns-3`), which reflows
safely.

**Not verified (needs a real browser/device):** actual visual crop of the
placeholder images at each breakpoint, real touch-target feel, and
whether the spacing "feels" intentional rather than just avoiding bugs —
these are judgment calls a static code read can't fully make. Flagged
under Premium Visual QA below where relevant, and as a follow-up in
Outstanding.

**Desktop:** container widths are consistent by content type
(`max-w-7xl` for wide grids, `max-w-5xl`/`max-w-6xl` for medium,
`max-w-3xl`/`max-w-2xl` for text-focused sections) and section padding
follows one rhythm (`py-20 sm:py-28` secondary pages, `py-24 sm:py-32`
homepage) — no inconsistent one-off spacing found. See Premium Visual QA
for a judgment call on whether this rhythm becomes *repetitive* across
pages, which is a design question, not a bug.

### 3. Accessibility QA

**Verified by construction / re-checked this pass:**
- Exactly one `<h1>` per page, confirmed by grepping all 9 built pages
  (not just assumed from the source).
- Every form input has a visible `<label for>` (no placeholder-only
  labeling).
- Decorative images use `alt=""`; every placeholder content image carries
  honest "awaiting approval" alt text — never a fabricated description.
- The FAQ accordion uses native `<details>/<summary>` — keyboard and
  screen-reader accessible with zero custom JS.
- Default browser focus outlines are intact (`global.css` never sets
  `outline: none`); the FAQ trigger additionally gets an explicit gold
  `focus-visible` ring.
- **Color contrast — computed, not estimated.** Ran the actual WCAG
  relative-luminance formula against every text/background color pair
  used in the design system. Every pairing passes AA for normal text
  (≥4.5:1); most exceed AAA (7:1):

  | Pairing | Ratio | AA normal text |
  | --- | --- | --- |
  | paper on ink (body text) | 17.57:1 | Pass |
  | smoke on ink (secondary text) | 9.31:1 | Pass |
  | smoke-dim on ink (most muted text used) | 5.21:1 | Pass |
  | gold on ink (eyebrows/links) | 8.18:1 | Pass |
  | ink on gold (primary button text) | 8.18:1 | Pass |
  | paper on wine (info panel heading) | 9.20:1 | Pass |
  | paper/80 opacity on wine, correctly alpha-blended | 6.50:1 | Pass |
  | gold-soft on wine (blockquote accent) | 6.10:1 | Pass |

  No color pairing in the current design system fails AA. This is a real
  finding, not a guess — the script is disposable but the math is exact.

**Found and fixed (technical):** none beyond what's listed under
Mobile/Desktop above (the touch-target and reduced-motion fixes are
accessibility fixes as much as mobile ones).

**Implemented but not manually tested (flagged, not claimed):** the
header's Experiences dropdown is built to open on both `:hover` and
`:focus-within`, so tabbing to the "Experiences" link should reveal the
panel and let a keyboard user continue tabbing into its links — this is
the correct pattern in principle, but hasn't been confirmed with a real
keyboard/screen-reader pass. Recommend a manual test before launch.

**Not yet done, no compliance claimed:** a real screen-reader pass, a
full keyboard-only walkthrough of every form and interactive element, and
device-based touch-target confirmation. This project does not claim WCAG
compliance — only what's listed above as actually checked.

### 4–5. SEO & structured data

**Found and fixed (technical, both real bugs):**
- `astro.config.mjs` had `site: 'https://creativedynastyevents.com'` —
  meaning every canonical URL, OG URL, and sitemap entry was already
  claiming the real production domain as canonical, despite that domain
  still running the live Wix site with entirely different content. This
  is exactly the risk this checkpoint asked to guard against, just in the
  opposite direction from what was expected. Fixed: `site` now points at
  the actual temporary preview (`https://creativedynasty.pages.dev`),
  with a comment explaining not to change it until domain migration is
  approved.
- Added `<meta name="robots" content="noindex, nofollow">` sitewide and a
  `public/robots.txt` that disallows all crawling. This is the strongest
  possible guard against the temporary domain being indexed or mistaken
  for the real site — it can't become a canonical anything if it's never
  indexed. Both should be reversed only when the owner approves going
  live on the real domain.

**Added (technical):**
- `@astrojs/sitemap` integration — `sitemap-index.xml`/`sitemap-0.xml`
  now generate automatically at build time from real routes (verified:
  all 8 content pages present, the new 404 page correctly excluded).
- Per-page canonical `<link>` tags (verified present and correct on every
  page checked).
- `og:url` and `og:site_name` added; `og:image` deliberately **not**
  added — no approved social-share image exists yet, and fabricating one
  isn't appropriate. Documented in the Creative Asset Plan.
- A simple monogram favicon (gold "CD" on ink) replacing Astro's default
  rocket icon — explicitly a placeholder, not a claim to be the business's
  real approved logo mark (that requires the same photography-approval
  process as everything else — see Owner requirements).
- Minimal `Organization` JSON-LD (name, url, description only).
  Deliberately **excludes** address, telephone, `sameAs` (social),
  `aggregateRating`, and `priceRange` — none are confirmed. Used
  `Organization` rather than `LocalBusiness` specifically because
  `LocalBusiness` schema implies a physical address, which isn't
  verified.
- Every page already had its own unique `<title>`/description via
  `Layout.astro` props since Checkpoint 2 — reconfirmed here, not
  re-done.

**Still outstanding:** sitemap/robots.txt need to be swapped for
production-ready versions when the domain migrates (documented inline in
both files as a reminder).

### 6. Links

Re-ran a full `href="/..."` sweep across the entire built output. Every
internal link resolves to a route that actually exists — full list:
`/`, `/about`, `/contact`, `/events`, `/experiences/after-dark`,
`/experiences/little-creators`, `/experiences/the-collective`,
`/private-bookings`, plus the in-page anchors `/#experiences` and
`/private-bookings#request`, both of which target real `id` attributes
(confirmed in the markup). **No dead internal links found.**

Facebook remains removed (no verified URL exists — confirmed still true,
not re-added). Instagram remains visibly marked "(pending confirmation)"
on both `/contact` and `/private-bookings` — confirmed still accurate,
not silently upgraded to "verified."

### 7. Forms

Tested both forms end-to-end against a local Cloudflare Pages Functions
emulator (`wrangler pages dev`) — no real email was sent (`RESEND_API_KEY`
isn't set, so delivery is safely stubbed regardless; per instruction, no
test message was sent to any personal address):

| Test | Result |
| --- | --- |
| Valid general-contact payload | `200 {"ok":true,"delivered":false}` |
| Valid private-booking payload | `200 {"ok":true,"delivered":false}` |
| Honeypot filled (simulated bot) | `200 {"ok":true,"delivered":false}` — silently accepted, no email attempted |
| Missing required fields | `400 {"error":"Name and email are required"}` |
| Invalid email format | `400 {"error":"Invalid email address"}` |

**Found and fixed (technical):**
- Neither form had any spam deterrent. Added an accessible honeypot field
  (visually and semantically hidden via `aria-hidden` + zero-size
  `overflow-hidden`, **not** the common off-screen-positioning trick,
  which can itself cause horizontal-overflow bugs on some browsers — the
  exact class of bug this checkpoint asked to hunt for) to both forms,
  checked server-side in `functions/api/contact.js`.
- The shared `contact.js` function used to assume one fixed set of fields
  (`eventType`/`date`). Rewritten to build the forwarded email body
  generically from whatever fields are present, so it correctly handles
  both the general-contact shape and the private-booking shape (including
  the new `inquiryType`/`guests` fields) without needing to know which
  page sent it.
- A real, previously-undiscovered bug unrelated to forms: **any
  nonexistent URL returned HTTP 200 with the homepage's content** instead
  of a 404 — Cloudflare Pages' default fallback behavior with no
  `404.html` present. Added `src/pages/404.astro`; re-tested against the
  local emulator and confirmed a nonexistent URL now correctly returns
  `404` with a proper not-found page.

**Validation/errors:** both forms rely on native HTML5 constraint
validation (`required`, `type="email"`) plus a live-region
(`aria-live="polite"`) status message for the async submit result. This
is a reasonable accessible baseline — browsers announce native validation
messages to screen readers — but there's no custom per-field inline error
styling. Logged as a creative/UX enhancement, not a blocker.

**Email delivery architecture:** unchanged from Checkpoint 2 — Resend,
`onboarding@resend.dev` sender (deliberately not the real domain, since
verifying a sending domain requires DNS changes that are off-limits
pre-approval), graceful `delivered:false` degradation until the API key
is set. **Not tested:** actual email arrival, since no key is configured
— documented as a limitation, not silently assumed to work.

### 8. Performance

- **Images:** all current images are placeholder SVGs, a few KB each —
  no real-photography weight to optimize yet (that's Checkpoint 4's
  problem, and the Creative Asset Plan below specifies dimensions so
  future images can be sized correctly from the start rather than
  optimized after the fact).
- **Lazy loading:** gallery and experience-card images use
  `loading="lazy"`; the homepage hero and each page's `PageHero`/detail
  hero correctly do *not* lazy-load (they're above the fold — lazy-loading
  an LCP image would hurt, not help, performance).
- **JavaScript:** no framework runtime ships to the client anywhere —
  Astro's static output plus a handful of small vanilla scripts (mobile
  menu toggle, gallery filter, two form submit handlers). No new JS
  dependency was added this pass.
- **CSS:** single Tailwind v4 JIT-generated bundle, ~31KB unminified
  before gzip, scoped to only the utility classes actually used across
  the whole site — confirmed by checking the build output, not assumed.
- **Fonts:** Google Fonts link already used `&display=swap` (prevents
  invisible-text-during-load); left unchanged, already correct.
- **Dependencies added this pass:** only `@astrojs/sitemap` (a first-party
  Astro integration, build-time only, adds zero client-side JS). No
  performance library was added "because one exists" — the honeypot,
  404 page, and structured data are all plain HTML/JS with no new
  dependency.

---

## Premium Visual QA

Honest critique against the Ecoverde quality benchmark — for polish,
depth, and conversion strategy, not layout/branding to copy. Split
strictly into **Technical issue** (a bug, something objectively broken)
vs. **Creative improvement** (a legitimate design judgment call, to be
addressed in the visual/asset pass, not now).

**Technical issues found this pass:** all already listed and fixed above
under Checkpoint 3 (site-config canonical bug, missing 404, missing
noindex/sitemap/robots, missing honeypot, two mobile touch-target/motion
issues). Nothing outstanding in this category from this pass.

**Creative improvements identified (deferred to the visual/asset stage,
not fixed now):**

- **Photo-forward storytelling is currently the weakest part of the
  site, structurally by design.** The hero, every experience card, the
  founder section, and the entire gallery are placeholder-only. This
  isn't a bug — it's the direct, correct consequence of not fabricating
  or reusing unapproved photography. But it's also exactly where Ecoverde
  earns most of its "premium" feeling (real before/after work, a real
  founder photo). Closing this gap is squarely the next stage's job, and
  the highest-priority creative item on the list below.
- **Section rhythm is visually repetitive across pages.** Home's "Why
  Choose Us" → "Signature Experiences," About's pillar/values blocks, and
  Private Bookings' "Perfect For"/"What's Included" all use the same
  centered-heading-plus-3-or-4-column-grid pattern. Individually clean,
  but a visitor browsing several pages in one sitting could start to feel
  the site is one template repeated. Worth varying composition (e.g., an
  asymmetric or left-aligned section per page) once real imagery gives
  something worth breaking the grid for.
- **Trust signals under-index versus the benchmark, correctly.** Ecoverde
  leans on aggregated review counts and multiple credibility layers.
  Creative Dynasty Events currently has none of that verified (no review
  platform found in the audit), so none was fabricated — the trust
  section here is quieter than the benchmark. This will close naturally
  once/if the owner confirms a real review platform; it should not be
  papered over with an invented number in the meantime.
- **FAQ presence is narrow.** Currently lives only on the three
  experience detail pages. Ecoverde's FAQ pattern is more central to its
  conversion strategy. Home and Private Bookings could each carry a short,
  page-relevant FAQ block once there's more verified content to draw from
  (e.g., real event logistics once any exist).
- **Testimonial cards are functional but plain** — a bordered quote block
  with no visual distinction beyond the gold name. A tasteful quote-mark
  treatment or grouping with a founder/photo element (once approved
  imagery exists) would lift this without adding complexity.

**What's already working, stated plainly (not everything needs fixing):**
the dark ink/gold palette with a serif display face reads as a distinct,
intentional point of view rather than a generic template; spacing and
container widths are consistent throughout, not ad hoc; the CTA hierarchy
(solid gold primary vs. outline secondary) is clear and used consistently
sitewide; the founder is now genuinely more visible than on the live
site, exactly as instructed, even without a photo yet.

---

## Checkpoint 3 — classified findings summary

Every finding from this checkpoint, sorted into exactly one of three
buckets, as requested.

### Must fix before launch (technical — none outstanding; all found this pass were fixed)

All 8 technical bugs found during this QA pass were fixed in the same
pass, not just logged: the `astro.config.mjs` canonical-domain bug, missing
sitewide `noindex`/`robots.txt`, missing sitemap, missing per-page
canonical tags, missing 404 handling (a real, previously-undiscovered
bug), missing form spam protection, the undersized mobile menu touch
target, and the missing `prefers-reduced-motion` guard. Nothing in this
category remains open from this pass. Still open from earlier checkpoints
(unrelated to this QA pass): build-time failure on unresolved
`[CONTENT REQUIRED...]` markers is still not implemented.

### Creative enhancement (deferred to the visual/asset pass, not blockers)

- Real photography for the hero, 3 experience images, founder photo, and
  gallery (see updated Creative Asset Plan above — this is the big one).
- Section-layout variety to reduce visual repetition across pages.
- Wider FAQ presence (Home, Private Bookings) once more verified content
  exists to draw from.
- More visually distinctive testimonial card treatment.
- Custom per-field inline form validation styling (native browser
  validation already works and is accessible; this would be polish).
- A real `og:image` once a hero/founder photo exists to source it from.

### Owner confirmation (unchanged blockers — nothing in this QA pass could resolve these)

Contact email spelling, phone/address, the real Facebook URL, Instagram
currency, founder photo approval, and photography approval generally —
identical to the list carried since Checkpoint 1. This QA pass was
purely technical/structural and didn't touch content, so this list is
unchanged, not newly discovered.

---

## Checkpoint 4 — Premium Creative / Visual Audit (2026-09-28)

Audit only, per instruction — no redesign performed. One tiny, genuinely
objective fix was considered (making `Button.astro`'s mobile width
consistent with `Hero.astro`'s hand-coded buttons) and **reverted** after
checking every usage: most `Button` instances are standalone single CTAs
where forcing full-width would look worse, not better, so this is a real
design judgment call for the next stage, not an obvious bug. No other
code changes were made this pass. Reviewed via a fresh, complete re-read
of every page's source (not recycled from Checkpoint 3's notes), since
this audit needed page-by-page specificity. No browser/screenshot tool
was available — mobile findings are code-level (spacing, breakpoint
math, actual character-width estimates where relevant), clearly marked
as not device-verified.

### Overall assessment

The site is honest, structurally sound, and already has a distinct point
of view (the dark ink/gold palette + serif display face doesn't read as
a generic template). What's holding it back from "professionally
art-directed" today is almost entirely the absence of real photography —
not the code, not the information architecture, and not the copy. The
second most significant issue is systemic: nearly every section on every
page opens with the same "centered gold eyebrow + centered heading"
gesture, and 3-column bordered card grids appear on every single page.
Individually each instance is clean; together they're the clearest
"template" tell on the site. Both issues have clear, specific fixes
documented below for the next stage.

### Strong existing elements (do not change)

- **The About page's founder section** breaks from the card-grid pattern
  with an asymmetric photo+text layout — the most visually distinct
  moment on the site and appropriately so, given it's the most important
  trust element. A model other sections could learn from.
- **Private Bookings has the best internal rhythm of any page** — a
  two-column list section, an experience-card grid, numbered circular
  steps, and a form/panel split are four genuinely different layout
  shapes on one page, not four variations of the same card grid.
- **CTA hierarchy** (solid gold primary vs. outline secondary vs. ghost
  outline-gold) is consistent and legible sitewide — a visitor always
  knows which button is "the" action.
- **The overall Home page narrative arc** (hook → why → what → proof →
  community → who → social proof → ask) follows sound sales-journey
  logic structurally, independent of how any one section looks today.
- **Honesty under real constraints reads as intentional, not broken** —
  the Events empty state, the "(pending confirmation)" Instagram tag, and
  the founder monogram all look like deliberate design choices, not
  missing content. This is worth preserving even after real assets
  arrive — the pattern of graceful, non-alarming placeholder states is a
  genuine strength.

### Generic / template-like elements

- **Home's "Why Choose Us" and "Rooted in Community" sections are nearly
  identical in shape** — both are a centered eyebrow plus one paragraph
  on a plain background, differing only in background shade and word
  count, and they sit close enough together (with only two sections
  between them) to read as two near-duplicate filler slides rather than
  distinct moments.
- **The 3-column bordered-card treatment is reused verbatim for
  unrelated content**: About's "More Than a Paint Event" pillars, Events'
  category descriptions, and Contact's "How Can We Help?" cards are all
  visually identical (`rounded-3xl border-line bg-surface`, icon/emoji +
  title + body) despite representing completely different kinds of
  information. A screenshot of any one of these sections, cropped, could
  belong to almost any events or creative-services business.
- **Every section-opening heading treatment is identical, sitewide, with
  zero exceptions** — `SectionHeading` (or its inline equivalent) always
  centers an uppercase gold eyebrow above a centered serif heading. This
  is the single most systemic "template" signal on the site, more so
  than any individual section.
- **The three experience detail pages currently are, honestly, close to
  the generic template this checkpoint asked me to check for** (Hero →
  text → info list → FAQ → CTA). This is the most direct, specific answer
  to the question this checkpoint posed for section 5 — see "Experience
  page recommendations" below.

### Repetitive patterns (specific locations, not general impressions)

- **Events page: two 3-column card grids appear back-to-back** —
  "Find the Experience That Fits You" (categories) immediately followed
  by the testimonials grid, same column count, same card border
  treatment, no visual separator beyond a background-shade change. The
  single most blatant instance of immediate repetition anywhere on the
  site.
- **About page is the most internally repetitive single page**: two
  "centered eyebrow + one paragraph" moments (Mission, Rooted in
  Community) plus two different card grids (pillars, values) — a visitor
  reaching the bottom of About has seen both dominant patterns on the
  site twice each, on one page.
- **The experience detail pages' FAQ section doesn't add new
  information** — it re-presents the same `whoItsFor`/`whatToExpect`/
  `whatsIncluded` data already shown as bullet lists and pill badges
  seconds earlier in the scroll, just reformatted as three questions with
  the answers joined into one run-on sentence (`Array.join(" · ")`). A
  visitor who just read the "Who It's For" pills doesn't learn anything
  new from the FAQ asking "Who is this experience for?" right below it.
  This is a real, specific weakness, not a generic "add more FAQ" note.

### Visual storytelling opportunities

- **The Gallery/Portfolio section is the most visually inert section on
  the site** — six flat gradient placeholders where the entire point of
  the section is proving real events happened. Highest-leverage single
  fix once photography exists.
- **About's "Our Story" section is pure text** (three paragraphs, zero
  visual support) on the page most fundamentally about the brand's
  origin and the founder's story — a natural home for a photo (founder
  at work, an early event) once approved imagery exists.
- **Experience detail pages have exactly one image each** (the hero) and
  never return to imagery — no image/text alternation, no atmosphere
  shots between the "What to Expect" and FAQ sections. Once photography
  exists, breaking up the current two-column-text-only middle section
  with a supporting image would do more for "premium feel" than any
  layout trick.

### Homepage recommendations (sales-journey evaluation)

Walking through as a first-time visitor, against the 8 questions this
checkpoint asked:

1. **What is Creative Dynasty Events?** Answered clearly by the hero +
   "Why Choose Us."
2. **Who is it for?** Not immediately clear from the homepage alone — the
   Signature Experiences cards show emoji, name, and tagline, but not
   audience. A visitor has to click through to an experience page to
   learn "Adults 21+" (After Dark) or "Families" (Little Creators). Can
   improve with current verified information: each `experience.whoItsFor`
   array already has this data — surfacing the first item as a small tag
   on the card (not inventing anything, just resurfacing existing data)
   would close this gap.
3. **What experiences are available?** Answered clearly.
4. **Why are the experiences different from each other?** Partially — the
   one-line taglines differentiate them, but nothing on the homepage
   communicates *why* three separate formats exist versus one flexible
   offering. Minor; not urgent.
5. **Can they attend a public event?** Technically yes (CTAs point to
   `/events`), but the homepage gives zero forewarning that the events
   page currently shows an honest empty state — a visitor clicking
   "Browse Events" expecting a live calendar hits a "no events right now"
   message with no setup. Not dishonest, but a real expectation-mismatch
   worth a strategic look: with zero public events today, is "Browse
   Events" the right *primary* hero CTA, versus leading with "Book a
   Private Event" (a guaranteed positive outcome) and making events
   secondary until any are scheduled? Flagged as a genuine strategic
   question for the next stage, not fixed here.
6. **Can they book a private event?** Answered clearly, multiple paths.
7. **Who is behind the business?** Answered, but late in the scroll (the
   founder teaser sits after "Rooted in Community," roughly 60–70% down
   the page). Given this checkpoint's own founder-visibility priority,
   consider moving the teaser earlier — e.g., directly after "Why Choose
   Us," before the experience cards — so trust is established before the
   sales pitch, not after.
8. **What should they do next?** The final CTA is clear (`Book Your Spot`
   / `Partner With Us`), though see point 5 — "Book Your Spot" currently
   routes to `/events`, which has nothing to book yet.

### Experience page recommendations

Direct answer to this checkpoint's specific question: as built today, the
three experience pages **are** close to the generic Hero → text → card →
FAQ → CTA pattern, honestly assessed. Distinguishing what can move each
page forward:

**Can improve with current verified information (no new facts needed):**
- Reformat the FAQ to stop restating the bullet lists above it — either
  drop the FAQ section on these pages entirely (the info is already
  presented, just not as Q&A) or replace the three redundant questions
  with something the current data doesn't already show as a list, framed
  differently (e.g., a synthesized "why this one vs. the other two"
  comparison using the three experiences' own verified taglines).
- Give each of the three pages a more distinct visual identity from each
  other using only the design tokens already available (e.g., a subtler
  wine-toned accent on After Dark vs. a warmer gold-forward treatment on
  Little Creators) — currently all three use identical layout and color
  treatment, differing only in text.

**Requires photography/creative assets:**
- A second and third image per experience (currently one hero image
  each) to support image/text alternation through the page.
- Atmosphere-building imagery distinct per experience, matching the mood
  guidance in the Photography Strategy below.

**Requires owner information (do not fabricate):**
- Any experience-specific social proof (a testimonial that specifically
  mentions After Dark vs. Little Creators) — the 6 verified testimonials
  aren't attributed to a specific experience type, so none can be
  reassigned to a specific page without inventing that connection.
- Real logistics an FAQ could genuinely answer (typical session length,
  cancellation policy, age range specifics beyond "21+") — none of this
  was captured in the audit; **Trust opportunity — owner verification
  required.**

### Founder presentation recommendations

- Current placement is reasonably strong on About (third section in) but
  arguably too late on Home (see Homepage recommendations point 7) —
  recommend moving `FounderTeaser` earlier in Home's section order for
  the next stage.
- **A photograph would materially improve trust** — unambiguous, and
  already the #2 priority asset in the Creative Asset Map below (behind
  only the hero).
- The verified bio/quote are already visually elevated appropriately on
  the Home teaser (large serif quote treatment); on About, the bio
  paragraph is plain body text — a minor opportunity to set the opening
  sentence in a slightly larger pull-quote treatment, not urgent.
- **Recommended photograph type**: not a stiff studio headshot — ideally
  Natassha in an actual event/studio context (e.g., mid-instruction to
  guests), which would simultaneously deliver founder trust *and* real
  event atmosphere in a single asset. This is reflected as the
  recommended composition in the Photography Strategy below.
- The site should not become founder-centric — current balance (one
  teaser + one full section, out of 9 pages) is appropriate and should
  stay roughly that proportion even after a photo is added.

### Photography strategy

Full per-asset strategy, most important assets first. "Real photography
or AI-generated" is stated explicitly for every asset per instruction.

**Homepage Hero**
- Page: Home
- Purpose: Establish atmosphere and immediately communicate that Creative
  Dynasty creates memorable social experiences — the single highest-
  trust, highest-visibility image on the site.
- Recommended subject: guests actively engaged — painting, laughing,
  talking — in ambient event lighting, not a posed group photo.
- Recommended composition: wide environmental shot with people mid-action
  (not looking at camera); subject weight in the upper-to-center frame,
  since the lower third is covered by the headline/CTA gradient overlay.
- Orientation: wide/cinematic landscape.
- Approx. aspect ratio: ~21:9 desktop, must survive a hard crop to ~4:5
  mobile.
- Real or AI: **Real, required.** AI-generated people standing in for
  actual guests would misrepresent what the events look like.
- Priority: **CRITICAL**

**Experience Hero/Card Images (×3 — After Dark, Little Creators, The
Collective)**
- Page: Home (cards), Private Bookings (cards), each `/experiences/*`
  detail page (hero)
- Purpose: differentiate three distinct real offerings at a glance and
  set each experience's own atmosphere.
- Recommended subject: one representative photo per experience —
  After Dark: guests mid-activity in low, moody lighting; Little
  Creators: a parent and child painting together, bright and warm;
  The Collective: a small group in conversation around shared canvases,
  mid-tone lighting.
- Recommended composition: subject in the upper two-thirds of frame
  (cards overlay no text on the image); each should be visually
  distinguishable from the other two at a glance, not just by caption.
- Orientation: portrait.
- Approx. aspect ratio: 4:5.
- Real or AI: **Real, required** — these represent three distinct real
  paid offerings; a customer booking "The Collective" based on an AI
  image of a different vibe would be misled.
- Priority: **CRITICAL**

**Founder Portrait — Natassha Johnson**
- Page: Home (teaser), About (full section)
- Purpose: put a real person behind the brand — the second-highest-
  leverage trust asset on the site after the hero.
- Recommended subject: Natassha, ideally in an actual event/studio
  context (e.g., mid-instruction to guests) rather than a stiff studio
  headshot — doubles as founder trust *and* real event atmosphere.
- Recommended composition: face/shoulders in the upper-to-center frame so
  both a circular 1:1 crop (Home teaser) and a rounded-square 4:5 crop
  (About) keep the face fully visible from one original.
- Orientation: portrait (crops to square for the Home teaser).
- Approx. aspect ratio: 4:5 original.
- Real or AI: **Real, required, no exceptions.** Never AI-generate or
  substitute a stand-in for a real, named person.
- Priority: **HIGH**

**Gallery / Portfolio Grid (6+ images)**
- Page: Home
- Purpose: the section's entire purpose is proving real past events
  happened — nothing else can substitute for this.
- Recommended subject: variety across the 4 verified categories
  (Signature/Social/Family/Private) — wide room shots, close-up canvas
  work, candid guest moments.
- Recommended composition: candid, real, "unpolished-but-professional"
  (matches the Ecoverde benchmark's real-work-photo pattern) rather than
  staged/posed shots.
- Orientation: mixed portrait/landscape (the masonry layout already
  handles mixed ratios).
- Approx. aspect ratio: mixed; ~1000px minimum on the short edge.
- Real or AI: **Real, required, no exceptions.**
- Priority: **HIGH**

**About — "Our Story" supporting image**
- Page: About
- Purpose: give the brand-origin narrative visual support — currently
  three paragraphs of pure text.
- Recommended subject: an early/founding-era event moment, or the
  founder at work, if a real one exists.
- Recommended composition: editorial, quieter than the hero — a single
  strong image rather than a grid.
- Orientation: portrait or square.
- Real or AI: preferred real; if none exists, this section can remain
  text-only rather than force a photo that doesn't tell a true story —
  **Trust opportunity — owner verification required** on whether a
  real founding-era photo exists at all.
- Priority: **MEDIUM**

**Experience Detail Pages — secondary/atmosphere images**
- Page: each `/experiences/*` page
- Purpose: break up the current text-only middle section; support
  image/text alternation for a less generic page structure.
- Recommended subject: hands/materials, finished artwork, or a
  mid-activity close-up specific to that experience.
- Recommended composition: close-up/detail shots, distinct from the
  wider hero image already used.
- Orientation: flexible (landscape strips or square insets work with the
  current 2-column layout).
- Real or AI: real preferred; a tightly-cropped abstract detail shot
  (e.g., paint texture) could acceptably be AI-generated *only* if it's
  clearly non-figurative and never implies a real moment.
- Priority: **MEDIUM**

**Private Bookings — hero/supporting image**
- Page: Private Bookings
- Purpose: sell the private-booking experience specifically (distinct
  from the public-event framing elsewhere).
- Recommended subject: a table set up with painting supplies and food —
  the "complete experience" framing already used in the copy.
- Composition: wide environmental/tablescape shot.
- Orientation: landscape.
- Real or AI: preferred real; generic decorative texture acceptable as a
  fallback only.
- Priority: **MEDIUM**

**Contact page — supporting texture**
- Page: Contact
- Purpose: visual interest only, no claim of reality.
- Recommended subject: abstract brushstroke/paint texture, no people.
- Real or AI: **AI-generated is appropriate here** — explicitly
  non-figurative, decorative only.
- Priority: **LOW**

**Social share image (`og:image`)**
- Not a new photoshoot — deliberately deferred until a hero or founder
  photo is approved, since reusing one of those is the natural source.
- Priority: **LOW** (sequenced after the assets above, not before)

### Creative Asset Map

Consolidated production plan for the next stage. No images are being
created yet — this is the plan.

| Asset | Page | Purpose | Orientation | Approx. Ratio | Real Photo / AI | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage hero | Home | Atmosphere + immediate credibility | Wide/cinematic | ~21:9 → 4:5 mobile crop | Real, required | CRITICAL | Placeholder only |
| After Dark hero/card | Home, Private Bookings, /experiences/after-dark | Differentiate the experience | Portrait | 4:5 | Real, required | CRITICAL | Placeholder only |
| Little Creators hero/card | Home, Private Bookings, /experiences/little-creators | Differentiate the experience | Portrait | 4:5 | Real, required | CRITICAL | Placeholder only |
| The Collective hero/card | Home, Private Bookings, /experiences/the-collective | Differentiate the experience | Portrait | 4:5 | Real, required | CRITICAL | Placeholder only |
| Founder portrait | Home (teaser), About (full) | Personal trust | Portrait (crops to 1:1 + 4:5) | 4:5 original | Real, required, no exceptions | HIGH | Monogram placeholder — no photo exists |
| Gallery grid (6+ images) | Home | Prove real events happened | Mixed | Mixed, 1000px+ short edge | Real, required, no exceptions | HIGH | 6 gradient placeholders |
| About "Our Story" image | About | Support brand-origin narrative | Portrait/square | — | Real preferred; may stay text-only | MEDIUM | Not built (text-only currently) |
| Experience detail secondary images | Each /experiences/* page | Image/text alternation | Flexible | — | Real preferred; abstract-only AI acceptable | MEDIUM | Not built (one hero image each currently) |
| Private Bookings hero/support | Private Bookings | Sell the booking experience | Landscape | — | Real preferred | MEDIUM | Not built (no image on this page currently) |
| Contact texture | Contact | Decorative only | Any | — | **AI appropriate** — abstract only | LOW | Not built |
| Social share image (og:image) | Sitewide | Link-preview credibility | Landscape | 1.91:1 (OG standard) | Sourced from hero/founder once approved | LOW | Not built (deliberately deferred) |

### Mobile creative observations (code-level only — not device-verified)

- **Hero headline likely wraps to 3+ lines on 375–430px screens.** The
  headline sits at a fixed `text-5xl` (≈48px) from the smallest screen up
  to the `sm` breakpoint (640px), with no intermediate step-down. At that
  size, "Immersive Gatherings." alone is wider than the ~340px of
  available width on a 375px screen before any wrapping — combined with
  the existing forced `<br/>` before "Elevated Culture.", the hero
  headline likely renders as 3–4 lines on the smallest common phone
  widths, which could feel visually heavy for what's meant to be a punchy
  opening moment. Recommend a mobile-specific size step (e.g., `text-4xl`
  base, stepping up through `sm:text-6xl`) — not changed in this pass, a
  design call best paired with the eventual hero image crop.
- **Experience cards mean a long stack on mobile.** `SignatureExperiences`
  and `ExperienceCard` grids collapse to a single column below `sm`, so
  three consecutive full-width 4:5 portrait cards stack vertically —
  meaningfully more scrolling for this one section on a phone than the
  side-by-side desktop presentation suggests. Not broken, but worth
  knowing before real (larger) photography goes in, since taller real
  images will extend this further.
- **A real mobile-vs-desktop button-width inconsistency exists** (see
  "tiny fix considered and reverted" note above): `Hero.astro`'s CTAs go
  full-width on mobile; every other page's CTAs (via `Button.astro`) stay
  content-width. Worth a deliberate decision in the next stage — likely
  "full-width only when two CTAs are paired in a stacked row," since
  standalone single CTAs looked worse forced to full width when tested.
- **Founder section stacks cleanly** — the `lg:grid-cols-[280px_1fr]`
  layout collapses to one column below `1024px` (i.e., on all phones),
  photo centered above text at a safe fixed 224px width. No issue found.
- **Forms, testimonials, navigation**: re-reviewed, no new issues beyond
  what Checkpoint 3 already found and fixed.

### Premium design scorecard (qualitative — not scored numerically)

| Dimension | Assessment |
| --- | --- |
| Brand impression | **Strong** — the dark ink/gold palette + serif display face is distinct, not generic, and used consistently |
| Visual hierarchy | **Needs refinement** — heading treatment is uniform across every section sitewide with no variation |
| Photography | **Creative asset required** — every image slot is a placeholder; this is the single biggest lever available |
| Typography | **Strong** — Fraunces/Inter pairing and the size scale are used consistently and read as intentional |
| Section rhythm | **Significant opportunity** — the centered-heading + 3-card-grid pattern repeats across nearly every page |
| Experience presentation | **Significant opportunity** — currently close to the generic Hero→text→FAQ→CTA template; see specific recommendations above |
| Founder/trust | **Needs refinement** — good verified content and placement instinct (About), but no photo and could surface earlier on Home |
| Conversion hierarchy | **Strong** — CTA styling is consistent and legible; one strategic question flagged (Browse Events as primary Hero CTA with zero live events) |
| Mobile experience | **Needs refinement** — no overflow bugs found, but hero text sizing and card-stack length are real code-level concerns pending device verification |
| Content depth | **Strong** — About in particular is genuinely content-rich; every page uses real, verified copy |
| Page differentiation | **Needs refinement** — Private Bookings stands out with real layout variety; most other pages could be told apart mainly by their text, not their visual treatment |
| Premium perception overall | **Significant opportunity, gated on photography** — the structural/content foundation supports a premium feel; it isn't visible yet because every trust-critical image is a placeholder |

### Technical recommendations (Claude Code should implement)

- Decide and implement a consistent mobile button-width rule (full-width
  only when CTAs are paired in a stacked row vs. always content-width for
  standalone CTAs) — the judgment call reverted in this pass, ready to
  implement once a rule is chosen.
- A hero headline mobile size step (e.g. `text-4xl` base →
  `sm:text-6xl`) to reduce likely 3+ line wrapping on narrow phones.
- Once real images exist: responsive `srcset`/sizing and the actual crop
  implementation per the aspect ratios specified in the Creative Asset
  Map — no code changes needed today, the slots are already built to
  receive them.
- Resurface each experience's primary audience (`whoItsFor[0]`) as a
  small tag on the homepage `ExperienceCard` — uses only data already in
  `src/data/experiences.ts`, no new content needed.

### Creative recommendations (art direction / photography / copy — not code)

- Vary section-opening treatment on at least one section per page (e.g.,
  a left-aligned or asymmetric moment) once real imagery provides
  something worth building a non-centered layout around.
- Give the three experience detail pages distinct visual identities from
  each other (subtle per-experience accent treatment) rather than
  identical layout differing only in text.
- Rework or remove the experience-page FAQ so it stops restating content
  already shown as bullets/pills earlier on the same page.
- Merge or visually distinguish Home's "Why Choose Us" and "Rooted in
  Community" sections so they don't read as near-duplicates.
- Reconsider Home's `FounderTeaser` placement (earlier, before the
  experience cards) once photography work begins.
- Elevate the About page's opening bio sentence with a pull-quote-style
  treatment (minor).

### Owner-required items (unchanged from prior checkpoints, plus new trust-opportunity flags)

Carried forward: contact email spelling, phone/address, real Facebook
URL, Instagram currency, founder photo approval, general photography
approval (`AUDIT.md` §7–8 / Owner requirements above). **New from this
pass:**

- **Trust opportunity — owner verification required**: whether any real
  founding-era photo exists for About's "Our Story" section.
- **Trust opportunity — owner verification required**: any real
  operational FAQ content (session length, cancellation policy, age
  specifics) that could make the experience-page FAQ genuinely useful
  rather than redundant with content already on the page.
- No new trust signals were invented anywhere in this audit — every gap
  identified above is logged as a real opportunity requiring either
  photography or owner input, never filled with placeholder claims.

### Recommended next stage

**Premium creative and visual production** — sourcing/approving real
photography per the Creative Asset Map (hero and the three experience
images first, per CRITICAL priority), the founder photo, then working
through the creative recommendations above once real imagery makes
layout variation meaningful. This is squarely an art-direction and
photography stage, not an architecture or technical stage — the
technical recommendations above are small and can be folded in
alongside the creative work rather than requiring their own checkpoint.

---

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

- Sitemap ✅, robots.txt ✅, canonical URLs ✅, structured data ✅ (all done
  Checkpoint 3) — **OG image** still outstanding, deferred until a
  hero/founder photo exists to source it from.
- Contrast ✅ (computed, documented above) and reduced-motion ✅ done
  Checkpoint 3. Still outstanding: a real screen-reader pass and
  device-based touch-target confirmation.
- Mailing-list signup on `/events` (real site has one) — deferred, needs
  an owner decision on which provider to use.
- Build-time failure on unresolved `[CONTENT REQUIRED...]` markers.
- DNS migration checklist (before any domain connection).
- True visual mobile QA with an actual browser/device (this session still
  has no screenshot/browser tool) — Checkpoint 3 did a thorough code-level
  responsive/overflow audit instead (see above) and fixed everything it
  could find that way, but a real-device pass would still be worth doing
  before owner sign-off.
- The real photography/founder-photo/social-URL/contact-info blockers
  from Owner requirements below — nothing code-side left to do until
  those answers arrive.

## Next recommended step

The technical foundation is now solid — see "Checkpoint 3 — classified
findings summary" above: no unresolved technical must-fix items remain
from this pass. The next stage should be the **premium creative asset and
visual refinement pass** (real photography, founder photo, the
section-variety and trust-signal creative improvements logged in Premium
Visual QA), not another architecture rebuild. That stage is gated on the
owner providing or approving photography and the founder photo; the
contact/social confirmations can arrive in parallel and get wired in
independently (each is a one-line data change, not a rebuild).

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

### Checkpoint 3 update — priority tiers, pixel guidance, and composition

Every current placeholder is a plain gradient with no real focal point, so
"focal point" and "mobile crop" below are forward guidance for the actual
photography shoot/selection, not something derivable from the current
placeholders. **Priority 1** items should be sourced/approved first — they
carry the most visual weight and appear highest in the visitor journey.

**Priority 1 — Home hero** (`public/images/hero-placeholder.svg` →
`src/components/Hero.astro`)
- Recommended type: real photography (or a short muted video loop per the
  code comment already in `Hero.astro`)
- Orientation/aspect: landscape, full-bleed — design for ~16:9 to 21:9 on
  desktop, must survive a hard crop to ~4:5 on mobile
- Approximate dimensions: 2400×1350px minimum (desktop retina), so the
  mobile 4:5 crop still has resolution to spare
- Composition/focal point: subject(s) placed center-to-upper-frame — the
  lower third gets covered by the headline/CTA gradient overlay on both
  breakpoints, so keep faces/action out of the bottom ~35% of the frame
- Mobile crop: center-weighted crop works safest given the overlay
  gradient already darkens the bottom edge
- Mood: warm, ambient, low-key lighting (matches the existing gold/wine
  palette) — energetic but not garish
- Real vs AI: **real required**, no exceptions — this is the single
  highest-trust image on the site
- Priority: **1 (highest)**

**Priority 1 — Experience cards & detail-page heroes** (3 images,
`public/images/experiences/*.svg` → `src/data/experiences.ts`)
- Recommended type: real photography, one per experience (After Dark,
  Little Creators, The Collective) — must be visually distinguishable
  from each other at a glance
- Orientation/aspect: portrait 4:5 (card use) — the same image is reused
  at the top of each detail page, so avoid a composition that only works
  cropped square
- Approximate dimensions: 1200×1500px minimum
- Composition/focal point: subject in the upper two-thirds; cards overlay
  no text on the image itself (name/tagline sit below in a text block), so
  focal point can be more centered than the hero
- Mobile crop: cards go full-width single-column below `sm`, so the full
  4:5 frame is visible on mobile — no separate mobile crop needed
- Mood: After Dark — moody/low-light/energetic; Little Creators —
  bright/warm/family-friendly; The Collective — collaborative/social,
  mid-tone lighting. Three distinct moods matching each experience's own
  verified tagline
- Real vs AI: **real required** — these represent three distinct real
  paid offerings
- Priority: **1**

**Priority 2 — Founder photo** (`src/data/founder.ts`, used on Home
teaser + full About section)
- Recommended type: real photography of Natassha Johnson only — **never**
  AI-generated or stock
- Orientation/aspect: works as both 1:1 (Home teaser, circular crop) and
  4:5 (About, rounded-square crop) — a well-composed 4:5 original can be
  center-cropped to 1:1 without reshooting
- Approximate dimensions: 1200×1500px minimum
- Composition/focal point: face/shoulders in upper-to-center frame so both
  the square and portrait crops keep the face fully visible
- Mood: warm, approachable, confident — matches the verified quote's tone
- Real vs AI: **real required, no exceptions**
- Priority: **2** — second only to the hero for trust impact, per this
  checkpoint's explicit founder-visibility instruction

**Priority 2 — Gallery/portfolio grid** (6 slots today,
`src/data/gallery.ts`)
- Recommended type: real photography only — this section's entire purpose
  is proving real past events happened
- Orientation/aspect: mixed portrait/landscape (masonry layout already
  handles mixed ratios natively — no need to force one aspect ratio)
- Approximate dimensions: 1000px on the short edge minimum
- Composition: variety is the point — wide room shots, close-up canvas
  work, candid guest moments, spread across the 4 verified categories
  (Signature/Social/Family/Private)
- Mood: candid, real, unpolished-but-professional (matches Ecoverde's
  "real work photos, not stock" benchmark pattern)
- Real vs AI: **real required, no exceptions**
- Priority: **2**

**Priority 3 — supporting/secondary slots** (About "Rooted in Community,"
Private Bookings hero support, Contact background texture): unchanged
from the original plan above — real preferred where people/events are
depicted, generic AI-generated texture acceptable only for abstract,
non-figurative backgrounds. Lower priority since they're supporting
rather than primary trust moments.

**Not planned as a new slot:** `og:image` (social-share preview) —
deliberately deferred until a hero or founder photo is approved, since
reusing one of those is the natural source rather than commissioning a
separate asset.

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
