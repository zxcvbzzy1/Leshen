import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: [
      'vue'
    ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    proxy:{
      '/api':{
        target:'http://0.0.0.0:8081',
        changeOrigin:true,
        rewrite:path => path.replace(/^\/api/,'')
      }
    }
  },

})
