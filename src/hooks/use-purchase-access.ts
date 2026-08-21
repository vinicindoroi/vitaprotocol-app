import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePurchaseAccess() {
  return useQuery({
    queryKey: ["purchase-access"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const email = u.user?.email?.toLowerCase() ?? null;
      if (!email) return { email: null, allowed: false };
      const { data, error } = await supabase
        .from("purchase_access")
        .select("email,status,plan")
        .eq("email", email)
        .maybeSingle();
      if (error) throw error;
      return { email, allowed: data?.status === "approved", plan: data?.plan ?? null };
    },
    staleTime: 60_000,
    retry: 1,
  });
}
