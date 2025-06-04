import { createRequire } from 'node:module'
import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, normalizePath } from 'vite'
import { imagetools } from 'vite-imagetools'
import { compression } from 'vite-plugin-compression2'
import Pages from 'vite-plugin-pages'
import { VitePluginRadar } from 'vite-plugin-radar'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const require = createRequire(import.meta.url)

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'))
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    compression(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-M83JCQ17QK'
      }
    }),
    Pages(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: ''
        }
      ]
    })
  ],
  assetsInclude: ['**/*.mp4', '**/*.webm'],
  define: {
    global: {}
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
    include: [
      'lucide-react',
      'react-helmet',
      'react-icons',
      'react-calendly',
      'react-lazy-load',
      'schema-dts',
      'react-schemaorg'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    minify: true
  }
})
