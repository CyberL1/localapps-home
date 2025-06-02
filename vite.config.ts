import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 8081,
		strictPort: true,
		allowedHosts: true // Allows the dev server to be proxiexd
	},
});
