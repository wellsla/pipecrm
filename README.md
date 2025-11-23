# PipeCRM

> Mini CRM moderno construído com Vue 3, TypeScript e PrimeVue

[🇺🇸 English Version](./README-en.md)

---

## 🚀 Stack Tecnológica

### Frontend Framework

- **Vue 3** + **TypeScript** - Framework reativo com Composition API e tipagem forte
- **Vite** - Build tool moderno com HMR ultra-rápido

### State Management & Routing

- **Pinia** - Store pattern oficial do Vue 3
- **Vue Router** - Roteamento SPA com guards e lazy loading

### UI/UX

- **PrimeVue 4** - Biblioteca de componentes enterprise com design tokens
- **@primeuix/themes** - Sistema de temas PrimeVue (Lara preset)
- **PrimeIcons** - Conjunto de ícones oficial
- **Tailwind CSS 4** - Framework CSS utilitário (layout/espaçamento)
- **tailwindcss-primeui** - Integração PrimeVue + Tailwind

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
  - Autenticação (email/password, OAuth, MFA)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions

### Validation & Error Handling

- **Zod** - Schema validation TypeScript-first
- **Axios** - Cliente HTTP com interceptors
- **Sentry** - Monitoramento de erros e performance

### Developer Experience

- **Storybook** - Documentação e testes de componentes isolados
- **ESLint** + **Prettier** - Linting e formatação de código
- **Yarn 4** - Gerenciador de pacotes moderno

## ✨ Funcionalidades

- ✅ Autenticação completa (login, registro, recuperação de senha, OAuth Google)
- ✅ Sistema de design consistente com tokens semânticos
- ✅ Dark mode com persistência
- ✅ Validação de formulários com Zod
- ✅ Tratamento centralizado de erros
- ✅ Componentes documentados no Storybook
- ✅ Arquitetura escalável e organizada
- ✅ TypeScript em todo o projeto
- ✅ Responsivo mobile-first

## 📋 Pré-requisitos

- Node.js 20+ ou 22+
- Yarn 4+

## 🛠️ Instalação

```bash
yarn install
```

## 💻 Scripts Disponíveis

```bash
# Servidor de desenvolvimento (localhost:5173)
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview

# Lint e formatação
yarn lint
yarn format

# Storybook (localhost:6006)
yarn storybook

# Build do Storybook
yarn build-storybook
```

## 🔧 Configuração Supabase

```bash
# Login no Supabase
npx supabase login

# Gerar types TypeScript do schema
npx supabase gen types typescript --project-id "your-project-id" > src/core/db/supabase.types.ts
```

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🌙 Dark Mode

Toggle automático via `PipeHeader`:

- Botão sol/lua visível no header
- Persistência no `localStorage`
- Classe `.dark` no `<html>`
- Cores ajustadas automaticamente via tokens CSS

## 📁 Estrutura do Projeto

```text
src/
├── assets/              # Design system e estilos globais
│   ├── tokens.css           # Design tokens (cores, superfícies, texto)
│   └── pipe-preset.ts       # PrimeVue preset customizado
│
├── components/          # Componentes reutilizáveis
│   ├── header/              # PipeHeader (navegação + dark mode)
│   └── ui/                  # Sistema de design componentizado
│       ├── auth-form/           # PipeAuthForm + Storybook stories
│       ├── button/              # PipeButton + Storybook stories
│       ├── inline-message/      # PipeInlineMessage + Storybook stories
│       ├── input/               # PipeInput + Storybook stories
│       ├── menubar/             # PipeTopMenubar + Storybook stories
│       └── message/             # PipeMessage + Storybook stories
│
├── composables/         # Vue composables (lógica reutilizável)
│   ├── useAsyncAction.ts    # Gerenciamento de ações assíncronas
│   └── useFormState.ts      # Estado de formulários
│
├── core/                # Infraestrutura central
│   ├── db/                  # Supabase client e types
│   │   ├── supabase.client.ts   # Cliente Supabase singleton
│   │   ├── supabase.types.ts    # Types gerados do schema
│   │   ├── SCHEMA.md            # Documentação do schema
│   │   └── migrations/          # SQL migrations
│   └── errors/              # Error handling centralizado
│       ├── error.tracking.ts    # Sentry integration
│       ├── app/                 # AppError types e mapping
│       ├── form/                # Validation helpers
│       ├── supabase/            # Supabase error mapping
│       ├── unknown/             # Unknown error mapping
│       └── zod/                 # Zod error mapping
│
├── router/              # Configuração de rotas
│   └── index.ts             # Router config + navigation guards
│
├── services/            # Camada de serviços (API calls)
│   ├── auth/                # Serviço de autenticação
│   │   ├── auth.service.ts      # Lógica de auth (Supabase)
│   │   ├── auth.schemas.ts      # Schemas Zod (validação)
│   │   └── auth.types.ts        # TypeScript interfaces
│   └── errors/              # Error mapping services
│       ├── error.mapper.ts      # Mapeamento centralizado
│       └── error.tracking.ts    # Tracking de erros
│
├── stores/              # Pinia stores (state management)
│   ├── auth/                # Auth store (user, session)
│   │   └── auth.store.ts
│   └── modules/             # Feature stores
│
├── views/               # Páginas da aplicação
│   ├── auth/                # Telas de autenticação
│   │   ├── AuthCallbackView.vue
│   │   ├── ForgotPasswordView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── ResetPasswordView.vue
│   │   └── TwoFactorView.vue
│   ├── layouts/             # Layouts globais
│   │   ├── DefaultLayout.vue    # Layout autenticado
│   │   └── PublicLayout.vue     # Layout público
│   ├── home/                # Dashboard
│   │   └── HomeView.vue
│   └── modules/             # Feature views
│
├── App.vue              # Root component
└── main.ts              # Entry point (Sentry, Pinia, Router, PrimeVue)
```

