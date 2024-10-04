import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { visualizer } from 'rollup-plugin-visualizer';

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
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framerMotion: ['framer-motion'],
          radixUI: ['@radix-ui/react-icons', '@radix-ui/react-slot'],
          lucide: ['lucide-react'],
          bip39: ['bip39'],
          tailwindMerge: ['tailwind-merge'],
        },
      },
      plugins: [
        visualizer({
          filename: './stats/build-stats.html',
          open: false,
        }),
      ],
    },
    outDir: 'dist',
  },
});
