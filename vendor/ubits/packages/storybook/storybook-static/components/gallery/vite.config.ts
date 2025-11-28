import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSGallery',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'gallery.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    copyPublicDir: false
  },
  css: {
    devSourcemap: true
  }
});

