import path from 'path'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  framework: { name: '@storybook/vue3-vite', options: {} },
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
  ],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    }

    config.server = config.server || {}

    config.server.fs = {
      ...(config.server.fs || {}),
      allow: [path.resolve(__dirname, '..')],
    }

    return config
  },
}
export default config
