import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook'
  ],
  // Let Storybook's builder-vite manage the Vite plugins it needs. If you need to tweak Vite, do it minimally here.
  viteFinal: async (viteConfig) => viteConfig
}
export default config
