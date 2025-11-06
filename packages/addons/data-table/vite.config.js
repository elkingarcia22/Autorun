import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSDataTable',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'data-table.es.js';
        }
        return 'data-table.umd.js';
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

