import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { withThemeByClassName } from '@storybook/addon-themes'

import PrimeVue from 'primevue/config'
import PipePreset from '@/assets/pipe-preset'

import 'primeicons/primeicons.css'
import '@/assets/main.css'
import '@/assets/base.scss'

setup((app) => {
  app.use(PrimeVue, {
    unstyled: false,
    ripple: true,
    theme: {
      preset: PipePreset,
      options: {
        darkModeSelector: '.app-dark-mode',
      },
    },
  })
})

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'app-light',
        dark: 'app-dark-mode',
      },
      defaultTheme: 'light',
    }),
  ],
}
export default preview
