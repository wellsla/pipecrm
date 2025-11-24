-- ============================================================================
-- COMPLETE SCHEMA REBUILD - PipeCRM
-- ============================================================================
-- This migration rebuilds the entire database from scratch
-- Removes all references to Supabase's auth.users table
-- Uses only custom public.auth_users for authentication
-- ============================================================================

-- ============================================================================
-- STEP 1: Drop all existing objects (in correct dependency order)
-- ============================================================================

-- Drop triggers first
DROP TRIGGER IF EXISTS on_auth_user_sync ON public.auth_users;
DROP TRIGGER IF EXISTS on_auth_user_created ON public.auth_users;
DROP TRIGGER IF EXISTS set_deals_owner_id ON public.deals;
DROP TRIGGER IF EXISTS set_pipelines_owner_id ON public.pipelines;

-- Drop functions
DROP FUNCTION IF EXISTS public.sync_auth_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_user_profile() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.set_owner_id() CASCADE;
DROP FUNCTION IF EXISTS public.is_current_user_admin() CASCADE;

-- Drop tables (respecting foreign key dependencies)
DROP TABLE IF EXISTS public.deal_activities CASCADE;
DROP TABLE IF EXISTS public.deals CASCADE;
DROP TABLE IF EXISTS public.pipeline_stages CASCADE;
DROP TABLE IF EXISTS public.pipelines CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.auth_users CASCADE;

-- Drop types
DROP TYPE IF EXISTS public.activity_type CASCADE;
DROP TYPE IF EXISTS public.deal_status CASCADE;

-- ============================================================================
-- STEP 2: Create custom types
-- ============================================================================

CREATE TYPE public.deal_status AS ENUM ('open', 'won', 'lost', 'archived');
ALTER TYPE public.deal_status OWNER TO postgres;

CREATE TYPE public.activity_type AS ENUM ('note', 'call', 'email', 'meeting', 'task', 'other');
ALTER TYPE public.activity_type OWNER TO postgres;

-- ============================================================================
-- STEP 3: Create core authentication table
-- ============================================================================

