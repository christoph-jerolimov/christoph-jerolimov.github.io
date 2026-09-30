import { defineConfig } from 'astro/config';

import { author } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: author.site,
  base: '/',
  output: 'static',
  trailingSlash: 'always',
});
