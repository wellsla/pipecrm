import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import eslint2 from 'vite-plugin-eslint2'

export default defineConfig(() => {
  const lifecycle = process.env.npm_lifecycle_script || ''
  const isRunningViteCLI = lifecycle.startsWith('vite') || lifecycle.includes('vite dev')
  const enableVueDevtools = isRunningViteCLI && process.env.VUE_DEVTOOLS !== 'false'

  return {
    plugins: [
      vue(),
      vueJsx(),
      enableVueDevtools && vueDevTools(),
      eslint2(),
    ].filter(Boolean),
    server: isRunningViteCLI
      ? {
          hmr: {
            overlay: false,
          },
        }
      : undefined,
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
  }
})
