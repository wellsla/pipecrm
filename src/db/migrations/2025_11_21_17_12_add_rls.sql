-- ADICIONANDO ROW LEVEL SECURITY NAS TABELAS PRINCIPAIS DO APLICATIVO PIPECRM

alter table public.auth_users        enable row level security;
alter table public.profiles          enable row level security;
alter table public.companies         enable row level security;
alter table public.contacts          enable row level security;
alter table public.pipelines         enable row level security;
alter table public.pipeline_stages   enable row level security;
alter table public.deals             enable row level security;
alter table public.deal_activities   enable row level security;


-- =========================
--  POLICIES (SQL)
-- =========================

-- 'auth_users' – cada um vê só a própria linha
create policy "Select own auth row"
on public.auth_users
for select
to authenticated
using ( id = auth.uid() );

-- 'profiles' – 1:1 com o usuário
create policy "Select own profile"
on public.profiles
for select
to authenticated
using ( id = auth.uid() );

create policy "Insert own profile"
on public.profiles
for insert
to authenticated
with check ( id = auth.uid() );

create policy "Update own profile"
on public.profiles
for update
to authenticated
using ( id = auth.uid() )
with check ( id = auth.uid() );

create policy "Delete own profile"
on public.profiles
for delete
to authenticated
using ( id = auth.uid() );

-- 'pipelines' – pertencem ao dono
create policy "Select own pipelines"
on public.pipelines
for select
to authenticated
using ( owner_id = auth.uid() );

create policy "Insert own pipelines"
on public.pipelines
for insert
to authenticated
with check ( owner_id = auth.uid() );

create policy "Update own pipelines"
on public.pipelines
for update
to authenticated
using ( owner_id = auth.uid() )
with check ( owner_id = auth.uid() );

create policy "Delete own pipelines"
on public.pipelines
for delete
to authenticated
using ( owner_id = auth.uid() );

-- 'deals' – pertencem ao dono
create policy "Select own deals"
on public.deals
for select
to authenticated
using ( owner_id = auth.uid() );

create policy "Insert own deals"
on public.deals
for insert
to authenticated
with check ( owner_id = auth.uid() );

create policy "Update own deals"
on public.deals
for update
to authenticated
using ( owner_id = auth.uid() )
with check ( owner_id = auth.uid() );

create policy "Delete own deals"
on public.deals
for delete
to authenticated
using ( owner_id = auth.uid() );

-- 'deal_activities' – o usuário só mexe em atividades dos deals dele
create policy "Select activities of own deals"
on public.deal_activities
for select
to authenticated
using (
  exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Insert activities in own deals"
on public.deal_activities
for insert
to authenticated
with check (
  exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Update activities of own deals"
on public.deal_activities
for update
to authenticated
using (
  exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

create policy "Delete activities of own deals"
on public.deal_activities
for delete
to authenticated
using (
  exists (
    select 1
    from public.deals d
    where d.id = deal_activities.deal_id
      and d.owner_id = auth.uid()
  )
);

-- 'companies' – compartilhadas entre usuários autenticados
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

-- 'contacts' – compartilhados entre usuários autenticados
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

-- 'pipeline_stages' – compartilhados entre usuários autenticados
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