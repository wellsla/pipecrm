# PipeCRM

> Modern Mini CRM built with Vue 3, TypeScript and PrimeVue

[🇧🇷 Versão em Português](./README.md)

---

## 🚀 Tech Stack

### Frontend Framework

- **Vue 3** + **TypeScript** - Reactive framework with Composition API and strong typing
- **Vite** - Modern build tool with ultra-fast HMR

### State Management & Routing

- **Pinia** - Official Vue 3 store pattern
- **Vue Router** - SPA routing with guards and lazy loading

### UI/UX

- **PrimeVue 4** - Enterprise component library with design tokens
- **@primeuix/themes** - PrimeVue theming system (Lara preset)
- **PrimeIcons** - Official icon set
- **Tailwind CSS 4** - Utility CSS framework (layout/spacing)
- **tailwindcss-primeui** - PrimeVue + Tailwind integration

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
  - Authentication (email/password, OAuth, MFA)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions

### Validation & Error Handling

- **Zod** - TypeScript-first schema validation
- **Axios** - HTTP client with interceptors
- **Sentry** - Error and performance monitoring

### Developer Experience

- **Storybook** - Component documentation and isolated testing
- **ESLint** + **Prettier** - Code linting and formatting
- **Yarn 4** - Modern package manager

## ✨ Features

- ✅ Complete authentication (login, register, password recovery, Google OAuth)
- ✅ Consistent design system with semantic tokens
- ✅ Dark mode with persistence
- ✅ Form validation with Zod
- ✅ Centralized error handling
- ✅ Components documented in Storybook
- ✅ Scalable and organized architecture
- ✅ TypeScript throughout the project
- ✅ Mobile-first responsive

## 📋 Prerequisites

- Node.js 20+ or 22+
- Yarn 4+

## 🛠️ Installation

```bash
yarn install
```

## 💻 Available Scripts

```bash
# Development server (localhost:5173)
yarn dev

# Production build
yarn build

# Build preview
yarn preview

# Lint and format
yarn lint
yarn format

# Storybook (localhost:6006)
yarn storybook

# Storybook build
yarn build-storybook
```

## 🔧 Supabase Setup

