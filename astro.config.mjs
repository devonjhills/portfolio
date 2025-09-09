// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  site: 'https://devonhills.dev',
  compressHTML: true,
  output: 'static',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
