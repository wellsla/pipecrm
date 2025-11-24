import type { Meta, StoryObj } from '@storybook/vue3';
import PipeContactForm from './PipeContactForm.vue';

const meta = {
  title: 'Modules/Contact/PipeContactForm',
  component: PipeContactForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    onCancel: { action: 'cancel' },
  },
} satisfies Meta<typeof PipeContactForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    modelValue: null,
    loading: false,
  },
};

export const Edit: Story = {
  args: {
    modelValue: {
      id: 'c1',
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      phone: '+55 31 98888-7777',
      company_id: null,
      position: null,
      created_at: new Date().toISOString(),
    },
    loading: false,
  },
};
