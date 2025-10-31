import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PipeInput from '@/components/pipekit/PipeInput.vue'

const meta = {
  title: 'PipeKit/PipeInput',
  component: PipeInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PipeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { PipeInput },
    template: '<pipe-input placeholder="Enter text..." />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { PipeInput },
    data: () => ({ value: 'Sample input text' }),
    template: '<pipe-input v-model="value" placeholder="Enter text..." />',
  }),
}

export const Email: Story = {
  render: () => ({
    components: { PipeInput },
    template: '<pipe-input placeholder="you@company.com" type="email" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { PipeInput },
    data: () => ({ value: 'Disabled input' }),
    template: '<pipe-input v-model="value" disabled />',
  }),
}
