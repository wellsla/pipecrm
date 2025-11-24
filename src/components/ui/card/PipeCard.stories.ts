import type { Meta, StoryObj } from '@storybook/vue3';
import PipeCard from './PipeCard.vue';
import type { DealWithRelations } from '@/types/deals.types';

const meta = {
  title: 'UI/PipeCard',
  component: PipeCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
} satisfies Meta<typeof PipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDeal: DealWithRelations = {
  id: '1',
  title: 'Proposta Comercial - Empresa ABC',
  amount: 15000,
  stage_id: '1',
  pipeline_id: '1',
  owner_id: 'user-1',
  status: 'open',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const Open: Story = {
  args: {
    deal: mockDeal,
  },
};

export const Won: Story = {
  args: {
    deal: {
      ...mockDeal,
      title: 'Venda Fechada - Cliente XYZ',
      status: 'won',
      amount: 50000,
    },
  },
};

export const Lost: Story = {
  args: {
    deal: {
      ...mockDeal,
      title: 'Oportunidade Perdida',
      status: 'lost',
      amount: 8000,
    },
  },
};

export const LongTitle: Story = {
  args: {
    deal: {
      ...mockDeal,
      title:
        'Título muito longo para testar como o card se comporta com overflow de texto e múltiplas linhas de título',
    },
  },
};

export const SmallAmount: Story = {
  args: {
    deal: {
      ...mockDeal,
      amount: 500,
    },
  },
};

export const LargeAmount: Story = {
  args: {
    deal: {
      ...mockDeal,
      amount: 1250000,
    },
  },
};
