# PipeCRM

> Mini CRM moderno construído com Vue 3, TypeScript e PrimeVue

[🇺🇸 English Version](./README-en.md)

## 🚀 Stack Tecnológica

- **Vue 3** + **TypeScript** - Framework reativo com tipagem forte
- **Vite** - Build tool e dev server ultra-rápido
- **Pinia** - Gerenciamento de estado simples e intuitivo
- **Vue Router** - Roteamento client-side
- **PrimeVue** - Biblioteca de componentes UI enterprise
- **Tailwind CSS** - Framework CSS utilitário
- **Supabase** - Backend as a Service (autenticação + API REST)
- **Zod** - Validação de schemas TypeScript-first
- **Sentry** - Monitoramento e observabilidade
- **Storybook** - Documentação de componentes

## 📋 Pré-requisitos

- Node.js 20+ ou 22+
- npm

## 🛠️ Instalação

```bash
npm install
```

## 💻 Desenvolvimento

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint e formatação
npm run lint
npm run format

# Storybook
npm run storybook
```

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Estilos globais e tokens de design
├── components/       # Componentes reutilizáveis
│   ├── header/
│   └── ui/          # Sistema de design (+ Storybook stories)
├── composables/     # Composables Vue
├── router/          # Configuração de rotas
├── services/        # Serviços de API
├── stores/          # Stores Pinia
└── views/           # Páginas da aplicação
    ├── auth/
    ├── features/
    └── layouts/
```

## 🎨 Sistema de Design

### Paleta de Cores

**Light Mode:**

- Primary: `#a02842`
- Secondary: `#607d8b`
- Background: `#ffffff`

**Dark Mode:**

- Primary: `#d94771`
- Secondary: `#37474f`
- Background: `#3a4b59`

## 🔄 CI/CD

GitHub Actions automatizado:

- **Lint** - Verificação de código em cada push
- **Build** - Compilação e artefatos
- **Deploy** - Deploy automático na branch `main`

## 📝 Convenção de Commits

```bash
:sparkles: feat: nova funcionalidade
:bug: fix: correção de bug
:recycle: refactor: refatoração de código
:books: docs: documentação
:wrench: chore: configuração/dependências
```

## 🌐 Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades

## 🔧 IDE Recomendado

- VS Code
- Extensões: Vue - Official, ESLint, Prettier, Tailwind CSS IntelliSense

## 📄 Licença

Projeto público inspirado na [PipeRunCRM](https://crmpiperun.com/)
