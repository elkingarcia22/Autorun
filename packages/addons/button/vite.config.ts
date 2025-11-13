import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSButton',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'button.es.js';
        }
        return 'button.umd.js';
      }
    },
    rollupOptions: {
      external: ['@ubits/icons', '@ubits/tokens'],
      output: {
        globals: {
          '@ubits/icons': 'UBITSIcons',
          '@ubits/tokens': 'UBITSTokens'
        }
      }
    },
    copyPublicDir: false
  }
});

