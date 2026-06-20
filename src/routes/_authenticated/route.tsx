import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { supabase } from "@/integrations/supabase/client";

// Auth gate for all protected screens. Client-only because the Supabase session
// lives in localStorage and is not readable on the server.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  return (
    <div className="app-shell with-bottom-nav">
      <Outlet />
      <BottomNav />
    </div>
  );
}
