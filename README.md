# PipeCRM

A modern CRM application built with Vue 3, TypeScript, and PrimeVue following feature-first architecture.

## Tech Stack

### Core
- **Vue 3** (Options API) - Progressive JavaScript framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### State & Routing
- **Pinia** - State management (stores organized by domain/feature)
- **Vue Router** - Client-side routing (feature-based routes with minimal guards)

### UI & Design System
- **PrimeVue + PrimeIcons** - UI component library (Lara theme + custom tokens)
- **PipeKit** - Custom PrimeVue wrappers documented in Storybook (stories colocated next to components)
- **ESLint + Prettier** - Code linting and formatting
- **Husky + lint-staged** - Pre-commit hooks
- **Conventional Commits** - Standardized commit messages
- **Vitest** - Unit testing with browser mode

## Architecture Principles

- **Service** - API communication layer
- **Components** - Feature-specific components

### Layer Separation
- **UI Layer** - Components (presentational, isolated)
- **State Layer** - Pinia stores (business logic, state management)
- **API Layer** - Services (HTTP requests, data transformation)

### Developer Experience
- **Path Aliases** - `@/*` for clean imports
- **Standardized Scripts** - Consistent npm commands
- **Pre-commit Hooks** - Automated linting and formatting
- **Type Safety** - Full TypeScript coverage

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm (or pnpm/yarn)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Storybook (PipeKit Design System)

View and test components in isolation:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006/`

Stories are colocated with PipeKit components under `src/components/pipekit` using `*.stories.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Lint and auto-fix code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run storybook` | Start Storybook dev server |
| `npm run build-storybook` | Build Storybook for deployment |
| `npm run prepare` | Setup Husky git hooks |

### Quality Assurance Commands

```bash
# Run linting
npm run lint

# Format all files
npm run format

# Type checking
npm run type-check

# Run all checks (before committing)
npm run lint && npm run format && npm run type-check
```

### Husky & Lint-Staged

Pre-commit hooks are automatically configured via Husky. To manually trigger:

```bash
# Initialize Husky (runs automatically after npm install)
npm run prepare

# Test lint-staged manually
npx lint-staged

# Skip pre-commit hooks (not recommended)
git commit --no-verify -m "commit message"
```

**What runs on commit:**
- ESLint auto-fix on `.ts, .tsx, .vue, .js, .jsx, .json, .md, .css, .scss` files
- Prettier formatting on staged files
- Stylelint fix on `.css` files


## Project Structure

```
pipecrm/
├── src/
│   ├── app/                    # Application core
│   │   ├── layouts/            # Layout components
│   │   └── App.vue             # Root component
│   ├── features/               # Feature modules (feature-first)
│   │   └── [feature]/
│   │       ├── views/          # Feature pages
│   │       ├── store/          # Pinia stores
│   │       ├── services/       # API services
│   │       └── components/     # Feature components
│   ├── components/
│   │   └── pipekit/            # PipeKit Design System (PrimeVue wrappers)
│   │       ├── PipeButton.vue
│   │       ├── PipeHeader.vue
│   │       ├── PipePage.vue
│   │       ├── PipeMenubar.vue
│   │       ├── PipePanelMenu.vue
│   │       ├── PipeInput.vue
│   │       ├── PipePassword.vue
│   │       ├── button.css header.css page.css
│   │       └── Pipe*.stories.ts
│   ├── router/                 # Vue Router configuration
│   └── stores/                 # Global Pinia stores
├── public/                     # Static assets
└── .storybook/                 # Storybook configuration
```

## Design System (PipeKit)

PipeKit is our custom design system built on top of PrimeVue, providing:
- Consistent component wrappers
- Custom theme tokens (Lara base)
- Full Storybook documentation
- Accessibility compliance

### Color Palette

- **Primary Dark**: `#3A4B59` - Main text and UI elements
- **Secondary Gray**: `#B3B4BC` - Borders and dividers
- **Background Light**: `#FEFFF4` - Page backgrounds
- **Accent Red**: `#B8284B` - CTAs and highlights
- **Deep Blue**: `#243747` - Headings and emphasis

## Development Workflow