```bash
# Supabase login
npx supabase login

# Generate TypeScript types from schema
npx supabase gen types typescript --project-id "your-project-id" > src/core/db/supabase.types.ts

# Apply migrations (via Supabase Dashboard SQL Editor)
# Copy the content from files in src/db/migrations/ and execute in SQL Editor
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🌙 Dark Mode

Automatic toggle via `PipeHeader`:

- Sun/moon button visible in header
- Persistence in `localStorage`
- `.dark` class on `<html>`
- Colors automatically adjusted via CSS tokens

## 📁 Project Structure

```text
src/
├── assets/              # Design system and global styles
│   ├── tokens.css           # Design tokens (colors, surfaces, text)
│   └── pipe-preset.ts       # Custom PrimeVue preset
│
├── components/          # Reusable components
│   ├── header/              # PipeHeader (navigation + dark mode)
│   └── ui/                  # Componentized design system
│       ├── auth-form/           # PipeAuthForm + Storybook stories
│       ├── button/              # PipeButton + Storybook stories
│       ├── inline-message/      # PipeInlineMessage + Storybook stories
│       ├── input/               # PipeInput + Storybook stories
│       ├── menubar/             # PipeTopMenubar + Storybook stories
│       └── message/             # PipeMessage + Storybook stories
│
├── composables/         # Vue composables (reusable logic)
│   ├── useAsyncAction.ts    # Async action management
│   └── useFormState.ts      # Form state
│
├── db/                  # SQL migrations
│   └── migrations/          # Database SQL migrations
│
├── core/                # Core infrastructure
│   ├── db/                  # Supabase client and types
│   │   ├── supabase.client.ts   # Supabase singleton client
│   │   ├── supabase.types.ts    # Generated schema types
│   │   └── SCHEMA.md            # Schema documentation
│   └── errors/              # Centralized error handling
│       ├── error.tracking.ts    # Sentry integration
│       ├── app/                 # AppError types and mapping
│       ├── form/                # Validation helpers
│       ├── supabase/            # Supabase error mapping
│       ├── unknown/             # Unknown error mapping
│       └── zod/                 # Zod error mapping
│
├── router/              # Route configuration
│   └── index.ts             # Router config + navigation guards
│
├── services/            # Service layer (API calls)
│   ├── auth/                # Authentication service
│   │   ├── auth.service.ts      # Auth logic (Supabase)
│   │   ├── auth.schemas.ts      # Zod schemas (validation)
│   │   └── auth.types.ts        # TypeScript interfaces
│   └── errors/              # Error mapping services
│       ├── error.mapper.ts      # Centralized mapping
│       └── error.tracking.ts    # Error tracking
│
├── stores/              # Pinia stores (state management)
│   ├── auth/                # Auth store (user, session)
│   │   └── auth.store.ts
│   └── modules/             # Feature stores
│
├── views/               # Application pages
│   ├── auth/                # Authentication screens
│   │   ├── AuthCallbackView.vue
│   │   ├── ForgotPasswordView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── ResetPasswordView.vue
│   │   └── TwoFactorView.vue
│   ├── layouts/             # Global layouts
│   │   ├── DefaultLayout.vue    # Authenticated layout
│   │   └── PublicLayout.vue     # Public layout
│   ├── home/                # Dashboard
│   │   └── HomeView.vue
│   └── modules/             # Feature views
│
├── App.vue              # Root component
└── main.ts              # Entry point (Sentry, Pinia, Router, PrimeVue)
```

## 🎨 Design System

### Token Architecture (3 layers)

#### 1. Primitive Tokens (`tokens.css`)

Defines base color palettes:

- **Magenta** - Brand primary color
- **Neutrals** - Gray scale
- **Danger** - Error/alert colors
- **Surfaces** - Backgrounds and borders
- **Text** - Text hierarchy

#### 2. Semantic Tokens (`pipe-preset.ts`)

Maps colors to contexts:

- `{primary.*}` → magenta (brand colors)
- `{danger.*}` → danger palette (errors)
- `{neutral.*}` → neutrals (backgrounds)
- `{surface.*}` → surfaces (cards, borders)
- `{text.*}` → text hierarchy

#### 3. Component Tokens (`pipe-preset.ts`)

Component-specific PrimeVue customizations.

### Responsibilities

#### tokens.css + pipe-preset.ts

- ✅ Primitive tokens (color palettes)
- ✅ Semantic tokens (primary, danger, surface, text)
- ✅ Component tokens (PrimeVue customizations)
- ✅ Semantic helper classes (`.text-danger`, `.surface-card`)

#### Tailwind CSS

- ✅ Layout (flex, grid, position)
- ✅ Spacing (padding, margin, gap)
- ✅ Borders (border-width, border-radius)
- ✅ Shadows, transitions, responsiveness
- ❌ **DO NOT** use for component colors (use semantic tokens)

## 🧱 Architecture

### Principles

- **SOLID** - Single responsibility, dependency inversion
- **DRY** - Don't Repeat Yourself
- **Clean Architecture** - Layer separation (UI, Services, Core)
- **Type Safety** - 100% TypeScript code
- **Error Handling** - Centralized error system with AppError

### Patterns

- **Composition API** - Vue 3 setup script
- **Composables** - Reusable logic
- **Store Pattern** - Pinia for global state
- **Service Layer** - Business logic separation
- **Schema Validation** - Zod for runtime validation

## 📝 Commit Convention

```bash
:sparkles: feat: new feature
:bug: fix: bug fix
:recycle: refactor: code refactoring
:lipstick: style: style/formatting changes
:books: docs: documentation
:white_check_mark: test: tests
:wrench: chore: configuration/dependencies
:rocket: deploy: deployment
```

Based on [Commit Standards](https://github.com/iuricode/padroes-de-commits).

## 🌐 Branch Strategy

- `main` - Production (automatic deploy)
- `develop` - Development
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Refactoring

## 🔧 Recommended IDE

**VS Code** with extensions:

- Vue - Official (Volar)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Error Lens

## 🙌 Inspiration

This project is inspired by the products from PipeRun. Learn more at: [crmpiperun.com](https://crmpiperun.com/)

## 📄 License

Open source educational project.
