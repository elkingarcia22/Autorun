import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSCard',
      fileName: 'card',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@ubits/icons', '@ubits/tokens', '@ubits/typography'],
      output: {
        globals: {
          '@ubits/icons': 'UBITSIcons',
          '@ubits/tokens': 'UBITSTokens',
          '@ubits/typography': 'UBITSTypography'
        }
      }
    },
    copyPublicDir: false
  }
});

