import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { MenuItem } from 'primevue/menuitem'

import PipeTopMenubar from './PipeTopMenubar.vue'
import PipeButton from '../button/PipeButton.vue'

const meta = {
  title: 'Ui/Menubar/PipeTopMenubar',
  component: PipeTopMenubar,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array de itens do menu',
      // itemTypes: {
      //   label: { controls: ['text', 'function'] },
      //   icon: { control: 'text' },
      //   command: { control: 'function', action: 'command' },
      //   url: { control: 'text' },
      //   items: { control: 'object' },
      //   disabled: { controls: ['boolean', 'function'] },
      //   visible: { controls: ['boolean', 'function'] },
      //   target: { control: 'text' },
      //   separator: { control: 'boolean' },
      //   style: { control: 'object' },
      //   class: { control: 'text' },
      //   key: { control: 'text' },
      // },
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
          <PipeTopMenubar :items="args.items">
            <template #item="{ item }">
              <a v-ripple class="flex items-center cursor-pointer">
                <span v-if="item.icon" :class="item.icon"></span>
                <span>{{ item.label }}</span>
              </a>
            </template>
          </PipeTopMenubar>
      `,
      },
    },
  },
}

export const WithLogout: Story = {
  args: {
    items: [] as MenuItem[],
  },
  parameters: {
    slots: {
      end: {
        components: { PipeButton },
        template: `
          <PipeTopMenubar :items="args.items">
            <template #end>
              <PipeButton
                size="small"
                class="ml-2"
                icon="pi pi-sign-out"
                @click="console.log('Logout clicked!')"
              />
            </template>
          </PipeTopMenubar>
        `,
      },
    },
  },
}
