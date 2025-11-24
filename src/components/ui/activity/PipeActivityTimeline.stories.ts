import type { Meta, StoryObj } from '@storybook/vue3'
import PipeActivityTimeline from './PipeActivityTimeline.vue'

const meta: Meta<typeof PipeActivityTimeline> = {
  title: 'Components/Activity/PipeActivityTimeline',
  component: PipeActivityTimeline,
  tags: ['autodocs'],
  argTypes: {
    dealId: {
      control: 'text',
      description: 'ID of the deal to show activities for'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Complete activity timeline component with CRUD operations. Displays all activities for a deal with ability to add, edit, and delete activities.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof PipeActivityTimeline>

export const Default: Story = {
  args: {
    dealId: 'deal-123'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default timeline view. Connects to Supabase to fetch and display activities. Includes add activity button and full CRUD functionality.'
      }
    }
  }
}
