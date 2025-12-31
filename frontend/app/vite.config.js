import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/app/',
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/limousines\.api\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache', expiration: { maxEntries: 50, maxAgeSeconds: 300 } }
          },
          {
            urlPattern: /\.(avif|webp|png|jpg|svg)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'images', expiration: { maxEntries: 100, maxAgeSeconds: 86400 } }
          }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('dashboard')) return 'dashboard'
          if (id.includes('auth')) return 'auth'
        }
      }
    }
  }
})
