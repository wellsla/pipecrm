import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from '../router'

import PrimeVue from 'primevue/config'
import '@primeuix/themes/lara' //themes
import '@primevue/icons' //icons
import '@/assets/tokens.css' //design tokens
import '@/assets/base.scss' //base styles

const bootstrap = async () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue, {ripple: true})
  app.use(createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }))
  app.mount('#app')
}
bootstrap()
