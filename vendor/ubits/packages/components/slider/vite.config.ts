import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false, // No limpiar el directorio para preservar los .d.ts de TypeScript
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UbitsSlider',
      fileName: (format) => {
        if (format === 'umd') {
          return 'slider.umd.js';
        }
        return 'index.js';
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'slider.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    copyPublicDir: false
  }
});

