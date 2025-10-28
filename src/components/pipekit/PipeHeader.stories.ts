import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import PipeHeader from '@/components/pipekit/PipeHeader.vue';

const meta = {
  title: 'PipeKit/PipeHeader',
  component: PipeHeader,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PipeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};
