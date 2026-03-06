-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'tenant_admin', 'tenant_member');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Security definer function to get tenant_id for a user
CREATE OR REPLACE FUNCTION public.get_user_tenant_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Tenant admins can view team profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (tenant_id = public.get_user_tenant_id(auth.uid()));

-- User roles RLS policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to register a new company (tenant)
CREATE OR REPLACE FUNCTION public.register_company(
  _company_name TEXT,
  _plan TEXT DEFAULT 'starter',
  _setup_type TEXT DEFAULT 'simple'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _tenant_id UUID;
  _user_id UUID;
BEGIN
  _user_id := auth.uid();
  
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.tenants (name, owner_email, plan, setup_type, status, slug)
  VALUES (
    _company_name,
    (SELECT email FROM public.profiles WHERE user_id = _user_id),
    _plan,
    _setup_type,
    'active',
    lower(regexp_replace(_company_name, '[^a-zA-Z0-9]', '-', 'g'))
  )
  RETURNING id INTO _tenant_id;

  UPDATE public.profiles SET tenant_id = _tenant_id WHERE user_id = _user_id;

  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'tenant_admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN _tenant_id;
END;
$$;

-- Update updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();