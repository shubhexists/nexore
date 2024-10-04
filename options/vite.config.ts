import path from 'path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framerMotion: ['framer-motion'],
          radixUI: [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-icons',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
          ],
          lucide: ['lucide-react'],
          bip39: ['bip39'],
          tailwindMerge: ['tailwind-merge'],
        },
      },
      plugins: [
        visualizer({
          filename: '../stats/options-build-stats.html',
          open: false,
        }),
      ],
    },
    outDir: 'dist',
  },
});
