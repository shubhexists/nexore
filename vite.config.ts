import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    viteStaticCopy({
      targets: [{ src: 'dist/src/html/index.html', dest: '' }],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/html/index.html'),
      },
    },
    outDir: 'dist',
  },
});
