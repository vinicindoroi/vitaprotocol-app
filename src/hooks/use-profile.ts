import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  country: string;
  plan: "basic" | "complete";
  quiz_completed: boolean;
  dominant_hormone: string | null;
  current_day: number;
  joined_at: string;
}

export function profileQueryKey() { return ["profile"] as const; }

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKey(),
    queryFn: async (): Promise<Profile | null> => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("id,full_name,email,country,plan,quiz_completed,dominant_hormone,current_day,joined_at")
        .eq("id", u.user.id)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    staleTime: 30_000,
  });
}

export function useCompletions() {
  return useQuery({
    queryKey: ["completions"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [] as number[];
      const { data, error } = await supabase
        .from("day_completions")
        .select("day_number")
        .eq("user_id", u.user.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.day_number).sort((a, b) => a - b);
    },
    staleTime: 30_000,
  });
}
