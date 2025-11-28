import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UBITSHeaderSection',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'header-section.es.js';
        }
        return 'header-section.umd.js';
      }
    },
    rollupOptions: {
      external: ['@ubits/icons', '@ubits/tokens', '@ubits/button', '@ubits/tooltip'],
      output: {
        globals: {
          '@ubits/icons': 'UBITSIcons',
          '@ubits/tokens': 'UBITSTokens',
          '@ubits/button': 'UBITSButton',
          '@ubits/tooltip': 'UBITSTooltip'
        }
      }
    },
    copyPublicDir: false
  }
});

