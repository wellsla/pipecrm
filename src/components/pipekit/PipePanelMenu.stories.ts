import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { MenuItem } from 'primevue/menuitem'

import PipePanelMenu from '@/components/pipekit/PipePanelMenu.vue'

const meta = {
  title: 'PipeKit/PipePanelMenu',
  component: PipePanelMenu,
  tags: ['autodocs'],
  argTypes: {
    model: {
      description: 'Array of menu items to display in the panel',
      control: 'object',
    },
  },
} satisfies Meta<typeof PipePanelMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    model: [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
      },
      {
        label: 'Contacts',
        icon: 'pi pi-users',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
    ] as MenuItem[],
  },
}

export const SalesMenu: Story = {
  args: {
    model: [
      {
        label: 'Sales',
        icon: 'pi pi-chart-bar',
        items: [
          {
            label: 'Leads',
            icon: 'pi pi-user-plus',
          },
          {
            label: 'Opportunities',
            icon: 'pi pi-dollar',
          },
          {
            label: 'Proposals',
            icon: 'pi pi-file',
          },
          {
            label: 'Contracts',
            icon: 'pi pi-file-check',
          },
        ],
      },
      {
        label: 'Support',
        icon: 'pi pi-question-circle',
        items: [
          {
            label: 'Tickets',
            icon: 'pi pi-ticket',
          },
          {
            label: 'Knowledge Base',
            icon: 'pi pi-book',
          },
        ],
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-pie',
        items: [
          {
            label: 'Sales Report',
            icon: 'pi pi-chart-line',
          },
          {
            label: 'Performance',
            icon: 'pi pi-gauge',
          },
        ],
      },
    ] as MenuItem[],
  },
}

export const NestedMenu: Story = {
  args: {
    model: [
      {
        label: 'CRM',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Sales',
            icon: 'pi pi-chart-bar',
            items: [
              {
                label: 'Leads',
                icon: 'pi pi-user-plus',
              },
              {
                label: 'Opportunities',
                icon: 'pi pi-dollar',
              },
            ],
          },
          {
            label: 'Marketing',
            icon: 'pi pi-megaphone',
            items: [
              {
                label: 'Campaigns',
                icon: 'pi pi-envelope',
              },
              {
                label: 'Analytics',
                icon: 'pi pi-chart-line',
              },
            ],
          },
        ],
      },
      {
        label: 'Automation',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Workflows',
            icon: 'pi pi-sitemap',
          },
          {
            label: 'Tasks',
            icon: 'pi pi-check-square',
          },
        ],
      },
    ] as MenuItem[],
  },
}

export const WithActions: Story = {
  args: {
    model: [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          alert('Navigate to Dashboard')
        },
      },
      {
        label: 'Contacts',
        icon: 'pi pi-users',
        items: [
          {
            label: 'View All',
            icon: 'pi pi-list',
            command: () => {
              alert('View All Contacts')
            },
          },
          {
            label: 'Add New',
            icon: 'pi pi-plus',
            command: () => {
              alert('Add New Contact')
            },
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          alert('Open Settings')
        },
      },
    ] as MenuItem[],
  },
}
