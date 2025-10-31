import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PipePassword from '@/components/pipekit/PipePassword.vue'

const meta = {
  title: 'PipeKit/PipePassword',
  component: PipePassword,
  tags: ['autodocs'],
} satisfies Meta<typeof PipePassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { PipePassword },
    template: '<pipe-password placeholder="Enter password..." />',
  }),
}

export const WithToggleMask: Story = {
  render: () => ({
    components: { PipePassword },
    template: '<pipe-password toggleMask />',
  }),
}

export const NoFeedback: Story = {
  render: () => ({
    components: { PipePassword },
    template: '<pipe-password toggleMask :feedback="false" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { PipePassword },
    data: () => ({ password: 'MySecurePassword123' }),
    template: '<pipe-password v-model="password" toggleMask :feedback="false" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { PipePassword },
    data: () => ({ password: 'disabled' }),
    template: '<pipe-password v-model="password" disabled />',
  }),
}
