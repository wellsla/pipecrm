# PipeCRM

> Modern mini CRM built with Vue 3, TypeScript and PrimeVue

[🇧🇷 Versão em Português](./README.md)

## 🚀 Tech Stack

- **Vue 3** + **TypeScript** - Reactive framework with strong typing
- **Vite** - Lightning-fast build tool and dev server
- **Pinia** - Simple and intuitive state management
- **Vue Router** - Client-side routing
- **PrimeVue** - Enterprise UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (authentication + REST API)
- **Zod** - TypeScript-first schema validation
- **Sentry** - Monitoring and observability
- **Storybook** - Component documentation

## 📋 Prerequisites

- Node.js 20+ or 22+
- npm

## 🛠️ Installation

```bash
npm install
```

## 💻 Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint and format
npm run lint
npm run format

# Storybook
npm run storybook
```

## 📁 Project Structure

```
src/
├── assets/           # Global styles and design tokens
├── components/       # Reusable components
│   ├── header/
│   └── ui/          # Design system (+ Storybook stories)
├── composables/     # Vue composables
├── router/          # Route configuration
├── services/        # API services
├── stores/          # Pinia stores
└── views/           # Application pages
    ├── auth/
    ├── features/
    └── layouts/
```

## 🎨 Design System

### Color Palette

**Light Mode:**

- Primary: `#a02842`
- Secondary: `#607d8b`
- Background: `#ffffff`

**Dark Mode:**

- Primary: `#d94771`
- Secondary: `#37474f`
- Background: `#3a4b59`

## 🔄 CI/CD

Automated GitHub Actions:

- **Lint** - Code verification on every push
- **Build** - Compilation and artifacts
- **Deploy** - Automatic deployment on `main` branch

## 📝 Commit Convention

```bash
:sparkles: feat: new feature
:bug: fix: bug fix
:recycle: refactor: code refactoring
:books: docs: documentation
:wrench: chore: configuration/dependencies
```

## 🌐 Branches

- `main` - Production
- `develop` - Development
- `feature/*` - New features

## 🔧 Recommended IDE

- VS Code
- Extensions: Vue - Official, ESLint, Prettier, Tailwind CSS IntelliSense

## 📄 License

Public project inspired by [PipeRunCRM](https://crmpiperun.com/)
