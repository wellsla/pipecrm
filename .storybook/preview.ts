import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { withThemeByClassName } from '@storybook/addon-themes'

import PrimeVue from 'primevue/config'
import PipePreset from '@/assets/pipe-preset'
import Ripple from 'primevue/ripple'

import 'primeicons/primeicons.css'
import '@/assets/tokens.css'
import './global.css'

setup((app) => {
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: PipePreset,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
  app.directive('ripple', Ripple)
})

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}
export default preview
