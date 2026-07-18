import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('i18next')) {
              return 'vendor-i18n';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-others';
          }
        }
      }
    }
  }
})
