import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { fn } from 'storybook/test'

import PipeButton from '@/components/ui/button/PipeButton.vue'

const meta: Meta<typeof PipeButton> = {
  title: 'Ui/Button/PipeButton',
  component: PipeButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'help', 'danger'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof PipeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Button',
    severity: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    severity: 'secondary',
  },
}

export const Large: Story = {
  args: {
    label: 'Button',
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    label: 'Button',
    size: 'small',
  },
}

export const Icon: Story = {
  args: {
    severity: 'success',
    icon: 'pi pi-check',
  },
}
