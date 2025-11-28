import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UbitsSearchButton',
      fileName: (format) => `search-button.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});

