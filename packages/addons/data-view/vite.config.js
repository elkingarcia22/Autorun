import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false, // No limpiar el directorio para preservar los .d.ts de TypeScript
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSDataView',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        return 'data-view.umd.js';
      }
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});

