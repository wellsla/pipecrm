-- ======================================
-- 1) Flag de admin no perfil
-- ======================================
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- Marque manualmente os admins depois, por exemplo:
-- update public.profiles set is_admin = true where id = '<UUID_DO_ADMIN>';

-- ======================================
-- 2) Função helper: verifica se usuário atual é admin
-- ======================================
create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ======================================
-- 3) POLICIES ATUALIZADAS PARA SUPORTAR is_admin
--    (assume que RLS já está habilitado nas tabelas)
-- ======================================

-- ---------- auth_users ----------
drop policy if exists "Select own auth row" on public.auth_users;

create policy "Select own auth row or admin"
on public.auth_users
for select
to authenticated
using (
  id = auth.uid()
  or public.is_current_user_admin()
);

-- ---------- profiles ----------
drop policy if exists "Select own profile" on public.profiles;
drop policy if exists "Insert own profile" on public.profiles;
drop policy if exists "Update own profile" on public.profiles;
drop policy if exists "Delete own profile" on public.profiles;

create policy "Select own profile or admin"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Insert own profile or admin"
on public.profiles
for insert
to authenticated
with check (
  id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Update own profile or admin"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
  or public.is_current_user_admin()
)
with check (
  id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Delete own profile or admin"
on public.profiles
for delete
to authenticated
using (
  id = auth.uid()
  or public.is_current_user_admin()
);

-- ---------- pipelines ----------
drop policy if exists "Select own pipelines" on public.pipelines;
drop policy if exists "Insert own pipelines" on public.pipelines;
drop policy if exists "Update own pipelines" on public.pipelines;
drop policy if exists "Delete own pipelines" on public.pipelines;

create policy "Select own pipelines or admin"
on public.pipelines
for select
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Insert own pipelines or admin"
on public.pipelines
for insert
to authenticated
with check (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Update own pipelines or admin"
on public.pipelines
for update
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
)
with check (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Delete own pipelines or admin"
on public.pipelines
for delete
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

-- ---------- deals ----------
drop policy if exists "Select own deals" on public.deals;
drop policy if exists "Insert own deals" on public.deals;
drop policy if exists "Update own deals" on public.deals;
drop policy if exists "Delete own deals" on public.deals;

create policy "Select own deals or admin"
on public.deals
for select
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Insert own deals or admin"
on public.deals
for insert
to authenticated
with check (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Update own deals or admin"
on public.deals
for update
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
)
with check (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

create policy "Delete own deals or admin"
on public.deals
for delete
to authenticated
using (
  owner_id = auth.uid()
  or public.is_current_user_admin()
);

-- ---------- deal_activities ----------
drop policy if exists "Select activities of own deals" on public.deal_activities;
drop policy if exists "Insert activities in own deals" on public.deal_activities;
drop policy if exists "Update activities of own deals" on public.deal_activities;
drop policy if exists "Delete activities of own deals" on public.deal_activities;

create policy "Select activities of own deals or admin"
on public.deal_activities
for select
to authenticated
using (
  public.is_current_user_admin()
  or exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Insert activities in own deals or admin"
on public.deal_activities
for insert
to authenticated
with check (
  public.is_current_user_admin()
  or exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Update activities of own deals or admin"
on public.deal_activities
for update
to authenticated
using (
  public.is_current_user_admin()
  or exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
)
with check (
  public.is_current_user_admin()
  or exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Delete activities of own deals or admin"
on public.deal_activities
for delete
to authenticated
using (
  public.is_current_user_admin()
  or exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

-- ---------- companies (continua liberada para todos autenticados) ----------
drop policy if exists "Companies readable by authenticated" on public.companies;
drop policy if exists "Companies insert by authenticated"   on public.companies;
drop policy if exists "Companies update by authenticated"   on public.companies;
drop policy if exists "Companies delete by authenticated"   on public.companies;

create policy "Companies readable by authenticated"
on public.companies
for select
to authenticated
using ( true );

create policy "Companies insert by authenticated"
on public.companies
for insert
to authenticated
with check ( true );

create policy "Companies update by authenticated"
on public.companies
for update
to authenticated
using ( true )
with check ( true );

create policy "Companies delete by authenticated"
on public.companies
for delete
to authenticated
using ( true );

-- ---------- contacts (continua liberada para todos autenticados) ----------
drop policy if exists "Contacts readable by authenticated" on public.contacts;
drop policy if exists "Contacts insert by authenticated"   on public.contacts;
drop policy if exists "Contacts update by authenticated"   on public.contacts;
drop policy if exists "Contacts delete by authenticated"   on public.contacts;

create policy "Contacts readable by authenticated"
on public.contacts
for select
to authenticated
using ( true );

create policy "Contacts insert by authenticated"
on public.contacts
for insert
to authenticated
with check ( true );

create policy "Contacts update by authenticated"
on public.contacts
for update
to authenticated
using ( true )
with check ( true );

create policy "Contacts delete by authenticated"
on public.contacts
for delete
to authenticated
using ( true );

-- ---------- pipeline_stages (continua liberada para todos autenticados) ----------
drop policy if exists "Pipeline stages readable by authenticated" on public.pipeline_stages;
drop policy if exists "Pipeline stages insert by authenticated"   on public.pipeline_stages;
drop policy if exists "Pipeline stages update by authenticated"   on public.pipeline_stages;
drop policy if exists "Pipeline stages delete by authenticated"   on public.pipeline_stages;

create policy "Pipeline stages readable by authenticated"
on public.pipeline_stages
for select
to authenticated
using ( true );

create policy "Pipeline stages insert by authenticated"
on public.pipeline_stages
for insert
to authenticated
with check ( true );

create policy "Pipeline stages update by authenticated"
on public.pipeline_stages
for update
to authenticated
using ( true )
with check ( true );

create policy "Pipeline stages delete by authenticated"
on public.pipeline_stages
for delete
to authenticated
using ( true );
