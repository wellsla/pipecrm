import type { Meta, StoryObj } from '@storybook/vue3-vite';

import PipeInput from '@/components/ui/input/PipeInput.vue';

const meta: Meta<typeof PipeInput> = {
  title: 'Ui/Input/PipeInput',
  component: PipeInput,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID único do input',
      required: true,
    },
    type: {
      control: 'select',
      options: ['text', 'mask', 'number', 'otp', 'password'],
      description: 'Tipo do input',
    },
    variant: {
      control: 'select',
      options: [undefined, 'filled'],
      description: 'Variação visual',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
      description: 'Tamanho do input',
    },
    conditions: {
      control: 'object',
      description: 'Estado/condição do input. Ex: { fluid: true, disabled: false, invalid: false }',
    },
    mask: {
      control: 'text',
      description: 'Máscara para o tipo mask. Ex: "(999) 999-9999"',
    },
    slotChar: {
      control: 'text',
      description: 'Caractere do slot da máscara. Padrão: "_"',
    },
    numberParams: {
      control: 'object',
      description: 'Parâmetros para tipo number',
    },
    otpParams: {
      control: 'object',
      description: 'Parâmetros para tipo otp',
    },
    passwordParams: {
      control: 'object',
      description: 'Parâmetros para tipo password',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label de acessibilidade',
    },
  },
  args: {
    id: 'input-1',
    type: 'text',
    placeholder: 'Enter text',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PipeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Text Types
export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Insira seu nome',
  },
};

export const TextFilled: Story = {
  args: {
    type: 'text',
    variant: 'filled',
    placeholder: 'Variante preenchida',
  },
};

// Sizes
export const SmallSize: Story = {
  args: {
    type: 'text',
    size: 'small',
    placeholder: 'Input pequeno',
  },
};

export const LargeSize: Story = {
  args: {
    type: 'text',
    size: 'large',
    placeholder: 'Input grande',
  },
};

// Conditions
export const Fluid: Story = {
  args: {
    type: 'text',
    placeholder: 'Largura fluida',
    conditions: { fluid: true },
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Input desabilitado',
    conditions: { disabled: true },
  },
};

export const Invalid: Story = {
  args: {
    type: 'text',
    placeholder: 'Estado inválido',
    conditions: { invalid: true },
  },
};

// Mask Type
export const PhoneMask: Story = {
  args: {
    id: 'phone-input',
    type: 'mask',
    mask: '(999) 999-9999',
    placeholder: '(999) 999-9999',
  },
};

export const DateMask: Story = {
  args: {
    id: 'date-input',
    type: 'mask',
    mask: '99/99/9999',
    placeholder: 'DD/MM/YYYY',
    slotChar: 'dd/mm/yyyy',
  },
};

export const CPFMask: Story = {
  args: {
    id: 'cpf-input',
    type: 'mask',
    mask: '999.999.999-99',
    placeholder: '000.000.000-00',
  },
};

export const ZipCodeMask: Story = {
  args: {
    id: 'zip-input',
    type: 'mask',
    mask: '99999-999',
    placeholder: '00000-000',
  },
};

// Number Type
export const NumberInput: Story = {
  args: {
    id: 'number-input',
    type: 'number',
    placeholder: 'Insira um número',
    numberParams: {
      mode: 'decimal',
      useGrouping: false,
    },
  },
};

export const NumberWithButtons: Story = {
  args: {
    id: 'number-buttons',
    type: 'number',
    placeholder: 'Quantidade',
    numberParams: {
      showButtons: true,
      buttonLayout: 'horizontal',
      min: 0,
      max: 100,
      step: 1,
    },
  },
};

export const NumberVerticalButtons: Story = {
  args: {
    id: 'number-vertical',
    type: 'number',
    numberParams: {
      showButtons: true,
      buttonLayout: 'vertical',
      min: 0,
      max: 1000,
      step: 10,
    },
  },
};

export const CurrencyBRL: Story = {
  args: {
    id: 'currency-brl',
    type: 'number',
    placeholder: 'R$ 0,00',
    numberParams: {
      mode: 'currency',
      currency: 'BRL',
      locale: 'pt-BR',
      currencyDisplay: 'symbol',
      minFractionDigits: 2,
      maxFractionDigits: 2,
    },
  },
};

