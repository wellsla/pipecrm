import type { Meta, StoryObj } from '@storybook/vue3';
import PipeContactCard from './PipeContactCard.vue';
import type { Contact } from '@/types/modules/contacts.types';

const meta = {
  title: 'Modules/Contact/PipeContactCard',
  component: PipeContactCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'click' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
} satisfies Meta<typeof PipeContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mock: Contact = {
  id: 'c1',
  name: 'João Silva',
  email: 'joao.silva@example.com',
  phone: '+55 11 99999-9999',
  company_id: null,
  position: null,
  created_at: new Date().toISOString(),
};

export const Default: Story = {
  args: {
    contact: mock,
  },
};
