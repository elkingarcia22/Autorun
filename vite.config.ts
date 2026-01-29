import { defineConfig } from 'vite';

export default defineConfig({
    root: './prototypes',
    server: {
        port: 3000,
        strictPort: true,
        open: false,
        hmr: {
            overlay: true
        },
        watch: {
            usePolling: true
        }
    }
});