export const CurrencyUSD: Story = {
  args: {
    id: 'currency-usd',
    type: 'number',
    placeholder: '$0.00',
    numberParams: {
      mode: 'currency',
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'symbol',
      minFractionDigits: 2,
      maxFractionDigits: 2,
    },
  },
};

export const Percentage: Story = {
  args: {
    id: 'percentage',
    type: 'number',
    placeholder: '0%',
    numberParams: {
      mode: 'decimal',
      suffix: '%',
      min: 0,
      max: 100,
      minFractionDigits: 0,
      maxFractionDigits: 2,
    },
  },
};

export const DecimalWithGrouping: Story = {
  args: {
    id: 'decimal-grouped',
    type: 'number',
    placeholder: '0.00',
    numberParams: {
      mode: 'decimal',
      useGrouping: true,
      minFractionDigits: 2,
      maxFractionDigits: 4,
    },
  },
};

// OTP Type
export const OTPDefault: Story = {
  args: {
    id: 'otp-default',
    type: 'otp',
    otpParams: {
      length: 6,
      integerOnly: true,
    },
  },
};

export const OTP4Digits: Story = {
  args: {
    id: 'otp-4',
    type: 'otp',
    otpParams: {
      length: 4,
      integerOnly: true,
    },
  },
};

export const OTPAlphanumeric: Story = {
  args: {
    id: 'otp-alpha',
    type: 'otp',
    otpParams: {
      length: 6,
      integerOnly: false,
    },
  },
};

// Password Type
export const PasswordBasic: Story = {
  args: {
    id: 'password-basic',
    type: 'password',
    placeholder: 'Insira a senha',
    passwordParams: {
      feedback: false,
    },
  },
};

export const PasswordWithFeedback: Story = {
  args: {
    id: 'password-feedback',
    type: 'password',
    placeholder: 'Insira uma senha forte',
    passwordParams: {
      feedback: true,
      promptLabel: 'Digite sua senha',
      weakLabel: 'Fraca',
      mediumLabel: 'Média',
      strongLabel: 'Forte',
    },
  },
};

export const PasswordWithToggle: Story = {
  args: {
    id: 'password-toggle',
    type: 'password',
    placeholder: 'Senha com alternância',
    mask: true,
    passwordParams: {
      feedback: false,
    },
  },
};

export const PasswordWithClear: Story = {
  args: {
    id: 'password-clear',
    type: 'password',
    placeholder: 'Senha com botão de limpar',
    passwordParams: {
      feedback: false,
      showClear: true,
    },
  },
};

// Accessibility
export const WithAriaLabel: Story = {
  args: {
    id: 'accessible-input',
    type: 'text',
    placeholder: 'Nome de usuário',
    ariaLabel: 'Campo de entrada do nome de usuário',
  },
};

export const WithAriaDescribedBy: Story = {
  args: {
    id: 'described-input',
    type: 'text',
    placeholder: 'Email',
    ariaDescribedBy: 'email-help-text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Este input está associado a um elemento de ajuda com id "email-help-text"',
      },
    },
  },
};

// Complex Examples
export const FormExample: Story = {
  render: (args) => ({
    components: { PipeInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <PipeInput
          id="name"
          type="text"
          placeholder="Nome completo"
          :conditions="{ fluid: true }"
        />
        <PipeInput
          id="email"
          type="text"
          placeholder="E-mail"
          :conditions="{ fluid: true }"
        />
        <PipeInput
          id="phone"
          type="mask"
          mask="(99) 99999-9999"
          placeholder="Telefone"
          :conditions="{ fluid: true }"
        />
        <PipeInput
          id="salary"
          type="number"
          placeholder="Salário"
          :conditions="{ fluid: true }"
          :numberParams="{
            mode: 'currency',
            currency: 'BRL',
            locale: 'pt-BR',
          }"
        />
        <PipeInput
          id="password"
          type="password"
          placeholder="Senha"
          :conditions="{ fluid: true }"
          :passwordParams="{ feedback: true }"
        />
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
};
