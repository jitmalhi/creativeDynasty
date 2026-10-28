// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `site` drives every canonical URL, OG URL, and sitemap entry Astro
// generates. Updated 2026-10-28: the owner approved connecting the real
// domain, and the Cloudflare zone's nameservers have already been switched
// over (confirmed via DNS lookup — no MX/TXT records exist on this domain,
// so there was no email to migrate). www is canonical, matching the
// original Wix site's own canonical tag.
//
// https://astro.build/config
export default defineConfig({
  site: 'https://www.creativedynastyevents.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
