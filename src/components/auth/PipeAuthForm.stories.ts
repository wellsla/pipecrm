import type { Meta, StoryObj } from '@storybook/vue3';
import PipeAuthForm from './PipeAuthForm.vue';
import PipeButton from '../ui/button/PipeButton.vue';
import PipeInput from '../ui/input/PipeInput.vue';

const meta = {
  title: 'Auth/Form/PipeAuthForm',
  component: PipeAuthForm,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal do formulário',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo/descrição do formulário',
    },
    heroTitle: {
      control: 'text',
      description: 'Título da hero section (desktop)',
    },
    heroDescription: {
      control: 'text',
      description: 'Descrição da hero section (desktop)',
    },
    showHero: {
      control: 'boolean',
      description: 'Mostrar hero section no desktop',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PipeAuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    title: 'Entrar',
    subtitle: 'Acesse sua conta para continuar usando o PipeCRM',
    showHero: true,
  },
  render: (args) => ({
    components: { PipeAuthForm, PipeButton, PipeInput },
    setup() {
      return { args };
    },
    template: `
      <PipeAuthForm v-bind="args">
        <form class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">
              E-mail
            </label>
            <PipeInput
              id="email"
              type="text"
              placeholder="seu@email.com"
              :conditions="{ fluid: true }"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-2">
              Senha
            </label>
            <PipeInput
              id="password"
              type="password"
              placeholder="Digite sua senha"
              :conditions="{ fluid: true }"
            />
          </div>

          <div class="text-right">
            <button type="button" class="text-sm hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <PipeButton
            id="submit"
            type="submit"
            label="Entrar"
            class="w-full"
          />

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4">
                ou
              </span>
            </div>
          </div>

          <PipeButton
            id="google"
            type="button"
            label="Entrar com Google"
            severity="secondary"
            variant="outlined"
            class="w-full"
            :icon="{ class: 'pi pi-google' }"
          />

          <p class="text-center text-sm">
            Não tem uma conta?
            <button type="button" class="font-medium hover:underline">
              Cadastre-se
            </button>
          </p>
        </form>
      </PipeAuthForm>
    `,
  }),
};

export const Register: Story = {
  args: {
    title: 'Criar conta',
    subtitle: 'Comece a usar o PipeCRM gratuitamente',
    heroTitle: 'Junte-se a milhares de equipes',
    heroDescription: 'Comece hoje e veja sua produtividade decolar',
    showHero: true,
  },
  render: (args) => ({
    components: { PipeAuthForm, PipeButton, PipeInput },
    setup() {
      return { args };
    },
    template: `
      <PipeAuthForm v-bind="args">
        <form class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">
              Nome completo
            </label>
            <PipeInput
              id="name"
              type="text"
              placeholder="João Silva"
              :conditions="{ fluid: true }"
            />
          </div>

          <div>
            <label for="email-reg" class="block text-sm font-medium mb-2">
              E-mail
            </label>
            <PipeInput
              id="email-reg"
              type="text"
              placeholder="seu@email.com"
              :conditions="{ fluid: true }"
            />
          </div>

          <div>
            <label for="password-reg" class="block text-sm font-medium mb-2">
              Senha
            </label>
            <PipeInput
              id="password-reg"
              type="password"
              placeholder="Mínimo 8 caracteres"
              :conditions="{ fluid: true }"
            />
          </div>

          <PipeButton
            id="submit-reg"
            type="submit"
            label="Criar conta"
            class="w-full"
          />

          <p class="text-center text-sm">
            Já tem uma conta?
            <button type="button" class="font-medium text-primary-600 hover:underline dark:text-primary-400">
              Entrar
            </button>
          </p>
        </form>
      </PipeAuthForm>
    `,
  }),
};

export const WithoutHero: Story = {
  args: {
    title: 'Entrar',
    subtitle: 'Acesse sua conta',
    showHero: false,
  },
  render: (args) => ({
    components: { PipeAuthForm, PipeButton, PipeInput },
    setup() {
      return { args };
    },
    template: `
      <PipeAuthForm v-bind="args">
        <form class="space-y-5">
          <div>
            <label for="email-nh" class="block text-sm font-medium mb-2">
              E-mail
            </label>
            <PipeInput
              id="email-nh"
              type="text"
              placeholder="seu@email.com"
              :conditions="{ fluid: true }"
            />
          </div>

          <div>
            <label for="password-nh" class="block text-sm font-medium mb-2">
              Senha
            </label>
            <PipeInput
              id="password-nh"
              type="password"
              placeholder="Digite sua senha"
              :conditions="{ fluid: true }"
            />
          </div>

          <PipeButton
            id="submit-nh"
            type="submit"
            label="Entrar"
            class="w-full"
          />
        </form>
      </PipeAuthForm>
    `,
  }),
};

export const DarkMode: Story = {
  ...Login,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    () => ({
      template: '<div class="dark"><story /></div>',
    }),
  ],
};
