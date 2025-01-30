import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      fs: 'fs'
    }
  },
  optimizeDeps: {
    include: ['lucide-react']
  }
});