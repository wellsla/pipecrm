# Esquema do Banco de Dados

Este documento fornece uma descrição mínima e de alto nível do esquema de banco de dados usado com o Supabase.

## Tabelas

- users
  - id: uuid, PRIMARY KEY, default: gen_random_uuid()
  - email: text, NOT NULL, UNIQUE
  - password_hash: text
  - created_at: timestamptz, default: now()

- profiles
  - id: uuid, PRIMARY KEY, references users(id)
  - full_name: text
  - avatar_url: text
  - bio: text

- projects
  - id: uuid, PRIMARY KEY, default: gen_random_uuid()
  - owner_id: uuid, NOT NULL, references users(id)
  - name: text, NOT NULL
  - description: text
  - status: text -- e.g. "active", "archived"
  - created_at: timestamptz, default: now()

- tasks
  - id: uuid, PRIMARY KEY, default: gen_random_uuid()
  - project_id: uuid, NOT NULL, references projects(id)
  - assignee_id: uuid, references users(id)
  - title: text, NOT NULL
  - description: text
  - status: text -- e.g. "todo", "in_progress", "done"
  - due_date: date
  - created_at: timestamptz, default: now()

- activity_logs
  - id: bigserial, PRIMARY KEY
  - user_id: uuid, references users(id)
  - table_name: text
  - action: text -- e.g. "insert", "update", "delete"
  - record_id: uuid
  - created_at: timestamptz, default: now()

## Índices e Restrições (sugeridos)

- users(email) UNIQUE
- projects(owner_id)
- tasks(project_id)
- tasks(assignee_id)

## Relacionamentos

- users 1 -> many projects (users.id = projects.owner_id)
- users 1 -> many tasks (users.id = tasks.assignee_id)
- users 1 -> 1 profiles (profiles.id = users.id)
- projects 1 -> many tasks (projects.id = tasks.project_id)

## Considerações de Segurança

- Ative a Segurança em Nível de Linha (RLS) por tabela e crie políticas para usuários autenticados.
- Use políticas RLS para restringir o acesso (por exemplo, usuários só podem ler/atualizar seus próprios perfis e tarefas).
- Considere usar enums do Postgres para campos de status ou validar valores no nível da aplicação.
