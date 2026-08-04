import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Nueva contraseña — vitaprotocol" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { pick } = useLang();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { toast.error(pick("Mínimo 8 caracteres", "Minimum 8 characters")); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(pick("Contraseña actualizada", "Password updated"));
    nav({ to: "/" });
  }

  return (
    <div className="app-shell px-6 pt-16">
      <h1 className="text-2xl text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{pick("Nueva contraseña", "New password")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{pick("Elige una contraseña segura para tu cuenta.", "Choose a secure password for your account.")}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="password"
          required
          minLength={8}
          placeholder={pick("Nueva contraseña", "New password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary"
        />
        <button disabled={loading} className="btn-primary">{loading ? pick("Guardando…", "Saving…") : pick("Guardar nueva contraseña", "Save new password")}</button>
      </form>
    </div>
  );
}
