# Creative Dynasty Events — Site Audit (Checkpoint 1)

Audited: 2026-09-28
Method: Direct HTTP fetch of live pages (raw HTML, not AI-summarized) plus
`robots.txt`. Wix serves full content in the initial HTML response, so this
reflects what a browser/crawler actually receives — not a JS-rendering
screenshot. **No visual/mobile screenshot tool was available in this
session**, so layout/visual mobile QA (crops, touch targets, overflow) is
not covered here and should be done with a real browser or device before
Checkpoint 7 sign-off.

All content below is copied verbatim from the live site unless marked
`[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`.

---

## 1. Current site structure

Nine live, indexable pages found (all on `www.creativedynastyevents.com`):

| URL | Purpose |
| --- | --- |
| `/` | Home |
| `/about` | About / founder / mission |
| `/contact` | Contact form + inquiry info |
| `/events` | Public events listing |
| `/private-bookings` | Private booking overview + request form |
| `/private-booking-page` | A second, bare private-booking form (fields overlap `/private-bookings`) |
| `/after-dark-sip-paint-dine-experience` | Experience detail: After Dark |
| `/little-creators-paint-play-experience` | Experience detail: Little Creators |
| `/the-collective-experience` | Experience detail: The Collective |

Nav bar (identical on every page): **HOME · EVENTS · PRIVATE BOOKINGS ·
ABOUT · CONTACT · Log In**. "Log In" is Wix's built-in members-area login,
not a content page — no evidence the business uses a members area for
anything customer-facing.

No `/privacy` or `/terms` page found. No blog. No sitemap (see below).

---

## 2. Major problems (verified, not assumed)

1. **Every page title is the Wix default**, never edited:
   `HOME | My Site 2`, `ABOUT | My Site 2`, `CONTACT | My Site 2`,
   `EVENTS | My Site 2`, `PRIVATE BOOKINGS | My Site 2`, and similar on
   every detail page. This is what shows in Google search results and
   browser tabs today.
2. **Zero meta descriptions anywhere.** No `<meta name="description">` on
   any of the 9 pages.
3. **No `og:image`.** Social shares (iMessage, Facebook, Slack previews)
   will render with no image.
4. **`robots.txt` points to a sitemap that 404s.** `Sitemap:
   https://www.creativedynastyevents.com/sitemap.xml` — fetching that URL
   returns Wix's own "404 Error: Page Not Found" page. Google Search
   Console is not receiving a working sitemap.
5. **The Facebook icon on the Contact page links to `facebook.com/wix`** —
   Wix's own corporate Facebook page, not Creative Dynasty Events'. This is
   the exact "social icon pointing to a platform-owned account" risk this
   project flagged in advance. It needs the real page URL or removal.
6. **Social icons only appear on the Contact page**, not in a sitewide
   header/footer — so from Home, About, Events, or Private Bookings there
   is no path to social profiles at all.
7. **The general Contact form has no email field.** Its only fields are
   First name, Last name, an "Inquiry type" dropdown, and a message box —
   no way to capture a reply-to address. (The separate Private Bookings
   form *does* correctly include an Email field.) As built today, a
   visitor using the main Contact form gives no way to be reached back.
8. **Every image's alt text is the raw uploaded filename** — e.g. `alt="IMG-20260214-WA0019.jpeg"`,
   `alt="Screenshot_20260215_120640_WhatsApp.jpg"`, `alt="ChatGPT Image
   Apr 11, 2026, 09_42_18 AM.png"`. None of the 9 unique images on the site
   have descriptive alt text. This is a real accessibility failure, not a
   style nitpick — screen reader users get filenames, not descriptions.
9. **One existing asset is confirmed AI-generated**: an image literally
   filenamed `ChatGPT Image Apr 11, 2026, 09_42_18 AM.png`, used as
   supporting art on Home and About. Per this project's imagery rule, this
   should not be presented in a way that implies a real event or customer.
10. **The Events page currently shows zero events** — the literal text on
    the page is *"No events at the moment"* (inside a banner that also
    says "Limited spots available. Early Bookings Recommended.", which
    directly contradicts the empty state directly above it). There is no
    fabricated event content to preserve — there is genuinely nothing to
    list right now.
11. **No JSON-LD structured data** (no LocalBusiness schema, no Event
    schema) anywhere on the site.
12. **No physical address or phone number found anywhere** on any of the 9
    pages — only one email address, `creativedynastevents3@gmail.com`
    (note: no "y" in "dynast**e**vents" — copied exactly as it appears in
    the page's own "Email:" label and its `mailto:` link; this may be
    intentional or may be a typo the business should confirm).
