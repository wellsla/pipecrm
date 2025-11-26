# Esquema do Banco de Dados - PipeCRM

Este documento descreve o schema atual do banco de dados PostgreSQL usado com o Supabase.

> **📝 Migrations:** Os arquivos SQL de migração estão em `src/db/migrations/`
>
> **📚 Documentação Completa:** Veja `docs/revisao/22-schema-rebuild-final.md` para detalhes completos da arquitetura

## Custom Types

```sql
CREATE TYPE deal_status AS ENUM ('open', 'won', 'lost', 'archived');
CREATE TYPE activity_type AS ENUM ('note', 'call', 'email', 'meeting', 'task', 'other');
```

## Tabelas

### Autenticação

#### auth_users

Autenticação customizada (não usa Supabase Auth nativo)

- `id`: uuid, PRIMARY KEY
- `email`: varchar(255), NOT NULL, UNIQUE
- `created_at`: timestamptz, default: now()

#### profiles

Perfis de usuários com informações estendidas

- `id`: uuid, PRIMARY KEY, FK → auth_users(id)
- `name`: varchar(255), NOT NULL
- `avatar_url`: text
- `created_at`: timestamptz, default: now()
- `is_admin`: boolean, default: false

### Negócios

#### companies

Empresas/Organizações no CRM

- `id`: uuid, PRIMARY KEY
- `name`: varchar(255), NOT NULL
- `segment`: varchar(100)
- `city`: varchar(120)
- `created_at`: timestamptz, default: now()

#### contacts

Contatos individuais dentro de empresas

- `id`: uuid, PRIMARY KEY
- `company_id`: uuid, FK → companies(id) ON DELETE SET NULL
- `name`: varchar(255), NOT NULL
- `email`: varchar(255)
- `phone`: varchar(50)
- `position`: varchar(100)
- `created_at`: timestamptz, default: now()

### Pipeline de Vendas

#### pipelines

Pipelines de vendas pertencentes a usuários

- `id`: uuid, PRIMARY KEY
- `name`: varchar(255), NOT NULL
- `owner_id`: uuid, FK → profiles(id) ON DELETE SET NULL
- `created_at`: timestamptz, default: now()

#### pipeline_stages

Estágios dentro de cada pipeline

- `id`: uuid, PRIMARY KEY
- `pipeline_id`: uuid, FK → pipelines(id) ON DELETE CASCADE
- `name`: varchar(255), NOT NULL
- `position`: integer, NOT NULL
- `created_at`: timestamptz, default: now()
- **Constraint:** UNIQUE (pipeline_id, position)

#### deals

Oportunidades de vendas

- `id`: uuid, PRIMARY KEY
- `pipeline_id`: uuid, FK → pipelines(id) ON DELETE SET NULL
- `stage_id`: uuid, FK → pipeline_stages(id) ON DELETE SET NULL
- `company_id`: uuid, FK → companies(id) ON DELETE SET NULL
- `contact_id`: uuid, FK → contacts(id) ON DELETE SET NULL
- `title`: varchar(255), NOT NULL
- `amount`: numeric(14, 2)
- `status`: deal_status, default: 'open'
- `owner_id`: uuid, FK → profiles(id) ON DELETE SET NULL
- `created_at`: timestamptz, default: now()
- `updated_at`: timestamptz, default: now()

#### deal_activities

Registro de atividades para deals

- `id`: uuid, PRIMARY KEY
- `deal_id`: uuid, FK → deals(id) ON DELETE CASCADE
- `type`: activity_type, NOT NULL
- `content`: text
- `created_at`: timestamptz, default: now()

## Índices

