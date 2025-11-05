import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara' //themes

import 'primeicons/primeicons.css' //icons
import '@/assets/tokens.css' //design tokens
import '@/assets/base.scss' //base styles
import '@/assets/prime-overrides.scss' //primevue overrides

import AuthPlugin, { SupaAuthService } from '@/services/auth.service'

const bootstrap = async () => {
  const auth = new SupaAuthService()
  await auth.init()

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Lara,
    },
  })
  app.use(AuthPlugin, auth)
  app.mount('#app')
}
bootstrap()
