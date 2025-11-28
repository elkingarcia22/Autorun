import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UbitsCheckbox',
      fileName: (format) => `checkbox.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});

