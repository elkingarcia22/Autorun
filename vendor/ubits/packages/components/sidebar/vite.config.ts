import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'UBITSSidebar',
			fileName: () => 'index.js',
			formats: ['iife'],
		},
		rollupOptions: {
			external: ['@ubits/tokens', '@ubits/icons'],
			output: {
				globals: {
					'@ubits/tokens': 'UBITSTokens',
					'@ubits/icons': 'UBITSIcons',
				},
			},
		},
		copyPublicDir: false,
	},
});
