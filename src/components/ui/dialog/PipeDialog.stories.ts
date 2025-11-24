import type { Meta, StoryObj } from '@storybook/vue3';
import PipeDialog from './PipeDialog.vue';


const meta = {
  title: 'UI/PipeDialog',
  component: PipeDialog,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof PipeDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: true,
    header: 'Título do Dialog',
  },
  render: (args) => ({
    components: { PipeDialog },
    setup() {
      return { args };
    },
    template: `
      <PipeDialog v-bind="args">
        <div class="p-4">Conteúdo do dialog padrão.</div>
      </PipeDialog>
    `,
  }),
};

export const CustomHeaderFooter: Story = {
  args: {
    modelValue: true,
    showHeader: true,
    showFooter: true,
  },
  render: (args) => ({
    components: { PipeDialog },
    setup() {
      return { args };
    },
    template: `
      <PipeDialog v-bind="args">
        <template #header>
          <div class="flex items-center gap-2">
            <i class="pi pi-info-circle text-blue-500" />
            <span>Header Customizado</span>
          </div>
        </template>
        <div class="p-4">Conteúdo com header e footer customizados.</div>
        <template #footer>
          <button class="btn-primary" @click="$emit('close')">Fechar</button>
        </template>
      </PipeDialog>
    `,
  }),
};

export const Modal: Story = {
  args: {
    modelValue: true,
    header: 'Modal Dialog',
    modal: true,
  },
  render: (args) => ({
    components: { PipeDialog },
    setup() {
      return { args };
    },
    template: `
      <PipeDialog v-bind="args">
        <div class="p-4">Dialog modal, não fecha ao clicar fora.</div>
      </PipeDialog>
    `,
  }),
};
