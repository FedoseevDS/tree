import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      contexts: resolve(__dirname, './src/contexts'),
      hooks: resolve(__dirname, './src/hooks'),
      pages: resolve(__dirname, './src/pages'),
      styles: resolve(__dirname, './src/styles'),
    },
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 5007,
  },
});