CREATE TABLE public.auth_users (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email      VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.auth_users OWNER TO postgres;

COMMENT ON TABLE public.auth_users IS 'Custom authentication table - stores user credentials';
COMMENT ON COLUMN public.auth_users.id IS 'User unique identifier (used by auth.uid())';
COMMENT ON COLUMN public.auth_users.email IS 'User email address';

-- ============================================================================
-- STEP 4: Create profiles table
-- ============================================================================

CREATE TABLE public.profiles (
    id         UUID PRIMARY KEY REFERENCES public.auth_users(id) ON DELETE CASCADE,
    name       VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_admin   BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.profiles OWNER TO postgres;

CREATE INDEX idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = true;

COMMENT ON TABLE public.profiles IS 'User profiles with extended information';
COMMENT ON COLUMN public.profiles.id IS 'References auth_users.id';
COMMENT ON COLUMN public.profiles.is_admin IS 'Administrative privileges flag';

-- ============================================================================
-- STEP 5: Create business tables
-- ============================================================================

-- Companies table
CREATE TABLE public.companies (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) NOT NULL,
    segment    VARCHAR(100),
    city       VARCHAR(120),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.companies OWNER TO postgres;

COMMENT ON TABLE public.companies IS 'Companies/Organizations in the CRM';

-- Contacts table
CREATE TABLE public.contacts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255),
    phone      VARCHAR(50),
    position   VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contacts OWNER TO postgres;

CREATE INDEX idx_contacts_company_id ON public.contacts(company_id);
CREATE INDEX idx_contacts_email ON public.contacts(email) WHERE email IS NOT NULL;

COMMENT ON TABLE public.contacts IS 'Individual contacts within companies';

-- Pipelines table
CREATE TABLE public.pipelines (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) NOT NULL,
    owner_id   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pipelines OWNER TO postgres;

CREATE INDEX idx_pipelines_owner_id ON public.pipelines(owner_id);

COMMENT ON TABLE public.pipelines IS 'Sales pipelines owned by users';

-- Pipeline stages table
CREATE TABLE public.pipeline_stages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID NOT NULL REFERENCES public.pipelines(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    position    INTEGER NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_pipeline_position UNIQUE (pipeline_id, position)
);

ALTER TABLE public.pipeline_stages OWNER TO postgres;

CREATE INDEX idx_stages_pipeline_id ON public.pipeline_stages(pipeline_id);
CREATE INDEX idx_stages_position ON public.pipeline_stages(pipeline_id, position);

COMMENT ON TABLE public.pipeline_stages IS 'Stages within each pipeline';

-- Deals table
CREATE TABLE public.deals (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES public.pipelines(id) ON DELETE SET NULL,
    stage_id    UUID REFERENCES public.pipeline_stages(id) ON DELETE SET NULL,
    company_id  UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    contact_id  UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    title       VARCHAR(255) NOT NULL,
    amount      NUMERIC(14, 2),
    status      public.deal_status NOT NULL DEFAULT 'open',
    owner_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.deals OWNER TO postgres;

CREATE INDEX idx_deals_pipeline_id ON public.deals(pipeline_id);
CREATE INDEX idx_deals_stage_id ON public.deals(stage_id);
CREATE INDEX idx_deals_company_id ON public.deals(company_id);
CREATE INDEX idx_deals_contact_id ON public.deals(contact_id);
CREATE INDEX idx_deals_owner_id ON public.deals(owner_id);
CREATE INDEX idx_deals_status ON public.deals(status);

COMMENT ON TABLE public.deals IS 'Sales deals/opportunities';

-- Deal activities table
CREATE TABLE public.deal_activities (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id    UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
    type       public.activity_type NOT NULL,
    content    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.deal_activities OWNER TO postgres;

CREATE INDEX idx_activities_deal_id ON public.deal_activities(deal_id);
CREATE INDEX idx_activities_created_at ON public.deal_activities(created_at DESC);

COMMENT ON TABLE public.deal_activities IS 'Activity log for deals';

-- ============================================================================
-- STEP 6: Create helper functions
-- ============================================================================

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
STABLE
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

ALTER FUNCTION public.is_current_user_admin() OWNER TO postgres;

COMMENT ON FUNCTION public.is_current_user_admin() IS 'Returns true if current authenticated user has admin privileges';

-- Function to automatically set owner_id to current user
CREATE OR REPLACE FUNCTION public.set_owner_id()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- If owner_id is not provided, use the authenticated user
  IF NEW.owner_id IS NULL THEN
    NEW.owner_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION public.set_owner_id() OWNER TO postgres;

COMMENT ON FUNCTION public.set_owner_id() IS 'Trigger function to auto-populate owner_id with auth.uid()';

-- Function to automatically create profile when new user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create profile automatically when auth_users receives new record
  INSERT INTO public.profiles (id, name, avatar_url, is_admin)
  VALUES (
    NEW.id,
    COALESCE(SPLIT_PART(NEW.email, '@', 1), 'User'),
    NULL,
    false
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a profile when a new auth_users record is inserted';

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

ALTER FUNCTION public.update_updated_at() OWNER TO postgres;

COMMENT ON FUNCTION public.update_updated_at() IS 'Automatically updates the updated_at timestamp';

-- ============================================================================
-- STEP 7: Create triggers
-- ============================================================================

-- Trigger to create profile when new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON public.auth_users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to set owner_id on pipelines
CREATE TRIGGER set_pipelines_owner_id
  BEFORE INSERT ON public.pipelines
  FOR EACH ROW
  EXECUTE FUNCTION public.set_owner_id();

-- Trigger to set owner_id on deals
CREATE TRIGGER set_deals_owner_id
  BEFORE INSERT ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.set_owner_id();

-- Trigger to update updated_at on deals
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================================
-- STEP 8: Enable Row Level Security (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_activities ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 9: Create RLS Policies
-- ============================================================================

-- Policies for auth_users
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

-- Policies for profiles
CREATE POLICY "Users can view own profile or admin can view all"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can insert own profile or admin can insert any"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can update own profile or admin can update any"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR is_current_user_admin())
  WITH CHECK (id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can delete own profile or admin can delete any"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (id = auth.uid() OR is_current_user_admin());

-- Policies for companies (all authenticated users have full access)
CREATE POLICY "Authenticated users can view all companies"
  ON public.companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert companies"
  ON public.companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update companies"
  ON public.companies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete companies"
  ON public.companies FOR DELETE
  TO authenticated
  USING (true);

-- Policies for contacts (all authenticated users have full access)
CREATE POLICY "Authenticated users can view all contacts"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON public.contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON public.contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON public.contacts FOR DELETE
  TO authenticated
  USING (true);

-- Policies for pipelines (users can only access their own or admin can access all)
CREATE POLICY "Users can view own pipelines or admin can view all"
  ON public.pipelines FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can insert own pipelines or admin can insert any"
  ON public.pipelines FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can update own pipelines or admin can update any"
  ON public.pipelines FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin())
  WITH CHECK (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can delete own pipelines or admin can delete any"
  ON public.pipelines FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin());

-- Policies for pipeline_stages (all authenticated users have full access)
CREATE POLICY "Authenticated users can view all pipeline stages"
  ON public.pipeline_stages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert pipeline stages"
  ON public.pipeline_stages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pipeline stages"
  ON public.pipeline_stages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pipeline stages"
  ON public.pipeline_stages FOR DELETE
  TO authenticated
  USING (true);

-- Policies for deals (users can only access their own or admin can access all)
CREATE POLICY "Users can view own deals or admin can view all"
  ON public.deals FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can insert own deals or admin can insert any"
  ON public.deals FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can update own deals or admin can update any"
  ON public.deals FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin())
  WITH CHECK (owner_id = auth.uid() OR is_current_user_admin());

CREATE POLICY "Users can delete own deals or admin can delete any"
  ON public.deals FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid() OR is_current_user_admin());

-- Policies for deal_activities (users can only access activities of their own deals or admin can access all)
CREATE POLICY "Users can view activities of own deals or admin can view all"
  ON public.deal_activities FOR SELECT
  TO authenticated
  USING (
    is_current_user_admin() OR
    EXISTS (
      SELECT 1 FROM public.deals d
      WHERE d.id = deal_activities.deal_id
      AND d.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert activities in own deals or admin can insert in any"
  ON public.deal_activities FOR INSERT
  TO authenticated
  WITH CHECK (
    is_current_user_admin() OR
    EXISTS (
      SELECT 1 FROM public.deals d
      WHERE d.id = deal_activities.deal_id
      AND d.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update activities of own deals or admin can update any"
  ON public.deal_activities FOR UPDATE
  TO authenticated
  USING (
    is_current_user_admin() OR
    EXISTS (
      SELECT 1 FROM public.deals d
      WHERE d.id = deal_activities.deal_id
      AND d.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    is_current_user_admin() OR
    EXISTS (
      SELECT 1 FROM public.deals d
      WHERE d.id = deal_activities.deal_id
      AND d.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete activities of own deals or admin can delete any"
  ON public.deal_activities FOR DELETE
  TO authenticated
  USING (
    is_current_user_admin() OR
    EXISTS (
      SELECT 1 FROM public.deals d
      WHERE d.id = deal_activities.deal_id
      AND d.owner_id = auth.uid()
    )
  );

-- ============================================================================
-- STEP 10: Grant permissions
-- ============================================================================

-- Grant permissions for auth_users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auth_users TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auth_users TO authenticated;
GRANT ALL ON public.auth_users TO service_role;

-- Grant permissions for profiles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Grant permissions for companies
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;

-- Grant permissions for contacts
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;

-- Grant permissions for pipelines
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pipelines TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pipelines TO authenticated;
GRANT ALL ON public.pipelines TO service_role;

-- Grant permissions for pipeline_stages
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pipeline_stages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pipeline_stages TO authenticated;
GRANT ALL ON public.pipeline_stages TO service_role;

-- Grant permissions for deals
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deals TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deals TO authenticated;
GRANT ALL ON public.deals TO service_role;

-- Grant permissions for deal_activities
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deal_activities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deal_activities TO authenticated;
GRANT ALL ON public.deal_activities TO service_role;

-- Grant execute permissions for functions
GRANT EXECUTE ON FUNCTION public.is_current_user_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_owner_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at() TO anon, authenticated, service_role;

-- ============================================================================
-- STEP 11: Create default data (optional - for testing)
-- ============================================================================

-- This section is commented out but can be used for initial setup/testing
-- IMPORTANT: This assumes you have Supabase Auth configured properly

/*
-- Create a test user (you'll need to create this via Supabase Auth Dashboard first)
-- Then run:
-- INSERT INTO public.auth_users (id, email)
-- VALUES ('your-auth-uid-here', 'test@example.com');

-- The trigger will automatically create the profile

-- You can then make the first user an admin:
-- UPDATE public.profiles SET is_admin = true WHERE email = 'test@example.com';
*/

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify the schema
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Tables created: auth_users, profiles, companies, contacts, pipelines, pipeline_stages, deals, deal_activities';
  RAISE NOTICE 'Functions created: is_current_user_admin(), set_owner_id(), handle_new_user(), update_updated_at()';
  RAISE NOTICE 'Triggers created: on_auth_user_created, set_pipelines_owner_id, set_deals_owner_id, update_deals_updated_at';
  RAISE NOTICE 'RLS enabled on all tables with appropriate policies';
END $$;
