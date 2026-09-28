// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `site` drives every canonical URL, OG URL, and sitemap entry Astro
// generates. It MUST match wherever this build is actually deployed —
// currently the temporary Cloudflare Pages preview, NOT
// creativedynastyevents.com. That domain is still live with the existing
// Wix site; pointing canonical URLs at it here would falsely claim this
// unfinished, unapproved build as the canonical version of a page that
// isn't even this content. Update this the moment (and not before) the
// production domain is actually connected — see HANDOFF.md governing
// rules ("do not connect the production domain").
//
// https://astro.build/config
export default defineConfig({
  site: 'https://creativedynasty.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
