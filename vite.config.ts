import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://3.39.47.207/:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket.io': {
        target: 'http://3.39.47.207/:8000/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
  assetsInclude: ['**/*.jpg'],

})
