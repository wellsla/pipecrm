import type { Meta, StoryObj } from '@storybook/vue3-vite';

import PipeButton from '@/components/ui/button/PipeButton.vue';

const meta: Meta<typeof PipeButton> = {
  title: 'Ui/Button/PipeButton',
  component: PipeButton,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID único do botão',
      required: true,
    },
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
    conditions: {
      control: 'object',
      description:
        'Estado/condição especial do botão. Ex: { disabled: true, loading: false, raised: true }',
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
    id: 'button-1',
    label: 'Botão',
    severity: 'primary',
    size: 'small',
    onClick: () => {
      alert('Botão clicado!');
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PipeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

// Severities
export const Secondary: Story = {
  args: { severity: 'secondary', label: 'Secundário' },
};

export const Success: Story = {
  args: { severity: 'success', label: 'Sucesso' },
};

export const Info: Story = {
  args: { severity: 'info', label: 'Informação' },
};

export const Warning: Story = {
  args: { severity: 'warn', label: 'Aviso' },
};

export const Danger: Story = {
  args: { severity: 'danger', label: 'Perigo' },
};

export const Contrast: Story = {
  args: { severity: 'contrast', label: 'Contraste' },
};

// Variants
export const TextVariant: Story = {
  args: {
    label: 'Botão de Texto',
    variant: 'text',
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: 'Botão Contornado',
    variant: 'outlined',
  },
};

// Icons
export const WithIconLeft: Story = {
  args: {
    label: 'Salvar',
    icon: { class: 'pi pi-save', position: 'left' },
  },
};

export const IconOnly: Story = {
  args: {
    label: '',
    icon: { class: 'pi pi-user' },
  },
};

// Conditions
export const Raised: Story = {
  args: {
    label: 'Elevado',
    conditions: { raised: true },
  },
};

export const Rounded: Story = {
  args: {
    label: 'Arredondado',
    conditions: { rounded: true },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    conditions: { disabled: true },
  },
};

export const Loading: Story = {
  args: {
    label: 'Carregando...',
    conditions: { loading: true },
  },
};

// Badge
export const WithBadge: Story = {
  args: {
    label: 'Notificações',
    icon: { class: 'pi pi-bell' },
    badge: {
      value: '5',
      severity: 'danger',
    },
  },
};

export const WithBadgeOutlined: Story = {
  args: {
    label: 'Mensagens',
    icon: { class: 'pi pi-envelope' },
    badge: {
      value: '2',
      severity: 'info',
    },
  },
};

// Links
export const AsInternalLink: Story = {
  args: {
    label: 'Ir para /dashboard',
    href: '/dashboard',
    variant: 'link',
  },
};

export const AsExternalLink: Story = {
  args: {
    label: 'Abrir PrimeVue',
    externalLink: true,
    href: 'https://primevue.org',
  },
};

// Children
export const AsChildExample: Story = {
  args: {
    conditions: { asChild: true },
  },
  parameters: {
    slots: {
      default: {
        template: `          
          <span>Conteúdo Personalizado</span>          
        `,
      },
    },
  },
};
