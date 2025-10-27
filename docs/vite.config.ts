import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Prevent Rollup from hashing entry filenames
        // This ensures zudoku.config.js is output with the exact name expected by the build process
        entryFileNames: '[name].js',
      }
    }
  }
})
