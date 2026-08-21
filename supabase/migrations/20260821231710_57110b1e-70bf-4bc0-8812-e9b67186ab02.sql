CREATE TABLE public.refund_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  document_id text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  order_id text NOT NULL DEFAULT '',
  reason text NOT NULL DEFAULT '',
  payment_proof_path text,
  order_proof_path text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.refund_requests TO authenticated;
GRANT ALL ON public.refund_requests TO service_role;
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own refund requests select" ON public.refund_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own refund requests insert" ON public.refund_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "refund proofs upload own" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'refund-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "refund proofs read own" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'refund-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);