13. **Two overlapping private-booking forms** exist (`/private-bookings`
    and `/private-booking-page`) with slightly different field sets and no
    apparent link between them from primary navigation — likely leftover
    from a previous edit, worth consolidating.

## 3. What's working / not a problem

- HTTP → HTTPS redirect works correctly.
- Non-www → www redirect works correctly.
- Mobile viewport meta tag is present and correctly configured.
- `robots.txt` itself is reasonably sane (allows crawling, blocks lightbox
  query params and a known bad bot) — only the sitemap reference is broken.
- The Instagram link (`instagram.com/creative_dynasty_events`, found only
  on the Contact page) looks like a real, business-specific handle, not a
  placeholder — but I have no way to independently confirm it's actively
  controlled by the business without a browser tool. **Recommend the owner
  confirm this is correct and current before we publish it.**

## 4. Important existing content (verified, reusable)

### Business identity
- Name: **Creative Dynasty Events** (or **Creative Dynasty**, used
  interchangeably on the About page)
- Tagline (Home hero): **"Where Creativity Meets Community"**
- Hero subhead: "Curated paint experiences designed to bring people
  together, spark creativity, and support local businesses."

### Founder (About page — publicly identified, safe to use)
- **Natassha Johnson, Founder of Creative Dynasty**
- Quote: *"Curating experiences that bring people together through
  creativity and shared moments."*
- Bio text (verbatim, About page): "Creative Dynasty was built from a
  passion for bringing people together through creativity and shared
  experiences. What began as a love for art has grown into a platform that
  creates meaningful, engaging events designed to connect people in a way
  that feels natural and memorable."

### Award (verified — this is real, not invented)
- *"Creative Dynasty was nominated for the 2026 Visual Arts Award from The
  Lotus Hope Foundation."* — appears verbatim on the About page.

### Mission
- "To create experiences that connect people, inspire creativity, and
  build stronger communities through shared moments and meaningful
  interaction."

### Values ("What We Stand For")
- **Community** — Supporting and collaborating with local businesses and people.
- **Creativity** — Encouraging self-expression in a fun and accessible way.
- **Connection** — Creating environments where people feel welcome and engaged.
- **Experience** — Delivering more than expected through thoughtful details.

### The three experiences (each has its own detail page)

**❤️‍🔥 After Dark Experience** — *"Bold. Expressive. Unforgettable."*
`/after-dark-sip-paint-dine-experience`
- Overview: "This is not your typical paint night. After Dark is an
  elevated experience where creativity meets atmosphere. With music,
  energy, and a curated meal included, it's designed for those looking to
  unwind, connect, and enjoy something different."
- What to expect: Guided paint experience · Music + high-energy atmosphere
  · Curated meal included · Social, engaging environment · A night
  designed for connection and fun
- Who it's for: Adults 21+ · Date nights · Girls' night / group outings ·
  Anyone looking for a unique night out
- Included: All painting materials · Step-by-step guidance · Meal included
  · Full experience setup

**🎨 Little Creators Experience** — *"Creative moments for families to
connect and grow."* `/little-creators-paint-play-experience`
- Overview: "Designed with families in mind, Little Creators creates space
  for children and parents to explore creativity together. This experience
  is fun, interactive, and welcoming for all skill levels."
- Who it's for: Parents & children · Families · Community groups · Youth programs

**✨ The Collective Experience** — *"Where creativity meets connection and
collaboration."* `/the-collective-experience`
- Overview: "The Collective Experience is designed to bring people
  together, whether for networking, team building, or community
  engagement. It blends creativity with conversation to create meaningful
  interaction in a relaxed environment."
- Who it's for: Entrepreneurs & creatives · Corporate teams · Community
  groups · Organizations

### Private bookings — "Perfect For" / "What's Included"
- Perfect for: 🎉 Birthdays & Celebrations · 💼 Corporate Teams · 🤝
  Community Groups · 👨‍👩‍👧 Families & Youth
- Included: Guided paint experience (no experience needed) · All materials
  provided · Curated meal included · Custom theme options · Setup and
  facilitation · Engaging and welcoming atmosphere. Note: "Menu options can
  be customized based on your event needs."
- How it works: 1. Submit Your Request → 2. Customize Your Experience → 3.
  Show Up & Enjoy

### Events page category filters (real — use these, not invented ones)
**ALL · SIGNATURE · SOCIAL · FAMILY · PRIVATE**

### Testimonials (verbatim, attributed — Home page)
> "My sons did not want to leave! They had so much fun! We will be back to
> more of these events for sure" — **Erica**

> "We had so much fun! My daughter loved the cotton candy and the popcorn!
> We have never been to an event like this before. Let me know when you
> have another one, we will be back." — **Leah**

