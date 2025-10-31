import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { MenuItem } from 'primevue/menuitem'

import PipeMenubar from '@/components/pipekit/PipeMenubar.vue'

const meta = {
  title: 'PipeKit/PipeMenubar',
  component: PipeMenubar,
  tags: ['autodocs'],
  argTypes: {
    model: {
      description: 'Array of menu items to display',
      control: 'object',
    },
  },
} satisfies Meta<typeof PipeMenubar>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    model: [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ] as MenuItem[],
  },
}

export const WithSubmenu: Story = {
  args: {
    model: [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
          },
          {
            label: 'Open',
            icon: 'pi pi-folder-open',
          },
          {
            separator: true,
          },
          {
            label: 'Exit',
            icon: 'pi pi-times',
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Undo',
            icon: 'pi pi-replay',
          },
          {
            label: 'Redo',
            icon: 'pi pi-refresh',
          },
        ],
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
      },
    ] as MenuItem[],
  },
}

export const WithActions: Story = {
  args: {
    model: [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        command: () => {
          alert('Navigate to Dashboard')
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
              alert('Open Profile Settings')
            },
          },
          {
            label: 'Security',
            icon: 'pi pi-lock',
            command: () => {
              alert('Open Security Settings')
            },
          },
        ],
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          alert('Logout clicked')
        },
      },
    ] as MenuItem[],
  },
}
