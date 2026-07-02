-- Track per-step completion for each day (5 steps: food, habit, movement, sleep, water)
CREATE TABLE public.day_step_completions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  day_number integer NOT NULL,
  step text NOT NULL CHECK (step IN ('food','habit','movement','sleep','water')),
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day_number, step)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.day_step_completions TO authenticated;
GRANT ALL ON public.day_step_completions TO service_role;
ALTER TABLE public.day_step_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own step completions select" ON public.day_step_completions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own step completions insert" ON public.day_step_completions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own step completions delete" ON public.day_step_completions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Reflection at end of 30-day journey (self-declared before/after across 7 dimensions)
CREATE TABLE public.journey_reflection (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  energy_before smallint, energy_after smallint,
  sleep_before smallint, sleep_after smallint,
  bloating_before smallint, bloating_after smallint,
  wellbeing_before smallint, wellbeing_after smallint,
  clothes_before smallint, clothes_after smallint,
  mood_before smallint, mood_after smallint,
  selfesteem_before smallint, selfesteem_after smallint,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_reflection TO authenticated;
GRANT ALL ON public.journey_reflection TO service_role;
ALTER TABLE public.journey_reflection ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own reflection select" ON public.journey_reflection FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own reflection insert" ON public.journey_reflection FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own reflection update" ON public.journey_reflection FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);