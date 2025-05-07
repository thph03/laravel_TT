import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build', // phải build ra đúng chỗ Laravel đọc
        manifest: true, // để Laravel tìm được file manifest.json
        emptyOutDir: true,        
    }
});
