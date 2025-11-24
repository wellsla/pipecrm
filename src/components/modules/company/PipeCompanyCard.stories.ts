import type { Meta, StoryObj } from '@storybook/vue3';
import PipeCompanyCard from './PipeCompanyCard.vue';
import type { Company } from '@/services/modules/companies/companies.types';

const meta = {
  title: 'Modules/Company/PipeCompanyCard',
  component: PipeCompanyCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'click' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
} satisfies Meta<typeof PipeCompanyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mock: Company = {
  id: 'co1',
  name: 'Empresa XYZ Ltda',
  segment: 'Tecnologia',
  city: 'São Paulo',
  created_at: new Date().toISOString(),
};

export const Default: Story = {
  args: {
    company: mock,
  },
};
