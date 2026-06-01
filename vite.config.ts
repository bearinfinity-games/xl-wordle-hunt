import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wordle-api" : {
        target: "https://api.frontendexpert.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wordle-api/, ""),
      },
    },      
  },
});
