-- ============================================================================
-- FIX: Add INSERT policy for auth_users table
-- ============================================================================
-- Problem: Users cannot insert into auth_users due to missing INSERT policy
-- This causes RLS violation (42501) when trying to create auth_users entry
-- ============================================================================

-- Drop existing policies to recreate them in correct order
DROP POLICY IF EXISTS "Users can view own record or admin can view all" ON public.auth_users;
DROP POLICY IF EXISTS "Users can update own record or admin can update all" ON public.auth_users;

-- Recreate policies with INSERT included
CREATE POLICY "Users can view own record or admin can view all"
  ON public.auth_users FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can insert own record"
  ON public.auth_users FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own record or admin can update all"
  ON public.auth_users FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR is_current_user_admin())
  WITH CHECK (id = auth.uid() OR is_current_user_admin());

-- Verification
DO $$
BEGIN
  RAISE NOTICE 'auth_users INSERT policy created successfully!';
  RAISE NOTICE 'Users can now insert their own auth_users record during signup';
END $$;
