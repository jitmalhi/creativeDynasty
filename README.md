# Creative Dynasty Events — Website

Single-page, editorial-style site for Creative Dynasty Events, built with
[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), deployed as a
static site to **Cloudflare Pages** with a Pages Function powering the contact form.

## Structure

The homepage (`src/pages/index.astro`) is assembled from one component per section:

| Section | Component | Notes |
| --- | --- | --- |
| Immersive hero | `src/components/Hero.astro` | Headline + dual CTA over a full-bleed background |
| Credibility strip | `src/components/CredibilityStrip.astro` | Award nomination + partner logos |
| The Experience | `src/components/Experience.astro` | Bento grid: sensory package, art & community, private bookings |
| Curated portfolio | `src/components/Gallery.astro` | Filterable masonry gallery (All / Signature / Social / Family / Private — matches the live site's real Events filters, see `AUDIT.md`) |
| Upcoming events | `src/components/Events.astro` | List pulled from `src/data/events.ts` |
| Contact & booking | `src/components/Contact.astro` | Split-screen form, posts to `/api/contact` |

Nav and footer live in `Header.astro` / `Footer.astro`. Shared tokens (colors, fonts) are
defined once in `src/styles/global.css` via a Tailwind v4 `@theme` block — change the palette
there and it propagates everywhere.

## Content status

This project follows a strict audit-first, zero-fabrication process — see
`AUDIT.md` (source-verified findings from the live Wix site) and
`HANDOFF.md` (project status, owner requirements, Creative Asset Plan).
Read those before changing any content here. In short:

1. **Hero background / gallery photos** — currently neutral SVG placeholders
   (`src/components/Hero.astro`, `src/data/gallery.ts` +
   `/public/images/gallery/`). 9 real Creative Dynasty Events photos were
   found on the live site but are **not yet approved for reuse** — see
   `HANDOFF.md` Owner requirements #10 and the Creative Asset Plan. Do not
   substitute AI-generated event photography for these slots.
2. **Award nomination** — `src/components/CredibilityStrip.astro` uses the
   verified real wording. The partner/press logo row was removed (was
   unsupported/fabricated) and should only be restored with real, verified
   logos.
3. **Upcoming events** — `src/data/events.ts` is intentionally empty; the
   live site currently shows zero scheduled events (verified,
   `AUDIT.md` §2.10). The component (`src/components/Events.astro`) already
   supports Coming Soon / Registration Open / Registration Closed / Event
   Complete states — add a real entry only once every field is confirmed.
4. **Contact details** — `src/components/Contact.astro` uses the real,
   verified email found on the live site (`creativedynastevents3@gmail.com`
   — spelling pending owner confirmation). No phone number or address is
   shown (none exist on the live site). Facebook and TikTok were removed
   (unsupported); Instagram is shown marked "pending confirmation." See
   `HANDOFF.md` Owner requirements #1–#2.
5. **Email delivery** — `wrangler.toml` `[vars]` (`TO_EMAIL` / `FROM_EMAIL`)
   and the `RESEND_API_KEY` secret — see "Wiring the contact form" below.
   The form already works end-to-end (validates, returns success); it just
   silently skips actually sending the email until the key is set.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview the production build locally (static only, no `/api/*`) |
| `npm run pages:dev` | Build-aware local Cloudflare emulation, `/api/contact` included — run `npm run build` first |
| `npm run pages:deploy` | Build and push a manual deploy straight to Cloudflare Pages |

## Deploying to Cloudflare Pages

**Option A — Git integration (recommended):**

1. Push this project to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Functions directory: `functions` (auto-detected)
4. Every push to the connected branch redeploys automatically.

**Option B — Direct upload with Wrangler:**

```sh
npm install -g wrangler
npm run build
wrangler pages deploy dist
```

Wrangler will detect the `functions/` directory automatically and deploy `/api/contact`
alongside the static site.

### Wiring the contact form (Resend)

`functions/api/contact.js` already calls the Resend API — it just needs credentials:

1. Create a free [Resend](https://resend.com) account. **Do not verify
   `creativedynastyevents.com` as a sending domain yet** — that requires
   adding DNS records to the production domain, which is off-limits until
   the owner explicitly approves domain migration (see `HANDOFF.md`
   governing rules). Send from Resend's own `onboarding@resend.dev`
   address in the meantime — already the default in `wrangler.toml`.
2. Create an API key in the Resend dashboard.
3. Add it as a Pages secret (this prompts for the value; it never touches the repo):
   ```sh
   npx wrangler pages secret put RESEND_API_KEY --project-name creative-dynasty-events
   ```
4. `TO_EMAIL` in `wrangler.toml` `[vars]` already holds the real, verified
   address found on the live site (spelling pending owner confirmation —
   see `HANDOFF.md`). Once that's confirmed, or a verified sending domain
   is approved, update `[vars]` and redeploy (`git push`, or
   `npm run pages:deploy`).

Test it any time with `npm run build && npm run pages:dev`, then submit the form at
`http://127.0.0.1:8788` — the response includes `"delivered": true` once the key is live.
