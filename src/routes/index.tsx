import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

// Entry redirector: figures out where to send the user based on state.
// Runs client-side only (Supabase session lives in localStorage).
export const Route = createFileRoute("/")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const onboardingDone = window.localStorage.getItem("onboarding_done") === "1";
    if (!onboardingDone) throw redirect({ to: "/onboarding" });

    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });

    // Check if quiz is complete
    const { data: profile } = await supabase
      .from("profiles")
      .select("quiz_completed")
      .eq("id", data.user.id)
      .maybeSingle();
    if (!profile?.quiz_completed) throw redirect({ to: "/quiz" });
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});
