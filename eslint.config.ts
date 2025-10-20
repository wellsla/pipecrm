// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  // Relax some rules for Storybook stories and example components
  {
    name: 'stories/overrides',
    files: ['src/stories/**/*.{ts,tsx,vue}'],
    rules: {
      // Story samples often use simple names like "Button"
      'vue/multi-word-component-names': 'off',
      // It's common to type story render args as any in examples
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
