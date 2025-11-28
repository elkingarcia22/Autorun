import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSToast',
      fileName: 'toast',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@ubits/icons', '@ubits/tokens', '@ubits/button'],
      output: {
        globals: {
          '@ubits/icons': 'UBITSIcons',
          '@ubits/tokens': 'UBITSTokens',
          '@ubits/button': 'UBITSButton'
        }
      }
    },
    copyPublicDir: false
  }
});

