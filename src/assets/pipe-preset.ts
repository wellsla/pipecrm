import { definePreset } from '@primeuix/themes'

import Lara from '@primeuix/themes/lara' //themes

import '@/assets/main.css' // custom global styles

export default definePreset(Lara, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: 'var(--pipe-color-primary)',
          inverseColor: 'var(--pipe-inverse-color-primary)',
          hoverColor: 'var(--pipe-hover-color-primary)',
          activeColor: 'var(--pipe-active-color-primary)',
        },
        secondary: {},
        background: 'var(--pipe-color-bg)',
        color: 'var(--pipe-color-text)',
        semantic: {
          highlight: {},
        },
      },
      dark: {
        primary: {
          color: 'var(--pipe-dark-color-primary)',
          inverseColor: 'var(--pipe-dark-inverse-color-primary)',
          hoverColor: 'var(--pipe-dark-hover-color-primary)',
          activeColor: 'var(--pipe-dark-active-color-primary)',
        },
        background: 'var(--pipe-dark-color-bg)',
        color: 'var(--pipe-dark-color-text)',
        semantic: {
          highlight: {},
        },
      },
    },
  },
})