> "This was so much fun and the food was amazing!" — **Christine**

### Additional testimonials (Events page — unattributed)
> "Such an amazing vibe and experience. I'll definitely be back."

> "I came alone and left with connections. This was everything."

> "Creative Dynasty events are always a good time. Highly recommend."

### Community statement
"We proudly collaborate with local businesses by integrating their
products into our events, supporting their visibility, and creating
opportunities for meaningful exposure through partnerships and giveaways."

### Contact
- Email: `creativedynastevents3@gmail.com` (verified `mailto:` link, Contact page)
- Phone: **not published anywhere** — `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`
- Address: **not published anywhere** — `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]`
- Instagram: `instagram.com/creative_dynasty_events` (found on Contact page only — owner should confirm)
- Facebook: **broken** (`facebook.com/wix`) — `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` for the real URL, or omit
- TikTok/other: none found — `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` if one exists

### Real photography available for reuse
9 unique media assets found across the site (Wix CDN, business's own
uploads — not stock). 4 are real event photos (filenames indicate phone /
WhatsApp shares), 1 is the submark logo, 1 is a large decorative image
that is **confirmed AI-generated** (`ChatGPT Image...`), the rest are
duplicates/logo repeats. None currently have descriptive alt text. Owner
should confirm which are approved for the new site, and whether higher-
resolution originals exist beyond what's on the current site.

---

## 5. Recommended information architecture

The current 9-page structure is sound and should mostly be preserved, with
two adjustments:

- **Merge `/private-booking-page` into `/private-bookings`.** They serve
  the same purpose with overlapping form fields; keeping one avoids
  duplicate/conflicting content and confusion about which link is current.
- **Keep the three experience detail pages** as their own routes — they
  have real, distinct content and are worth preserving as clean URLs
  (redirect map required, see below).

Proposed routes for the rebuild:
```
/                                          Home
/events                                    Events (Signature/Social/Family/Private filters)
/experiences/after-dark                    (or keep existing slug — see redirects)
/experiences/little-creators
/experiences/the-collective
/private-bookings                          Private booking info + single form
/about                                     About / founder / mission
/contact                                   Contact
```

## 6. Redirect map (old → new, only for slugs we actually change)

| Old URL | New URL | Notes |
| --- | --- | --- |
| `/private-booking-page` | `/private-bookings` | Consolidating duplicate forms |

All other current slugs (`/about`, `/contact`, `/events`, `/private-bookings`,
and the three experience detail slugs) are fine to keep as-is with no
redirect needed. **This table will be finalized and redirects will be
tested before any domain migration** — no redirects are invented beyond
what's listed here.

## 7. Missing information (owner must provide)

- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Phone number (or confirm there isn't one to publish)
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Physical address, if any (or confirm mobile/venue-based, no fixed address)
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Correct Facebook URL, or confirmation to omit Facebook entirely
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Confirmation that `instagram.com/creative_dynasty_events` is correct and active
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — TikTok or other social profiles, if any
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Confirmation `creativedynastevents3@gmail.com` is the correct ongoing inbox (unusual spelling — worth double-checking it isn't a typo)
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Any currently-scheduled events and their real dates/times/locations/prices (site shows none right now)
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Approval on which of the 9 existing images may be reused, and whether higher-resolution originals exist
- `[CONTENT REQUIRED FROM CREATIVE DYNASTY EVENTS]` — Whether the AI-generated decorative image should be kept, replaced with real photography, or dropped

## 8. Owner questions

1. Is `creativedynastevents3@gmail.com` the correct long-term inbox for
   both general inquiries and private-booking requests, or should these
   route differently?
2. Should a phone number be published at all, or is email/form the
   intended contact method?
3. What's the real Facebook page URL — or should Facebook be dropped from
   the new site until one exists?
4. Is the Instagram handle found on the Contact page still current?
5. Are there truly no upcoming public events right now, or is the Wix site
   simply out of date? If the former, the new Events page will honestly
   show "Details Coming Soon" rather than any events.
6. Which of the 4 real event photos (and any others not currently on the
   live site) are approved for use on the new site?
7. Do you want `/private-booking-page` retired in favor of a single
   `/private-bookings` form, as recommended above?
8. Who will own the GitHub repository and Cloudflare account long-term —
   Creative Dynasty Events directly, or an agreed developer/agency? (Needed
   before any production handoff — see `HANDOFF.md`.)

---

**Status: Audit complete. No implementation has begun based on this
audit.** See `HANDOFF.md` for overall project status, including an
existing partial build from before this audit-first process was adopted
that has NOT yet been reconciled against the findings above.
