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
| Curated portfolio | `src/components/Gallery.astro` | Filterable masonry gallery (All / Sip & Paint / Private Socials / Galas) |
| Upcoming events | `src/components/Events.astro` | List pulled from `src/data/events.ts` |
| Contact & booking | `src/components/Contact.astro` | Split-screen form, posts to `/api/contact` |

Nav and footer live in `Header.astro` / `Footer.astro`. Shared tokens (colors, fonts) are
defined once in `src/styles/global.css` via a Tailwind v4 `@theme` block — change the palette
there and it propagates everywhere.

## Content still to swap in (placeholders marked `TODO` in code)

1. **Hero background** — `src/components/Hero.astro`. Replace the placeholder SVG with a
   cinematic video loop (`/public/video/hero.mp4`) or real photography.
2. **Gallery photos** — `src/data/gallery.ts` + `/public/images/gallery/`. Six SVG
   placeholders stand in for real event photography; categories already match the requested
   filter set.
3. **Award/press wording** — `src/components/CredibilityStrip.astro`. Confirm the exact
   nomination language and add real press/partner logos.
4. **Upcoming events** — `src/data/events.ts`. Replace with real dates, descriptions, and
   ticket/Eventbrite links.
5. **Contact details** — `src/components/Contact.astro`. Replace the placeholder email,
   phone number, and social links with the real ones. **Do this before launch.**
6. **Email delivery** — `wrangler.toml` `[vars]` (`TO_EMAIL` / `FROM_EMAIL`) and the
   `RESEND_API_KEY` secret — see "Wiring the contact form" below. The form already works
   end-to-end (validates, returns success); it just silently skips actually sending the
   email until the key is set.

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

1. Create a free [Resend](https://resend.com) account and verify the sending domain
   (`creativedynastyevents.com`) under Domains, adding the DNS records it gives you.
2. Create an API key in the Resend dashboard.
3. Add it as a Pages secret (this prompts for the value; it never touches the repo):
   ```sh
   npx wrangler pages secret put RESEND_API_KEY --project-name creative-dynasty-events
   ```
4. Confirm `TO_EMAIL` / `FROM_EMAIL` in `wrangler.toml` `[vars]` are the real addresses,
   then redeploy (`git push`, or `npm run pages:deploy`) so the new vars take effect.

Test it any time with `npm run build && npm run pages:dev`, then submit the form at
`http://127.0.0.1:8788` — the response includes `"delivered": true` once the key is live.
