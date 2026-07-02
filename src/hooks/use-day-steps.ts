import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { StepKey } from "@/data/protocol-steps";

export interface StepCompletion {
  day_number: number;
  step: StepKey;
}

export function useAllStepCompletions() {
  return useQuery({
    queryKey: ["step-completions"],
    queryFn: async (): Promise<StepCompletion[]> => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data, error } = await supabase
        .from("day_step_completions")
        .select("day_number,step")
        .eq("user_id", u.user.id);
      if (error) throw error;
      return (data ?? []) as StepCompletion[];
    },
    staleTime: 30_000,
  });
}

export function useDaySteps(day: number) {
  const { data: all = [], ...rest } = useAllStepCompletions();
  const done = new Set(all.filter((c) => c.day_number === day).map((c) => c.step));
  return { done, ...rest };
}

export function useToggleStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ day, step, done }: { day: number; step: StepKey; done: boolean }) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("no user");
      if (done) {
        const { error } = await supabase
          .from("day_step_completions")
          .insert({ user_id: u.user.id, day_number: day, step });
        if (error && !String(error.message).includes("duplicate")) throw error;
      } else {
        const { error } = await supabase
          .from("day_step_completions")
          .delete()
          .eq("user_id", u.user.id)
          .eq("day_number", day)
          .eq("step", step);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["step-completions"] });
    },
  });
}
