import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'UBITSBadge',
      fileName: (format) => {
        if (format === 'umd') {
          return 'badge.umd.js';
        }
        return 'index';
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: 'badge.css',
        globals: {}
      }
    }
  }
});