### Quick Start Commands

```bash
# Fresh setup
npm install
npm run dev

# With Storybook
npm run storybook

# Production build
npm run build
npm run preview
```

### Commit Convention

This project follows [Padrões de Commits](https://github.com/iuricode/padroes-de-commits):

```bash
# Feature
git commit -m ":sparkles: feat: add new customer form"

# Bug fix
git commit -m ":bug: fix: resolve login validation bug"

# Documentation
git commit -m ":books: docs: update API documentation"

# Code style
git commit -m ":ok_hand: style: format code with prettier"

# Refactoring
git commit -m ":recycle: refactor: reorganize store structure"

# Tests
git commit -m ":test_tube: test: add unit tests for user service"

# Configuration/dependencies
git commit -m ":wrench: chore: update dependencies"

# Performance
git commit -m ":zap: perf: optimize data fetching"

# Work in progress
git commit -m ":construction: wip: implementing authentication flow"
```

### Git Workflow (GitFlow)

This project follows the GitFlow branching model with standard git commands.

#### Branch Structure

- **main** - Production-ready code
- **develop** - Integration branch for features
- **feature/** - New features (`feature/feature-name`)
- **bugfix/** - Bug fixes for develop (`bugfix/bug-name`)
- **hotfix/** - Urgent production fixes (`hotfix/issue-name`)
- **release/** - Release preparation (`release/version`)

#### Feature Development

```bash
# Start new feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/customer-management

# Work on feature (commits run pre-commit hooks automatically)
git add .
git commit -m ":sparkles: feat: add customer list view"
git commit -m ":sparkles: feat: add customer form validation"

# Keep feature updated with develop
git checkout develop
git pull origin develop
git checkout feature/customer-management
git merge develop

# Push feature branch
git push origin feature/customer-management

# After PR approval, merge to develop (via PR or locally)
git checkout develop
git pull origin develop
git merge --no-ff feature/customer-management
git push origin develop

# Delete feature branch
git branch -d feature/customer-management
git push origin --delete feature/customer-management
```

#### Bugfix Workflow

```bash
# Create bugfix from develop
git checkout develop
git pull origin develop
git checkout -b bugfix/login-validation

# Fix and commit
git add .
git commit -m ":bug: fix: correct email validation regex"

# Merge back to develop
git checkout develop
git merge --no-ff bugfix/login-validation
git push origin develop

# Clean up
git branch -d bugfix/login-validation
```

#### Hotfix Workflow

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-patch

# Fix and commit
git add .
git commit -m ":bug: fix: patch security vulnerability"

# Merge to main
git checkout main
git merge --no-ff hotfix/critical-security-patch
git tag -a v1.0.1 -m "Security patch v1.0.1"
git push origin main --tags

# Also merge to develop
git checkout develop
git merge --no-ff hotfix/critical-security-patch
git push origin develop

# Clean up
git branch -d hotfix/critical-security-patch
```

#### Release Workflow

```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# Prepare release (version bumps, changelog, etc.)
git commit -m ":bookmark: chore: bump version to 1.0.0"
git commit -m ":books: docs: update CHANGELOG for v1.0.0"

# Merge to main
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge --no-ff release/1.0.0
git push origin develop

# Delete release branch
git branch -d release/1.0.0
```

#### Quick Reference

```bash
# Check current branch
git branch

# View all branches
git branch -a

# Switch branches
git checkout branch-name

# View commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Stash changes temporarily
git stash
git stash pop

# Skip hooks only in emergencies
git commit --no-verify -m "message"
```


### Pre-commit Hooks

Automated checks before each commit:
- **ESLint** - Lints and auto-fixes JS/TS/Vue files
- **Prettier** - Formats code consistently
- **Stylelint** - Lints and fixes CSS/SCSS
- **Type checking** - Validates TypeScript (manual check recommended)

**Configured via lint-staged:**
```json
{
  "*.{ts,tsx,vue,js,jsx,json,md,css,scss}": ["eslint --fix", "prettier --write"],
  "*.css": "stylelint --fix"
}
```


## IDE Setup

**Recommended:**
- [VS Code](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) browser extension

## License

Private project

