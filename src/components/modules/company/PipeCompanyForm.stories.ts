import type { Meta, StoryObj } from '@storybook/vue3';
import PipeCompanyForm from './PipeCompanyForm.vue';

const meta = {
  title: 'Modules/Company/PipeCompanyForm',
  component: PipeCompanyForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    onCancel: { action: 'cancel' },
  },
} satisfies Meta<typeof PipeCompanyForm>;

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
      id: 'co1',
      name: 'Tech Solutions Inc',
      segment: 'Software',
      city: 'Florianópolis',
      created_at: new Date().toISOString(),
    },
    loading: false,
  },
};
