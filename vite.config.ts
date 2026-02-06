import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    include: ['framer-motion'], // Ensure framer-motion is optimized
  },
  ssr: {
    noExternal: ['framer-motion'], // Force Vite to bundle it correctly
  },
})