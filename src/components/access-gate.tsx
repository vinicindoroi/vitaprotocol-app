import { useQueryClient } from "@tanstack/react-query";
import { Lock, LogOut, Mail, RefreshCw } from "lucide-react";
import { usePurchaseAccess } from "@/hooks/use-purchase-access";
import { useLang } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { SUPPORT_EMAIL, UPGRADE_URL } from "@/lib/config";

export function AccessGate({ children }: { children: React.ReactNode }) {
  const { data, isLoading, refetch, isFetching } = usePurchaseAccess();
  const { pick } = useLang();
  const qc = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        {pick("Cargando…", "Loading…")}
      </div>
    );
  }

  if (data?.allowed) return <>{children}</>;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Lock className="h-7 w-7 text-primary" />
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          {pick("Aún no encontramos tu compra", "We couldn't find your purchase yet")}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {pick(
            "El acceso se libera automáticamente cuando tu pago es aprobado. Asegúrate de entrar con el mismo correo que usaste en la compra.",
            "Access is unlocked automatically once your payment is approved. Make sure you sign in with the same email you used at checkout.",
          )}
        </p>
        {data?.email ? (
          <p className="text-xs text-muted-foreground">
            {pick("Sesión actual:", "Signed in as:")} <strong>{data.email}</strong>
          </p>
        ) : null}
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => refetch()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          {pick("Ya pagué, verificar de nuevo", "I already paid, check again")}
        </button>
        <a
          href={UPGRADE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-medium transition-transform active:scale-[0.98]"
        >
          {pick("Quiero comprar el protocolo", "I want to buy the protocol")}
        </a>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm text-muted-foreground"
        >
          <Mail className="h-4 w-4" />
          {SUPPORT_EMAIL}
        </a>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            qc.clear();
            window.location.href = "/auth";
          }}
          className="flex w-full items-center justify-center gap-2 py-2 text-xs text-muted-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          {pick("Salir de la cuenta", "Sign out")}
        </button>
      </div>
    </div>
  );
}
