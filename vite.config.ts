import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint2 from 'vite-plugin-eslint2'

export default defineConfig({
  plugins: [vue(), vueJsx(), eslint2({ include: ['src/**/*.ts', 'src/**/*.vue'] })],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
