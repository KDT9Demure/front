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
      '/socket.io': {
        target: 'http://43.200.163.174:8000/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
  assetsInclude: ['**/*.jpg'],

})
