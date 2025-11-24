import type { Meta, StoryObj } from '@storybook/vue3'
import PipeActivityCard from './PipeActivityCard.vue'
import { ActivityType } from '@/services/modules/activities/activities.types'

const meta: Meta<typeof PipeActivityCard> = {
  title: 'Components/Activity/PipeActivityCard',
  component: PipeActivityCard,
  tags: ['autodocs'],
  argTypes: {
    showActions: {
      control: 'boolean',
      description: 'Show edit/delete action buttons'
    }
  }
}

export default meta
type Story = StoryObj<typeof PipeActivityCard>

export const NoteActivity: Story = {
  args: {
    activity: {
      id: '1',
      deal_id: 'deal-1',
      type: ActivityType.NOTE,
      content: 'Customer expressed interest in premium package. Follow up next week with detailed proposal.',
      created_at: new Date().toISOString()
    },
    showActions: true
  }
}

export const CallActivity: Story = {
  args: {
    activity: {
      id: '2',
      deal_id: 'deal-1',
      type: ActivityType.CALL,
      content: 'Initial discovery call with decision maker. Budget confirmed: $50k, timeline: Q2 2025',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    showActions: true
  }
}

export const EmailActivity: Story = {
  args: {
    activity: {
      id: '3',
      deal_id: 'deal-1',
      type: ActivityType.EMAIL,
      content: 'Sent proposal document and pricing breakdown',
      created_at: new Date(Date.now() - 172800000).toISOString()
    },
    showActions: true
  }
}

export const MeetingActivity: Story = {
  args: {
    activity: {
      id: '4',
      deal_id: 'deal-1',
      type: ActivityType.MEETING,
      content: 'Product demo with engineering team. Technical requirements discussed, integration feasibility confirmed',
      created_at: new Date(Date.now() - 604800000).toISOString()
    },
    showActions: true
  }
}

export const TaskActivity: Story = {
  args: {
    activity: {
      id: '5',
      deal_id: 'deal-1',
      type: ActivityType.TASK,
      content: 'Prepare custom contract for review. Include SLA terms and support coverage details',
      created_at: new Date().toISOString()
    },
    showActions: true
  }
}

export const OtherActivity: Story = {
  args: {
    activity: {
      id: '6',
      deal_id: 'deal-1',
      type: ActivityType.OTHER,
      content: 'Deal moved to Negotiation stage. Customer requested volume discount discussion',
      created_at: new Date(Date.now() - 259200000).toISOString()
    },
    showActions: true
  }
}

export const WithoutActions: Story = {
  args: {
    activity: {
      id: '7',
      deal_id: 'deal-1',
      type: ActivityType.NOTE,
      content: 'Internal note: competitor pricing analysis completed',
      created_at: new Date().toISOString()
    },
    showActions: false
  }
}
