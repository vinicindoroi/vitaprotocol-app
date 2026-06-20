import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile, profileQueryKey } from "@/hooks/use-profile";
import { HORMONES, type HormoneKey } from "@/data/hormones";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UPGRADE_URL, SUPPORT_EMAIL } from "@/lib/config";
import { LogOut, KeyRound, Bell, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { data: profile } = useProfile();
  const qc = useQueryClient();
  const nav = useNavigate();
  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  const initial = (profile.full_name || profile.email || "?").trim().charAt(0).toUpperCase();
  const hormone = profile.dominant_hormone ? HORMONES[profile.dominant_hormone as HormoneKey] : null;

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  async function resetQuiz() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { error } = await supabase.from("profiles").update({ quiz_completed: false, dominant_hormone: null }).eq("id", u.user.id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: profileQueryKey() });
    nav({ to: "/quiz" });
  }

  async function changePassword() {
    if (!profile) return;
    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Te enviamos un correo para cambiar la contraseña");
  }

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <header className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
          {initial}
        </div>
        <div>
          <h1 className="text-[20px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>{profile.full_name || "Sin nombre"}</h1>
          <p className="text-xs text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground">{profile.country}</p>
        </div>
      </header>

      <section className="card-soft mt-6 p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu plan</p>
        {profile.plan === "complete" ? (
          <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
            ✓ Plan Completo
          </div>
        ) : (
          <>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
              Plan Básico
            </div>
            <a href={UPGRADE_URL} target="_blank" rel="noreferrer" className="btn-primary mt-4">Actualizar a Completo →</a>
          </>
        )}
      </section>

      {hormone && (
        <section className="card-soft mt-5 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu hormona</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xl">{hormone.icon}</span>
            <h3 className="text-base font-semibold">{hormone.name}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{hormone.description}</p>
          <button onClick={resetQuiz} className="btn-outline mt-4">Repetir diagnóstico</button>
        </section>
      )}

      <section className="mt-7 space-y-1">
        <Row icon={<KeyRound size={18} />} label="Cambiar contraseña" onClick={changePassword} />
        <Row icon={<Bell size={18} />} label="Notificaciones (próximamente)" onClick={() => toast.info("Disponible pronto")} />
        <Row icon={<FileText size={18} />} label={`Soporte: ${SUPPORT_EMAIL}`} onClick={() => (window.location.href = `mailto:${SUPPORT_EMAIL}`)} />
        <Row icon={<LogOut size={18} />} label="Cerrar sesión" onClick={signOut} danger />
      </section>

      <p className="mt-6 text-center text-xs text-muted-foreground">Política de privacidad · Términos de uso</p>
    </div>
  );
}

function Row({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left transition active:bg-muted"
      style={{ color: danger ? "var(--destructive)" : "var(--foreground)" }}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
