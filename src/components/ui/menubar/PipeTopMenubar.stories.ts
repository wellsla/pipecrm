import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { MenuItem } from 'primevue/menuitem'

import PipeTopMenubar from './PipeTopMenubar.vue'
import PipeButton from '../button/PipeButton.vue'

const meta: Meta<typeof PipeTopMenubar> = {
  title: 'Ui/Menubar/PipeTopMenubar',
  component: PipeTopMenubar,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array de itens do menu',
    },
  },
  args: {
    items: [] as MenuItem[],
  },
  parameters: {
    layout: 'fullscreen',
    slots: {
      start: {
        description: 'Slot para o conteúdo inicial (esquerda)',
      },
      item: {
        description: 'Slot para customizar os itens do menu',
      },
      end: {
        description: 'Slot para o conteúdo final (direita)',
      },
    },
  },
} satisfies Meta<typeof PipeTopMenubar>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const WithItems: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: 'pi pi-chart-bar' },
      { label: 'Negócios', icon: 'pi pi-briefcase' },
    ] as MenuItem[],
  },
  parameters: {
    slots: {
      item: {
        template: `
          <template #item="{ item }">
            <a v-ripple class="flex items-center cursor-pointer">
              <span v-if="item.icon" :class="item.icon"></span>
              <span>{{ item.label }}</span>
            </a>
          </template>
        `,
      },
    },
  },
}

export const WithLogout: Story = {
  parameters: {
    slots: {
      end: {
        components: { PipeButton },
        template: `        
          <PipeButton
            size="small"
            class="ml-2"
            :icon="{ class: 'pi pi-sign-out' }"
            @click="console.log('Logout clicked!')"
          />          
        `,
      },
    },
  },
}
