import PrimeUI from 'tailwindcss-primeui'

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      /**
       * Extend Tailwind colors com primitive tokens
       * 
       * ⚠️ IMPORTANTE: Use Tailwind APENAS para layout/spacing/borders
       * Cores de componentes devem vir de PrimeVue semantic tokens
       */
      colors: {
        // Magenta palette (brand) - mapeia primitive tokens
        magenta: {
          50: 'var(--magenta-50)',
          100: 'var(--magenta-100)',
          200: 'var(--magenta-200)',
          300: 'var(--magenta-300)',
          400: 'var(--magenta-400)',
          500: 'var(--magenta-500)', // magenta bloom #E03761
          600: 'var(--magenta-600)',
          700: 'var(--magenta-700)',
          800: 'var(--magenta-800)',
          900: 'var(--magenta-900)',
          950: 'var(--magenta-950)',
        },
        // Blue-Gray palette (neutral) - mapeia primitive tokens
        slate: {
          50: 'var(--slate-50)',
          100: 'var(--slate-100)',
          200: 'var(--slate-200)', // alabaster grey
          300: 'var(--slate-300)',
          400: 'var(--slate-400)',
          500: 'var(--slate-500)', // charcoal
          600: 'var(--slate-600)', // baltic blue
          700: 'var(--slate-700)', // charcoal blue
          800: 'var(--slate-800)',
          900: 'var(--slate-900)',
          950: 'var(--slate-950)',
        },
      },
    },
  },
  plugins: [PrimeUI],
}
