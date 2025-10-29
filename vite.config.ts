import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint2 from 'vite-plugin-eslint2'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslint2(),
  ],
  server: {
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  }
})
