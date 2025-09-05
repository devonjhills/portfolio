// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://devonhills.dev',
  compressHTML: true,
  output: 'hybrid',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
