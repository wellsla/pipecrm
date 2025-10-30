import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from '@/router'

import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara' //themes

import 'primeicons/primeicons.css' //icons
import '@/assets/tokens.css' //design tokens
import '@/assets/base.scss' //base styles

const bootstrap = async () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Lara
    }
  })
  app.use(createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin + '/auth/callback',
    },
    cacheLocation: 'localstorage'
  }))
  
  app.mount('#app')
}
bootstrap()
