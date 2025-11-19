import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { fn } from '@storybook/test'

import PipeButton from '@/components/ui/button/PipeButton.vue'

const meta: Meta<typeof PipeButton> = {
  title: 'Ui/Button/PipeButton',
  component: PipeButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
    icon: {
      control: 'text',
      description: 'Classe do ícone (ex: "pi pi-check")',
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'help', 'danger', 'contrast'],
      description: 'Variação de cor/severidade',
    },
    variant: {
      control: 'select',
      options: [undefined, 'text', 'outlined'],
      description: 'Variação visual: padrão, texto ou contornado',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Tamanho do botão',
    },
    condition: {
      control: 'select',
      options: [undefined, 'loading', 'disabled', 'raised', 'rounded', 'asChild'],
      description:
        'Estado/condição especial que controla disabled, raised, rounded ou comportamento como child',
    },
    badge: {
      control: 'object',
      description: 'Badge opcional. Ex: { value: 3, severity: "danger", variant: "solid" }',
    },
    externalLink: {
      control: 'boolean',
      description: 'Renderiza como link externo (usa <a> + rel="noopener"). Use junto com "href".',
    },
    href: {
      control: 'text',
      description: 'URL para navegação. Use junto com "externalLink" para links externos.',
    },
  },
  args: {
    onClick: fn(),
    label: 'Button',
    severity: 'primary',
    size: 'small',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PipeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

// Severities
export const Secondary: Story = {
  args: { severity: 'secondary', label: 'Secondary' },
}

export const Success: Story = {
  args: { severity: 'success', label: 'Success' },
}

export const Info: Story = {
  args: { severity: 'info', label: 'Info' },
}

export const Warning: Story = {
  args: { severity: 'warn', label: 'Warning' },
}

export const Danger: Story = {
  args: { severity: 'danger', label: 'Danger' },
}

export const Contrast: Story = {
  args: { severity: 'contrast', label: 'Contrast' },
}

// Variants
export const TextVariant: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
  },
}

export const OutlinedVariant: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
  },
}

// Icons
export const WithIconLeft: Story = {
  args: {
    label: 'Save',
    icon: { class: 'pi pi-save', position: 'left' },
  },
}

export const IconOnly: Story = {
  args: {
    label: '',
    icon: { class: 'pi pi-user' },
  },
}

// Conditions
export const Raised: Story = {
  args: {
    label: 'Raised',
    condition: 'raised',
  },
}

export const Rounded: Story = {
  args: {
    label: 'Rounded',
    condition: 'rounded',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    condition: 'disabled',
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading...',
    condition: 'loading',
  },
}

// Badge
export const WithBadge: Story = {
  args: {
    label: 'Notifications',
    icon: { class: 'pi pi-bell' },
    badge: {
      value: '5',
      severity: 'danger',
    },
  },
}

export const WithBadgeOutlined: Story = {
  args: {
    label: 'Messages',
    icon: { class: 'pi pi-envelope' },
    badge: {
      value: '2',
      severity: 'info',
    },
  },
}

// Links
export const AsInternalLink: Story = {
  args: {
    label: 'Go to /dashboard',
    href: '/dashboard',
    variant: 'link',
  },
}

export const AsExternalLink: Story = {
  args: {
    label: 'Open PrimeVue',
    externalLink: true,
    href: 'https://primevue.org',
  },
}

// Children
export const AsChildExample: Story = {
  args: {
    condition: 'asChild',
  },
  parameters: {
    slots: {
      default: {
        template: `          
          <span>Custom Child Content</span>          
        `,
      },
    },
  },
}
