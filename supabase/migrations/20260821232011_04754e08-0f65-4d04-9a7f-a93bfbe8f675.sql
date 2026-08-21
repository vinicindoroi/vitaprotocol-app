CREATE TABLE public.purchase_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'approved',
  plan text NOT NULL DEFAULT 'complete',
  full_name text NOT NULL DEFAULT '',
  order_code text NOT NULL DEFAULT '',
  product_name text NOT NULL DEFAULT '',
  raw jsonb,
  approved_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.purchase_access TO authenticated;
GRANT ALL ON public.purchase_access TO service_role;

ALTER TABLE public.purchase_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own purchase access select" ON public.purchase_access
FOR SELECT TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE OR REPLACE FUNCTION public.has_purchase_access(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.purchase_access
    WHERE lower(email) = lower(_email) AND status = 'approved'
  );
$$;