import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  server: {
    cors: true,
    host: "127.0.0.1", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    port: 4000,
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:7002/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  }
})
