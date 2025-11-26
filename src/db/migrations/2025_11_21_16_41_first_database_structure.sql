-- Habilita geração de UUIDs (Supabase já costuma ter isso, mas garante)
create extension if not exists "pgcrypto";

-- =========================
-- ENUMS
-- =========================
create type deal_status as enum ('open', 'won', 'lost', 'archived');
create type activity_type as enum ('note', 'call', 'email', 'meeting', 'task', 'other');

-- =========================
-- TABELA: auth_users
-- (use se quiser uma tabela própria; em Supabase existe também auth.users)
-- =========================
create table public.auth_users (
  id         uuid primary key default gen_random_uuid(),
  email      varchar(255) not null unique,
  created_at timestamptz  not null default now()
);

-- =========================
-- TABELA: profiles
-- =========================
create table public.profiles (
  id         uuid primary key,
  name       varchar(255) not null,
  avatar_url text,
  created_at timestamptz not null default now(),

  constraint fk_profiles_auth_users
    foreign key (id) references public.auth_users(id)
      on delete cascade
);

-- =========================
-- TABELA: companies
-- =========================
create table public.companies (
  id         uuid primary key default gen_random_uuid(),
  name       varchar(255) not null,
  segment    varchar(100),
  city       varchar(120),
  created_at timestamptz not null default now()
);

-- =========================
-- TABELA: contacts
-- =========================
create table public.contacts (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid,
  name       varchar(255) not null,
  email      varchar(255),
  phone      varchar(50),
  position   varchar(100),
  created_at timestamptz not null default now(),

  constraint fk_contacts_company
    foreign key (company_id) references public.companies(id)
      on delete set null
);

-- =========================
-- TABELA: pipelines
-- =========================
create table public.pipelines (
  id         uuid primary key default gen_random_uuid(),
  name       varchar(255) not null,
  owner_id   uuid,
  created_at timestamptz not null default now(),

  constraint fk_pipelines_owner
    foreign key (owner_id) references public.profiles(id)
      on delete set null
);

-- =========================
-- TABELA: pipeline_stages
-- =========================
create table public.pipeline_stages (
  id         uuid primary key default gen_random_uuid(),
  pipeline_id uuid not null,
  name       varchar(255) not null,
  position   int not null,
  created_at timestamptz not null default now(),

  constraint fk_stages_pipeline
    foreign key (pipeline_id) references public.pipelines(id)
      on delete cascade
);

-- =========================
-- TABELA: deals
-- =========================
create table public.deals (
  id          uuid primary key default gen_random_uuid(),
  pipeline_id uuid,
  stage_id    uuid,
  company_id  uuid,
  contact_id  uuid,
  title       varchar(255) not null,
  amount      numeric(14,2),
  status      deal_status not null,
  owner_id    uuid,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint fk_deals_pipeline
    foreign key (pipeline_id) references public.pipelines(id)
      on delete set null,
  constraint fk_deals_stage
    foreign key (stage_id) references public.pipeline_stages(id)
      on delete set null,
  constraint fk_deals_company
    foreign key (company_id) references public.companies(id)
      on delete set null,
  constraint fk_deals_contact
    foreign key (contact_id) references public.contacts(id)
      on delete set null,
  constraint fk_deals_owner
    foreign key (owner_id) references public.profiles(id)
      on delete set null
);

-- =========================
-- TABELA: deal_activities
-- =========================
create table public.deal_activities (
  id         uuid primary key default gen_random_uuid(),
  deal_id    uuid not null,
  type       activity_type not null,
  content    text,
  created_at timestamptz not null default now(),

  constraint fk_activities_deal
    foreign key (deal_id) references public.deals(id)
      on delete cascade
);

-- =========================
-- ÍNDICES ÚTEIS
-- =========================
create index idx_contacts_company_id      on public.contacts(company_id);
create index idx_pipelines_owner_id      on public.pipelines(owner_id);
create index idx_stages_pipeline_id      on public.pipeline_stages(pipeline_id);
create index idx_deals_pipeline_id       on public.deals(pipeline_id);
create index idx_deals_stage_id          on public.deals(stage_id);
create index idx_deals_company_id        on public.deals(company_id);
create index idx_deals_contact_id        on public.deals(contact_id);
create index idx_deals_owner_id          on public.deals(owner_id);
create index idx_activities_deal_id      on public.deal_activities(deal_id);
