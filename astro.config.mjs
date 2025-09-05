// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://devonhills.dev',
  compressHTML: true,
  output: 'static',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
