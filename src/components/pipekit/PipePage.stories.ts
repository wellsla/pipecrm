import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import PipePage from '@/components/pipekit/PipePage.vue'
import PipeHeader from '@/components/pipekit/PipeHeader.vue'

const meta = {
  title: 'PipeKit/PipePage',
  component: PipePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PipePage>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {
  render: () => ({
    components: { PipePage, PipeHeader },
    setup() {
      const user = ref<{ name: string } | null>(null)

      const onLogin = () => {
        user.value = { name: 'Jane Doe' }
      }
      const onLogout = () => {
        user.value = null
      }
      const onCreateAccount = () => {
        user.value = { name: 'Jane Doe' }
      }

      return { user, onLogin, onLogout, onCreateAccount }
    },
    template: `
      <article>
        <pipe-header :user="user" @login="onLogin" @logout="onLogout" @createAccount="onCreateAccount" />
        <pipe-page>
          <h2>Pages in Storybook</h2>
          <p>
            This is an example page layout component. Use <code>&lt;PipePage&gt;</code> 
            as a wrapper for your page content to get consistent styling.
          </p>
          <p>
            Build pages from components and preview them in Storybook.
          </p>
        </pipe-page>
      </article>
    `,
  }),
}

export const LoggedIn: Story = {
  render: () => ({
    components: { PipePage, PipeHeader },
    setup() {
      const user = ref<{ name: string } | null>({ name: 'Jane Doe' })

      const onLogin = () => {
        user.value = { name: 'Jane Doe' }
      }
      const onLogout = () => {
        user.value = null
      }
      const onCreateAccount = () => {
        user.value = { name: 'Jane Doe' }
      }

      return { user, onLogin, onLogout, onCreateAccount }
    },
    template: `
      <article>
        <pipe-header :user="user" @login="onLogin" @logout="onLogout" @createAccount="onCreateAccount" />
        <pipe-page>
          <h2>Welcome Back!</h2>
          <p>
            You are now logged in. This page demonstrates how <code>&lt;PipePage&gt;</code> 
            can wrap different content based on user state.
          </p>
          <p>
            The PipePage component provides consistent styling across all pages.
          </p>
        </pipe-page>
      </article>
    `,
  }),
}
