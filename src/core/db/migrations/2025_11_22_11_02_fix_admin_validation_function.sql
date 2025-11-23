create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;
