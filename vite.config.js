import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? "/cashbook-app/" : "/",
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: 'localhost',
    open: true,
    strictPort: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
