import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viteConfiguration = {
	resolve: {
		alias: {
			// $lib already exists in sveltekit
			$constants: path.resolve(__dirname, 'src/constants'),
			$packages: path.resolve(__dirname, 'src/lib/packages'),
		},
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		vite: viteConfiguration,
	}
};

export default config;
