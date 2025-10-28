import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import MyPage from '@/components/MyPage.vue';
import MyHeader from '@/components/MyHeader.vue';

const meta = {
  title: 'Pages/MyPage',
  component: MyPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  render: () => ({
    components: { MyPage, MyHeader },
    setup() {
      const user = ref<{ name: string } | null>(null);
      
      const onLogin = () => {
        user.value = { name: 'Jane Doe' };
      };
      const onLogout = () => {
        user.value = null;
      };
      const onCreateAccount = () => {
        user.value = { name: 'Jane Doe' };
      };
      
      return { user, onLogin, onLogout, onCreateAccount };
    },
    template: `
      <article>
        <my-header :user="user" @login="onLogin" @logout="onLogout" @createAccount="onCreateAccount" />
        <my-page>
          <h2>Pages in Storybook</h2>
          <p>
            This is an example page layout component. Use <code>&lt;MyPage&gt;</code> 
            as a wrapper for your page content to get consistent styling.
          </p>
          <p>
            Build pages from components and preview them in Storybook.
          </p>
        </my-page>
      </article>
    `,
  }),
};

export const LoggedIn: Story = {
  render: () => ({
    components: { MyPage, MyHeader },
    setup() {
      const user = ref<{ name: string } | null>({ name: 'Jane Doe' });
      
      const onLogin = () => {
        user.value = { name: 'Jane Doe' };
      };
      const onLogout = () => {
        user.value = null;
      };
      const onCreateAccount = () => {
        user.value = { name: 'Jane Doe' };
      };
      
      return { user, onLogin, onLogout, onCreateAccount };
    },
    template: `
      <article>
        <my-header :user="user" @login="onLogin" @logout="onLogout" @createAccount="onCreateAccount" />
        <my-page>
          <h2>Welcome Back!</h2>
          <p>
            You are now logged in. This page demonstrates how <code>&lt;MyPage&gt;</code> 
            can wrap different content based on user state.
          </p>
          <p>
            The MyPage component provides consistent styling across all pages.
          </p>
        </my-page>
      </article>
    `,
  }),
};