```sql
-- Profiles
CREATE INDEX idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;

-- Contacts
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_contacts_email ON contacts(email) WHERE email IS NOT NULL;

-- Pipelines
CREATE INDEX idx_pipelines_owner_id ON pipelines(owner_id);

-- Pipeline Stages
CREATE INDEX idx_stages_pipeline_id ON pipeline_stages(pipeline_id);
CREATE INDEX idx_stages_position ON pipeline_stages(pipeline_id, position);

-- Deals
CREATE INDEX idx_deals_pipeline_id ON deals(pipeline_id);
CREATE INDEX idx_deals_stage_id ON deals(stage_id);
CREATE INDEX idx_deals_company_id ON deals(company_id);
CREATE INDEX idx_deals_contact_id ON deals(contact_id);
CREATE INDEX idx_deals_owner_id ON deals(owner_id);
CREATE INDEX idx_deals_status ON deals(status);

-- Deal Activities
CREATE INDEX idx_activities_deal_id ON deal_activities(deal_id);
CREATE INDEX idx_activities_created_at ON deal_activities(created_at DESC);
```

## Funções

### is_current_user_admin()

Retorna true se o usuário autenticado atual tem privilégios de admin

```sql
SELECT is_current_user_admin();
```

### set_owner_id()

Trigger function para auto-popular owner_id com auth.uid()

### handle_new_user()

Cria profile automaticamente quando auth_users recebe novo registro

### update_updated_at()

Atualiza automaticamente o timestamp updated_at

## Triggers

```sql
-- Cria profile quando usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth_users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-popula owner_id em pipelines
CREATE TRIGGER set_pipelines_owner_id
  BEFORE INSERT ON pipelines
  FOR EACH ROW EXECUTE FUNCTION set_owner_id();

-- Auto-popula owner_id em deals
CREATE TRIGGER set_deals_owner_id
  BEFORE INSERT ON deals
  FOR EACH ROW EXECUTE FUNCTION set_owner_id();

-- Atualiza updated_at em deals
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## Relacionamentos

```text
auth_users (1) ←→ (1) profiles

profiles (1) → (N) pipelines (owner_id)
profiles (1) → (N) deals (owner_id)

companies (1) → (N) contacts
companies (1) → (N) deals

contacts (1) → (N) deals

pipelines (1) → (N) pipeline_stages
pipelines (1) → (N) deals

pipeline_stages (1) → (N) deals

deals (1) → (N) deal_activities
```

## Row Level Security (RLS)

Todas as tabelas têm RLS habilitado com políticas específicas:

### auth_users & profiles

- Usuários podem ver/editar apenas seu próprio registro
- Admins podem ver/editar todos os registros

### companies & contacts

- Todos os usuários autenticados têm acesso completo (SELECT, INSERT, UPDATE, DELETE)

### pipelines & deals

- Usuários podem ver/editar apenas seus próprios registros (owner_id = auth.uid())
- Admins podem ver/editar todos os registros
- owner_id é auto-populado com auth.uid() via trigger

### RLS: pipeline_stages

- Todos os usuários autenticados têm acesso completo

### RLS: deal_activities

- Usuários podem ver/editar apenas atividades dos seus deals
- Admins podem ver/editar todas as atividades

## Fluxo de Dados

### Criação de Usuário

1. Usuário faz signup via Supabase Auth
2. App cria entrada em `auth_users` com o mesmo UUID do Supabase Auth
3. Trigger `on_auth_user_created` cria automaticamente o `profile`
4. App pode criar `pipelines` e `deals` (owner_id auto-populado)

### Criação de Deal

1. App insere deal (sem owner_id)
2. Trigger `set_deals_owner_id` preenche owner_id = auth.uid()
3. RLS policies validam se o usuário pode criar o deal
4. Deal é inserido com sucesso

## Considerações de Segurança

- ✅ RLS habilitado em todas as tabelas
- ✅ Políticas baseadas em auth.uid() para ownership
- ✅ Função is_current_user_admin() para verificação de admin
- ✅ Triggers security definer com search_path = public
- ✅ FK constraints com ON DELETE apropriados
- ⚠️ Autenticação customizada (não usa Supabase Auth nativo)

## Migrations

Veja os arquivos em `src/db/migrations/` para o schema completo:

- `2025_11_24_complete_schema_rebuild.sql` - Schema completo atual

Para aplicar migrations, use o Supabase Dashboard SQL Editor.
