import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'UbitsChip',
      fileName: (format) => `chip.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
