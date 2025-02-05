import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools'
import { VitePluginRadar } from 'vite-plugin-radar'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    imagetools(),   
    compression(), 
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-M83JCQ17QK',
      },
    })
  ],
  define: {
      global: {},
    },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      fs: 'fs'
    }
  },
  worker: {
    format: 'es'
  },
  optimizeDeps: {
    include: ['lucide-react', 'react-helmet', 'react-icons', 'react-calendly', 'react-lazy-load', 'schema-dts', 'react-schemaorg'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});