import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {

    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    paths: {
      base: dev ? '' : '/BTA-AtomsEditor',
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path.includes('.svg') || path.includes('.png') || path.includes('.jpg')) {
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;
