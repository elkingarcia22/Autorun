import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'UBITSSubNav',
			fileName: () => 'index.js',
			formats: ['iife'],
		},
		rollupOptions: {
			external: ['@ubits/tokens', '@ubits/typography', '@ubits/icons'],
		},
	},
});
