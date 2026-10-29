# Sathya Photography — website

Website for **Sathya Photography**, a Telugu wedding photography & films studio in
Hyderabad and Visakhapatnam (est. 2002). Built by Shutter Select on the same
foundation as the Stories Beyond Frames site, re-skinned with its own identity:
warm ivory, the logo's camera green, Cormorant Garamond + Figtree.

The homepage is image-first. In order: the hero, a places + "tradition" collage, the
portfolio grid, a "Since 2002" trust band, films, kind words, a closing CTA and nav
cards. A sticky WhatsApp "Check your date" button appears on every page.

---

## Tech stack

- **[Astro](https://astro.build)** (static output). Build-time image optimisation turns
  the source JPGs into responsive **AVIF/WebP**.
- **Hand-written CSS** with design tokens (`src/styles/`).
- **Lenis** smooth scroll, scroll reveals and View Transitions.
- Self-hosted fonts via `@fontsource-variable`.
- Local-business **JSON-LD**, sitemap and Open Graph tags for SEO.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site → ./dist
npm run preview
```

Deploy `dist/` to Vercel / Netlify / any static host.

## Editing content

| What | Where |
|---|---|
| Studio details, phone, WhatsApp, address, socials, stats, films, testimonials | `src/data/site.ts` |
| Which photo appears where (+ alt text) | `src/data/photos.ts` |
| Homepage sections | `src/components/home/*.astro` |
| The Studio / Experience (services, timelines, FAQ) / Contact | `src/pages/*.astro` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Link previews (WhatsApp, Instagram, Facebook) | `public/og/*.jpg` + `ogImage` on each page |

### Link previews
Each page has its own 1200×630 share card in `public/og/`: an ivory centre with the logo,
framed by two photos. WhatsApp crops small previews to the centred square, so keep the logo
and text in the middle third. Keep each file under ~300 KB, or WhatsApp skips the image.
WhatsApp caches a preview per URL. After changing a card, add `?v=2` to the link you share
to see the new one.

The live address is `https://sathya-photogrpahy.shutterselect.com`, set in `astro.config.mjs`
and `site.url` in `site.ts`. Update both if the domain changes.

### Photos
`src/assets/photos/` holds 2400px working copies of the client's Drive folder
("FOR WEBSITE"), renamed descriptively (e.g. `temple-doorway-sunset.jpg`). Raw downloads
and brand files live in `_source/` (git-ignored). Reference new photos by file name in
`photos.ts`.

### Contact form
Works in **demo mode** until a [Web3Forms](https://web3forms.com) key is pasted into
`web3formsKey` in `site.ts`.

## Placeholders to swap before going live

Search the code for `TODO(client)`. Open items:

- **Founder**: full name and role (`site.ts`). The Studio page bio is adapted from Sathya's
  own "SP BIO" document in the Drive.
- **Stats**: number of weddings photographed (`site.stats.weddings`; hidden while `null`).
- **Testimonials**: only one real quote so far (Lokesh & Sravani). Add 2–3 more with permission.
  Never invent these.
- **Visakhapatnam**: address, if there is a walk-in location.
- **Hours**: Google lists "closes 9 pm"; the opening time isn't known.
- **Experience page**: delivery timelines and FAQ answers need the client's confirmation.
- **Photos**: most frames carry a small watermark. Clean exports would look better.
  The Drive also holds ~260 more unused photos (including baby, family and maternity work)
  and three wedding film MP4s, in case a gallery or films page is added later.
- **Logo**: a vector (SVG) version. The current files are cut from a PNG.
- Web3Forms key.

---

*Crafted by Shutter Select.*
