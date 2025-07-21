/* eslint-disable unicorn/prefer-module */
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@kernel': path.resolve(__dirname, './src/kernel'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@app': path.resolve(__dirname, './src/app'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/kernel/')) {
            return 'kernel';
          }
          if (id.includes('node_modules/react')
            || id.includes('node_modules/react-dom')
            || id.includes('node_modules/@tanstack/react-query')
            || id.includes('node_modules/@radix-ui')) {
            return 'vendor';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform/resolvers')) {
            return 'forms';
          }
          if (id.includes('node_modules/lodash-es') || id.includes('node_modules/clsx') || id.includes('node_modules/zod')) {
            return 'utils';
          }
        },
      },
    },
  },
  server: {
    port: 3010,
    open: true,
  },
  preview: {
    port: 5000,
  },
});
