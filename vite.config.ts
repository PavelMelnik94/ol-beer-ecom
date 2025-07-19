import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const startPath = path.dirname('./src');
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(startPath, '/shared'),
      '@kernel': path.resolve(startPath, '/kernel'),
      '@modules': path.resolve(startPath, '/modules'),
      '@pages': path.resolve(startPath, '/pages'),
      '@app': path.resolve(startPath, '/app'),
      '@': path.resolve(startPath, '/'),
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
