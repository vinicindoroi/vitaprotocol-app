// Typed wrapper for the Supabase client until generated types are refreshed.
import { supabase as base } from "@/integrations/supabase/client";

export interface ProfileRow {
  id: string;
  full_name: string;
  email: string;
  country: string;
  plan: "basic" | "complete";
  quiz_completed: boolean;
  dominant_hormone: string | null;
  current_day: number;
  joined_at: string;
  last_active: string;
}

export interface DayCompletionRow {
  id: string;
  user_id: string;
  day_number: number;
  completed_at: string;
}

// Cast the auto-generated client; the schema is enforced by Postgres + RLS.
export const db = base as unknown as {
  from: ((table: "profiles") => ReturnType<typeof base.from> & {
    select: (cols: string) => any;
    insert: (row: Partial<ProfileRow>) => any;
    update: (row: Partial<ProfileRow>) => any;
  }) &
    ((table: "day_completions") => ReturnType<typeof base.from> & {
      select: (cols: string) => any;
      insert: (row: Partial<DayCompletionRow>) => any;
    });
};
