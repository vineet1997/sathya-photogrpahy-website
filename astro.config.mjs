// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sathya-photogrpahy.shutterselect.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Generate modern formats; large source JPGs are downscaled at build time.
    responsiveStyles: true,
  },
  devToolbar: { enabled: false },
});
