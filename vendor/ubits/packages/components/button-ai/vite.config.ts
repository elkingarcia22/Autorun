import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSButtonAI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@ubits/tokens', '@ubits/icons'],
      output: {
        globals: {
          '@ubits/tokens': 'UBITSTokens',
          '@ubits/icons': 'UBITSIcons'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});

