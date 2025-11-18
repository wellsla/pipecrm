# PipeCRM

Uma aplicação CRM moderna construída com Vue 3, TypeScript e PrimeVue seguindo arquitetura feature-first.

[🇺🇸 English Version](./README-en.md)

## Stack Tecnológica

### Core

- **Vue 3** (Options API) - Framework JavaScript progressivo
- **TypeScript** - Segurança de tipos e melhor experiência de desenvolvimento
- **Vite** - Ferramenta de build rápida e servidor de desenvolvimento

### Estado & Roteamento

- **Pinia** - Gerenciamento de estado (stores organizadas por domínio/funcionalidade)
- **Vue Router** - Roteamento client-side (rotas baseadas em features com guardas mínimas)

### UI & Sistema de Design

- **PrimeVue + PrimeIcons** - Biblioteca de componentes UI (tema Lara + tokens customizados)
- **PipeKit** - Wrappers customizados do PrimeVue documentados no Storybook (stories colocadas junto aos componentes)
- **ESLint + Prettier** - Linting e formatação de código
- Pre-commit hooks: run linters/formatters manually or via CI
- **Conventional Commits** - Mensagens de commit padronizadas
- **Vitest** - Testes unitários com modo browser

## Princípios de Arquitetura

- **Service** - Camada de comunicação com API
- **Components** - Componentes específicos de funcionalidades

### Separação de Camadas

- **Camada UI** - Componentes (apresentacionais, isolados)
- **Camada de Estado** - Stores Pinia (lógica de negócio, gerenciamento de estado)
- **Camada API** - Services (requisições HTTP, transformação de dados)

### Experiência do Desenvolvedor

- **Aliases de Caminho** - `@/*` para imports limpos
- **Scripts Padronizados** - Comandos npm consistentes
- **Hooks de Pré-commit** - Linting e formatação automatizados
- **Segurança de Tipos** - Cobertura completa do TypeScript

## Pré-requisitos

- Node.js `^20.19.0` ou `>=22.12.0`
- npm (ou pnpm/yarn)

## Começando

### Instalar Dependências

```bash
npm install
```

### Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173/`

### Storybook (Sistema de Design PipeKit)

Visualize e teste componentes isoladamente:

```bash
npm run storybook
```

O Storybook estará disponível em `http://localhost:6006/`

As stories são colocadas junto aos componentes PipeKit em `src/components/pipekit` usando `*.stories.ts`.

## Scripts

| Comando                   | Descrição                                       |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Inicia servidor de desenvolvimento com HMR      |
| `npm run build`           | Verifica tipos e faz build para produção        |
| `npm run preview`         | Visualiza build de produção localmente          |
| `npm run type-check`      | Executa verificação de tipos TypeScript         |
| `npm run lint`            | Lint e auto-correção de código com ESLint       |
| `npm run format`          | Formata código com Prettier                     |
| `npm run storybook`       | Inicia servidor de desenvolvimento do Storybook |
| `npm run build-storybook` | Faz build do Storybook para deploy              |

### Comandos de Garantia de Qualidade

```bash
# Executar linting
npm run lint

# Formatar todos os arquivos
npm run format

# Verificação de tipos
npm run type-check

# Executar todas as verificações (antes de commitar)
npm run lint && npm run format && npm run type-check
```

### Pre-commit hooks

Hooks de pré-commit foram removidos do repositório. Execute as verificações localmente ou configure-as no seu CI:

```bash
# Run linters and formatters manually
npm run lint
npm run format
npm run type-check

# Or run linting only on changed files with npx (manual)
npx eslint --ext .js,.vue src
```

## Estrutura do Projeto

```
pipecrm/
├── src/
│   ├── app/                    # Núcleo da aplicação
│   │   ├── layouts/            # Componentes de layout
│   │   └── App.vue             # Componente raiz
│   ├── features/               # Módulos de funcionalidades (feature-first)
│   │   └── [feature]/
│   │       ├── views/          # Páginas da funcionalidade
│   │       ├── store/          # Stores Pinia
│   │       ├── services/       # Services de API
│   │       └── components/     # Componentes da funcionalidade
│   ├── components/
│   │   └── pipekit/            # Sistema de Design PipeKit (wrappers PrimeVue)
│   │       ├── PipeButton.vue
│   │       ├── PipeHeader.vue
│   │       ├── PipePage.vue
│   │       ├── PipeMenubar.vue
│   │       ├── PipePanelMenu.vue
│   │       ├── PipeInput.vue
│   │       ├── PipePassword.vue
│   │       ├── css/            # Estilos dos componentes
│   │       └── *.stories.ts    # Stories do Storybook
│   ├── router/                 # Configuração do Vue Router
│   └── stores/                 # Stores Pinia globais
├── public/                     # Assets estáticos
└── .storybook/                 # Configuração do Storybook
```

## Sistema de Design (PipeKit)

O PipeKit é nosso sistema de design customizado construído sobre o PrimeVue, fornecendo:

- Wrappers de componentes consistentes
- Tokens de tema customizados (base Lara)
- Documentação completa no Storybook
- Conformidade com acessibilidade

### Paleta de Cores

- **Primary Dark**: `#3A4B59` - Texto principal e elementos UI
- **Secondary Gray**: `#B3B4BC` - Bordas e divisores
- **Background Light**: `#FEFFF4` - Fundos de página
- **Accent Red**: `#B8284B` - CTAs e destaques
- **Deep Blue**: `#243747` - Títulos e ênfase