## 🎨 Sistema de Design

### Arquitetura de Tokens (3 camadas)

#### 1. Primitive Tokens (`tokens.css`)

Define paletas de cores base:

- **Magenta** - Cor primária da marca
- **Neutrals** - Escala de cinzas
- **Danger** - Cores de erro/alerta
- **Surfaces** - Backgrounds e bordas
- **Text** - Hierarquia de texto

#### 2. Semantic Tokens (`pipe-preset.ts`)

Mapeia cores para contextos:

- `{primary.*}` → magenta (brand colors)
- `{danger.*}` → danger palette (errors)
- `{neutral.*}` → neutrals (backgrounds)
- `{surface.*}` → surfaces (cards, borders)
- `{text.*}` → text hierarchy

#### 3. Component Tokens (`pipe-preset.ts`)

Customizações específicas por componente PrimeVue.

### Responsabilidades

#### tokens.css + pipe-preset.ts

- ✅ Primitive tokens (paleta de cores)
- ✅ Semantic tokens (primary, danger, surface, text)
- ✅ Component tokens (customizações PrimeVue)
- ✅ Helper classes semânticas (`.text-danger`, `.surface-card`)

#### Tailwind CSS

- ✅ Layout (flex, grid, position)
- ✅ Espaçamento (padding, margin, gap)
- ✅ Bordas (border-width, border-radius)
- ✅ Sombras, transitions, responsiveness
- ❌ **NÃO** usar para cores de componentes (usar tokens semânticos)

## 🧱 Arquitetura

### Princípios

- **SOLID** - Responsabilidade única, inversão de dependência
- **DRY** - Don't Repeat Yourself
- **Clean Architecture** - Separação de camadas (UI, Services, Core)
- **Type Safety** - TypeScript em 100% do código
- **Error Handling** - Sistema centralizado de erros com AppError

### Padrões

- **Composition API** - Vue 3 setup script
- **Composables** - Lógica reutilizável
- **Store Pattern** - Pinia para estado global
- **Service Layer** - Separação de lógica de negócio
- **Schema Validation** - Zod para validação runtime

## 📝 Convenção de Commits

```bash
:sparkles: feat: nova funcionalidade
:bug: fix: correção de bug
:recycle: refactor: refatoração de código
:lipstick: style: mudanças de estilo/formatação
:books: docs: documentação
:white_check_mark: test: testes
:wrench: chore: configuração/dependências
:rocket: deploy: deploy
```

Baseado nos [Padrões de Commits](https://github.com/iuricode/padroes-de-commits).

## 🌐 Estratégia de Branches

- `main` - Produção (deploy automático)
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `refactor/*` - Refatorações

## 🔧 IDE Recomendado

**VS Code** com extensões:

- Vue - Official (Volar)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Error Lens

## 🙌 Inspiração

Este projeto é inspirado nos produtos da empresa PipeRun. Saiba mais em: [crmpiperun.com](https://crmpiperun.com/)

## 📄 Licença

Projeto educacional de código aberto.

---

**Desenvolvido com ❤️ usando Vue 3 + TypeScript + PrimeVue**
