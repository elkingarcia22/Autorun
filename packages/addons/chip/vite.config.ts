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
    // Configurar esbuild para evitar problemas con tsconfig.node.json y rutas con espacios
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true,
        strict: false,
      },
    },
    // Evitar que esbuild busque tsconfig.node.json
    tsconfig: false,
  },
});
