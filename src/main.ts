import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { supabase } from '@/db/supabase.client';
import { createSentryPiniaPlugin } from '@sentry/vue';
import { initSentry, trackError } from './errors/tracking';
import { isAppError } from './errors/app/app.mapping';
import { useAuthStore } from '@/stores/auth/auth.store';
 
import router from '@/router';
import App from '@/App.vue';

import PrimeVue from 'primevue/config';
import PipePreset from '@/assets/pipe-preset';
import Ripple from 'primevue/ripple';

import 'primeicons/primeicons.css';
import '@/assets/tokens.css';

const bootstrap = async () => {
  const app = createApp(App);

  initSentry(app);

  const pinia = createPinia();
  pinia.use(createSentryPiniaPlugin());

  app.use(pinia);
  app.use(router);
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: PipePreset,
      options: {
        darkModeSelector: '.dark',
      },
    },
  });

  app.directive('ripple', Ripple);

  app.provide('supabase', supabase);

  app.config.errorHandler = (error, instance, info) => {
    if (!isAppError(error)) {
      trackError(error, `vue.errorHandler: ${info}`);
    }

    console.error('Vue errorHandler:', { error, instance, info });
  }

  // Restore auth session on app load
  const auth = useAuthStore();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    auth.setUser({
      id: session.user.id,
      email: session.user.email ?? '',
      isAdmin: false,
    });
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      auth.setUser({
        id: session.user.id,
        email: session.user.email ?? '',
        isAdmin: false,
      });
    } else {
      auth.setUser(null);
    }
  });

  app.mount('#app');
};

bootstrap();
