import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSSelectionCard',
      fileName: 'selection-card',
      formats: ['es']
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
  },
  css: {
    extract: {
      fileName: (chunkInfo) => {
        return 'selection-card.css';
      }
    }
  }
});

