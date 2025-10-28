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
      // Only enable Vue DevTools in Vite dev server, and allow toggling off via VUE_DEVTOOLS=false
      enableVueDevtools && vueDevTools(),
      eslint2(),
    ].filter(Boolean),
    server: isRunningViteCLI
      ? {
          hmr: {
            // Avoid dev overlay breaking the session if a plugin's HMR hook misbehaves
            overlay: false,
          },
        }
      : undefined,
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
  }
})
