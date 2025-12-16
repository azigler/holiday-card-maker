import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for better portability (v0 compatibility)
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Ensure assets are properly handled
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Better chunk splitting for large apps
        manualChunks: {
          'fabric': ['fabric'],
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  },
  // Ensure proper resolution
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
})

