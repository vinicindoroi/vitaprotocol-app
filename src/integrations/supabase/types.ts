export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      day_completions: {
        Row: {
          completed_at: string
          day_number: number
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          day_number: number
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          day_number?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      day_step_completions: {
        Row: {
          completed_at: string
          day_number: number
          id: string
          step: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          day_number: number
          id?: string
          step: string
          user_id: string
        }
        Update: {
          completed_at?: string
          day_number?: number
          id?: string
          step?: string
          user_id?: string
        }
        Relationships: []
      }
      journey_reflection: {
        Row: {
          bloating_after: number | null
          bloating_before: number | null
          clothes_after: number | null
          clothes_before: number | null
          created_at: string
          energy_after: number | null
          energy_before: number | null
          id: string
          mood_after: number | null
          mood_before: number | null
          selfesteem_after: number | null
          selfesteem_before: number | null
          sleep_after: number | null
          sleep_before: number | null
          updated_at: string
          user_id: string
          wellbeing_after: number | null
          wellbeing_before: number | null
        }
        Insert: {
          bloating_after?: number | null
          bloating_before?: number | null
          clothes_after?: number | null
          clothes_before?: number | null
          created_at?: string
          energy_after?: number | null
          energy_before?: number | null
          id?: string
          mood_after?: number | null
          mood_before?: number | null
          selfesteem_after?: number | null
          selfesteem_before?: number | null
          sleep_after?: number | null
          sleep_before?: number | null
          updated_at?: string
          user_id: string
          wellbeing_after?: number | null
          wellbeing_before?: number | null
        }
        Update: {
          bloating_after?: number | null
          bloating_before?: number | null
          clothes_after?: number | null
          clothes_before?: number | null
          created_at?: string
          energy_after?: number | null
          energy_before?: number | null
          id?: string
          mood_after?: number | null
          mood_before?: number | null
          selfesteem_after?: number | null
          selfesteem_before?: number | null
          sleep_after?: number | null
          sleep_before?: number | null
          updated_at?: string
          user_id?: string
          wellbeing_after?: number | null
          wellbeing_before?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string
          current_day: number
          dominant_hormone: string | null
          email: string
          full_name: string
          id: string
          joined_at: string
          last_active: string
          plan: string
          quiz_completed: boolean
        }
        Insert: {
          country?: string
          current_day?: number
          dominant_hormone?: string | null
          email?: string
          full_name?: string
          id: string
          joined_at?: string
          last_active?: string
          plan?: string
          quiz_completed?: boolean
        }
        Update: {
          country?: string
          current_day?: number
          dominant_hormone?: string | null
          email?: string
          full_name?: string
          id?: string
          joined_at?: string
          last_active?: string
          plan?: string
          quiz_completed?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
