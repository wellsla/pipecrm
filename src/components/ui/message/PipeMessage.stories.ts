import type { Meta, StoryObj } from '@storybook/vue3-vite';

import PipeMessage from '@/components/ui/message/PipeMessage.vue';

const meta: Meta<typeof PipeMessage> = {
	title: 'Ui/Message/PipeMessage',
	component: PipeMessage,
	tags: ['autodocs'],
	argTypes: {
		id: {
			control: 'text',
			description: 'ID único da mensagem',
		},
		severity: {
			control: 'select',
			options: ['info', 'success', 'warn', 'error', 'secondary', 'contrast'],
			description: 'Severidade/variação de cor',
		},
		variant: {
			control: 'select',
			options: [undefined, 'simple', 'outlined'],
			description: 'Variação visual: simples ou contornada',
		},
		icon: {
			control: 'text',
			description: 'Classe do ícone (ex: "pi pi-info-circle")',
		},
		size: {
			control: 'select',
			options: [undefined, 'small', 'large'],
			description: 'Tamanho do componente',
		},
		conditions: {
			control: 'object',
			description: 'Condições/estados adicionais. Ex: { closable: true }',
		},
	},
	args: {
		id: 'pipe-message-1',
		severity: 'info',
		variant: 'outlined',
		conditions: { closable: false },
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof PipeMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { PipeMessage },
		setup() {
			return { args };
		},
		template: `
			<PipeMessage v-bind="args">Mensagem informativa padrão.</PipeMessage>
		`,
	}),
};

// Severities
export const Info: Story = {
	args: { severity: 'info' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Informação: operação em andamento.</PipeMessage>`,
	}),
};

export const Success: Story = {
	args: { severity: 'success' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Sucesso: ação concluída com êxito.</PipeMessage>`,
	}),
};

export const Warning: Story = {
	args: { severity: 'warn' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Aviso: verifique os campos antes de continuar.</PipeMessage>`,
	}),
};

export const Error: Story = {
	args: { severity: 'error' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Erro: não foi possível processar a solicitação.</PipeMessage>`,
	}),
};

export const Secondary: Story = {
	args: { severity: 'secondary' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Mensagem secundária para contexto adicional.</PipeMessage>`,
	}),
};

export const Contrast: Story = {
	args: { severity: 'contrast' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Mensagem em alto contraste.</PipeMessage>`,
	}),
};

// Variants
export const SimpleVariant: Story = {
	args: { variant: 'simple' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Variante simples sem borda.</PipeMessage>`,
	}),
};

export const OutlinedVariant: Story = {
	args: { variant: 'outlined' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Variante contornada com destaque.</PipeMessage>`,
	}),
};

// Sizes
export const Small: Story = {
	args: { size: 'small' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Mensagem compacta.</PipeMessage>`,
	}),
};

export const Large: Story = {
	args: { size: 'large' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Mensagem grande para maior legibilidade.</PipeMessage>`,
	}),
};

// Closable
export const Closable: Story = {
	args: { conditions: { closable: true } },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Você pode fechar esta mensagem.</PipeMessage>`,
	}),
};

// Custom Icon
export const WithIcon: Story = {
	args: { icon: 'pi pi-info-circle' },
	render: (args) => ({
		components: { PipeMessage },
		setup: () => ({ args }),
		template: `<PipeMessage v-bind="args">Mensagem com ícone personalizado.</PipeMessage>`,
	}),
};

// In-context usage (Form)
export const InFormContext: Story = {
	render: () => ({
		components: { PipeMessage },
		template: `
			<div class="w-96 space-y-3">
				<div>
					<label for="email" class="block text-sm font-semibold mb-2">E-mail</label>
					<input id="email" type="email" class="w-full px-3 py-2 border rounded-md" placeholder="seu@email.com" />
					<PipeMessage severity="error" variant="simple" icon="pi pi-exclamation-circle" size="small" class="mt-2">
						E-mail inválido. Por favor, digite um endereço válido.
					</PipeMessage>
				</div>
			</div>
		`,
	}),
};

// Multiple messages
export const MultipleMessages: Story = {
	render: () => ({
		components: { PipeMessage },
		template: `
			<div class="space-y-3 w-96">
				<PipeMessage severity="info">Informação: sistema atualizado.</PipeMessage>
				<PipeMessage severity="success">Sucesso: backup concluído.</PipeMessage>
				<PipeMessage severity="warn">Aviso: manutenção amanhã às 2h.</PipeMessage>
				<PipeMessage severity="error">Erro: falha de conexão com servidor.</PipeMessage>
			</div>
		`,
	}),
};

