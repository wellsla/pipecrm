import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'
import App from '@/App.vue'

import PrimeVue from 'primevue/config'
import PipePreset from '@/assets/pipe-preset'
import Ripple from 'primevue/ripple'

import 'primeicons/primeicons.css'
import '@/assets/base.css'
import '@/assets/tokens.css'

import AuthPlugin, { SupaAuthService } from '@/services/auth.service'

import * as Sentry from '@sentry/vue'

const bootstrap = async () => {
  const auth = new SupaAuthService()
  await auth.init()

  const app = createApp(App)

  Sentry.init({
    app,
    dsn: 'https://cd27fcf9332c343b567e990ddf91d411@o4510399356862464.ingest.us.sentry.io/4510399358500864',
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/fuczfkuspyusuloqjmod\.supabase\.co\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    _experiments: { enableLogs: true },
  })

  const pinia = createPinia()
  pinia.use(Sentry.createSentryPiniaPlugin())

  app.use(pinia)
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
  app.use(AuthPlugin, auth)

  app.directive('ripple', Ripple)

  app.mount('#app')
}
bootstrap()
