import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.storybook/**',
      'storybook-static/**',
      // Tipos gerados pelo Supabase CLI (podem incluir construções que acionam flags do ESLint)
      'src/**/supabase.types.ts',
    ],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
