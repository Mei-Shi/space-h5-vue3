import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//它可以自动引入组件，并按需引入组件的样式。
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] })
  ],
  resolve: {
    alias: {//配置路径别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})