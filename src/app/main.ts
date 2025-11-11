import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import PipePreset from '@/assets/pipe-preset' //themes
import Ripple from 'primevue/ripple'

import 'primeicons/primeicons.css' //icons
import '@/assets/base.scss' //base styles

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
      preset: PipePreset,
      options: {
        darkModeSelector: '.app-dark-mode',
      },
    },
  })
  app.directive('ripple', Ripple)
  app.use(AuthPlugin, auth)
  app.mount('#app')
}
bootstrap()
