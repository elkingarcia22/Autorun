import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSDataTable3',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'data-table-3.es.js';
        }
        return 'data-table-3.umd.js';
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

