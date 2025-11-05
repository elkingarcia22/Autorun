import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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
  esbuild: {
    // Configurar esbuild para manejar mejor las rutas con espacios
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
});
