import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/sass/app.scss', 'resources/ts/index.tsx'],　//sassに変更
            refresh: true,
        }),
        react()
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        }
    },
    server: {
        host: true,
        hmr: {
            host: '0.0.0.0',
        },
        watch: {
            usePolling: true,
        },
    },
    assetsInclude: ['**/*.dat', '**/*.patt'],
});