## Fluxo de Desenvolvimento

### Comandos de Início Rápido

```bash
# Configuração inicial
npm install
npm run dev

# Com Storybook
npm run storybook

# Build de produção
npm run build
npm run preview
```

### Convenção de Commits

Este projeto segue os [Padrões de Commits](https://github.com/iuricode/padroes-de-commits):

```bash
# Funcionalidade
git commit -m ":sparkles: feat: adiciona formulário de novo cliente"

# Correção de bug
git commit -m ":bug: fix: resolve bug de validação no login"

# Documentação
git commit -m ":books: docs: atualiza documentação da API"

# Estilo de código
git commit -m ":ok_hand: style: formata código com prettier"

# Refatoração
git commit -m ":recycle: refactor: reorganiza estrutura das stores"

# Testes
git commit -m ":test_tube: test: adiciona testes unitários para service de usuário"

# Configuração/dependências
git commit -m ":wrench: chore: atualiza dependências"

# Performance
git commit -m ":zap: perf: otimiza busca de dados"

# Trabalho em progresso
git commit -m ":construction: wip: implementando fluxo de autenticação"
```

### Fluxo Git (GitFlow)

Este projeto segue o modelo de branches GitFlow com comandos git padrão.

#### Estrutura de Branches

- **main** - Código pronto para produção
- **develop** - Branch de integração para funcionalidades
- **feature/** - Novas funcionalidades (`feature/nome-da-funcionalidade`)
- **bugfix/** - Correções de bugs para develop (`bugfix/nome-do-bug`)
- **hotfix/** - Correções urgentes de produção (`hotfix/nome-do-problema`)
- **release/** - Preparação de release (`release/versao`)

#### Desenvolvimento de Funcionalidades

```bash
# Iniciar nova funcionalidade a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/gestao-clientes

# Trabalhar na funcionalidade (commits executam hooks de pré-commit automaticamente)
git add .
git commit -m ":sparkles: feat: adiciona visualização de lista de clientes"
git commit -m ":sparkles: feat: adiciona validação de formulário de cliente"

# Manter funcionalidade atualizada com develop
git checkout develop
git pull origin develop
git checkout feature/gestao-clientes
git merge develop

# Enviar branch de funcionalidade
git push origin feature/gestao-clientes

# Após aprovação do PR, fazer merge para develop (via PR ou localmente)
git checkout develop
git pull origin develop
git merge --no-ff feature/gestao-clientes
git push origin develop

# Deletar branch de funcionalidade
git branch -d feature/gestao-clientes
git push origin --delete feature/gestao-clientes
```

#### Fluxo de Correção de Bugs

```bash
# Criar bugfix a partir de develop
git checkout develop
git pull origin develop
git checkout -b bugfix/validacao-login

# Corrigir e commitar
git add .
git commit -m ":bug: fix: corrige regex de validação de email"

# Fazer merge de volta para develop
git checkout develop
git merge --no-ff bugfix/validacao-login
git push origin develop

# Limpar
git branch -d bugfix/validacao-login
```

#### Fluxo de Hotfix

```bash
# Criar hotfix a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/patch-seguranca-critico

# Corrigir e commitar
git add .
git commit -m ":bug: fix: corrige vulnerabilidade de segurança"

# Fazer merge para main
git checkout main
git merge --no-ff hotfix/patch-seguranca-critico
git tag -a v1.0.1 -m "Patch de segurança v1.0.1"
git push origin main --tags

# Também fazer merge para develop
git checkout develop
git merge --no-ff hotfix/patch-seguranca-critico
git push origin develop

# Limpar
git branch -d hotfix/patch-seguranca-critico
```

#### Fluxo de Release

```bash
# Criar branch de release a partir de develop
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# Preparar release (atualização de versão, changelog, etc.)
git commit -m ":bookmark: chore: atualiza versão para 1.0.0"
git commit -m ":books: docs: atualiza CHANGELOG para v1.0.0"

# Fazer merge para main
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release versão 1.0.0"
git push origin main --tags

# Fazer merge de volta para develop
git checkout develop
git merge --no-ff release/1.0.0
git push origin develop

# Deletar branch de release
git branch -d release/1.0.0
```

#### Referência Rápida

```bash
# Verificar branch atual
git branch

# Ver todas as branches
git branch -a

# Trocar de branch
git checkout nome-da-branch

# Ver histórico de commits
git log --oneline --graph --all

# Desfazer último commit (manter alterações)
git reset --soft HEAD~1

# Guardar alterações temporariamente
git stash
git stash pop

# Pular hooks apenas em emergências
git commit --no-verify -m "mensagem"
```

### Hooks de Pré-commit

Verificações automatizadas antes de cada commit:

- **ESLint** - Faz lint e auto-correção de arquivos JS/TS/Vue
- **Prettier** - Formata código consistentemente
- **Stylelint** - Faz lint e correção de CSS/SCSS
- **Verificação de tipos** - Valida TypeScript (verificação manual recomendada)

**Configurado via lint-staged:**

```json
{
  "*.{ts,tsx,vue,js,jsx,json,md,css,scss}": ["eslint --fix", "prettier --write"],
  "*.css": "stylelint --fix"
}
```

## Configuração do IDE

**Recomendado:**

- [VS Code](https://code.visualstudio.com/)
- Extensão [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desabilitar Vetur)
- Extensão [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Extensão [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Extensão de navegador [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

## Licença

Projeto público inspirado na empresa [PipeRunCRM](https://crmpiperun.com/)
