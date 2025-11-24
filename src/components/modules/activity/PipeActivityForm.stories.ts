import type { Meta, StoryObj } from '@storybook/vue3'
import PipeActivityForm from './PipeActivityForm.vue'

const meta: Meta<typeof PipeActivityForm> = {
  title: 'Modules/Activity/PipeActivityForm',
  component: PipeActivityForm,
  tags: ['autodocs'],
  argTypes: {
    dealId: {
      control: 'text',
      description: 'ID of the deal this activity belongs to'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state during form submission'
    }
  }
}

export default meta
type Story = StoryObj<typeof PipeActivityForm>

export const CreateActivity: Story = {
  args: {
    dealId: 'deal-123',
    loading: false
  }
}

export const EditActivity: Story = {
  args: {
    activity: {
      id: '1',
      deal_id: 'deal-123',
      type: 'note',
      content: 'Customer requested additional information about pricing tiers. Send detailed pricing sheet with volume discounts',
      created_at: new Date().toISOString()
    },
    dealId: 'deal-123',
    loading: false
  }
}

export const LoadingState: Story = {
  args: {
    dealId: 'deal-123',
    loading: true
  }
}
