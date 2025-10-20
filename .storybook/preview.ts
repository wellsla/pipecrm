import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

setup((app) => {
  app.use(PrimeVue, { theme: { preset: Aura } })
})

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
}
export default preview
