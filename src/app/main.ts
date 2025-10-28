import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
  app.mount('#app')
}
bootstrap()
