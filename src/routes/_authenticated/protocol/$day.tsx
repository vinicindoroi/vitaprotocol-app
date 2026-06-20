import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile, useCompletions, profileQueryKey } from "@/hooks/use-profile";
import { PROTOCOL_DAYS } from "@/data/protocol-days";
import { MOTIVATIONAL } from "@/data/motivational";
import { LockedCard } from "@/components/locked-card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/protocol/$day")({
  component: ProtocolDayView,
});

function ProtocolDayView() {
  const { day: dayStr } = Route.useParams();
  const day = parseInt(dayStr, 10);
  const { data: profile } = useProfile();
  const { data: completions = [] } = useCompletions();
  const qc = useQueryClient();
  const nav = useNavigate();
  const [saving, setSaving] = useState(false);

  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;
  if (Number.isNaN(day) || day < 1 || day > 30) {
    return <div className="px-6 pt-12">Día no válido.</div>;
  }

  const content = PROTOCOL_DAYS[day - 1];
  const locked = profile.plan === "basic" && day > 7;
  const isDone = completions.includes(day);
  const canGoNext = day < 30 && (completions.includes(day) || day < profile.current_day);

  if (locked) {
    return (
      <div className="px-5 pt-8 pb-6">
        <BackBar day={day} />
        <div className="mt-6"><LockedCard /></div>
      </div>
    );
  }

  async function markDone() {
    if (!profile) return;
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { setSaving(false); return; }
    const { error } = await supabase.from("day_completions").insert({ user_id: u.user.id, day_number: day });
    if (error && !error.message.includes("duplicate")) { toast.error(error.message); setSaving(false); return; }
    const newCurrent = Math.max(profile.current_day, Math.min(day + 1, 30));
    await supabase.from("profiles").update({ current_day: newCurrent, last_active: new Date().toISOString() }).eq("id", u.user.id);
    qc.invalidateQueries({ queryKey: ["completions"] });
    qc.invalidateQueries({ queryKey: profileQueryKey() });
    setSaving(false);
    toast.success(MOTIVATIONAL[day - 1] ?? "¡Bien hecho!");
  }

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up" key={day}>
      <BackBar day={day} />
      <header className="mt-6">
        <p className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Día {day} de 30</p>
        <h1 className="mt-1 text-[26px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>{content.title}</h1>
      </header>

      <section className="content-block mt-5">
        <p className="text-xs font-semibold text-muted-foreground">🍽 ALIMENTACIÓN DE HOY</p>
        <p className="mt-1.5 text-foreground">{content.food}</p>
      </section>

      <section className="content-block mt-4">
        <p className="text-xs font-semibold text-muted-foreground">🌿 HÁBITO DEL DÍA</p>
        <p className="mt-1.5 text-foreground">{content.habit}</p>
      </section>

      <section className="content-block mt-4">
        <p className="text-xs font-semibold text-muted-foreground">⏰ HORARIOS RECOMENDADOS</p>
        <table className="mt-3 w-full text-sm">
          <tbody>
            <tr><td className="py-1.5 font-medium">Desayuno</td><td className="py-1.5 text-muted-foreground">{content.schedule.breakfast}</td></tr>
            <tr><td className="py-1.5 font-medium">Almuerzo</td><td className="py-1.5 text-muted-foreground">{content.schedule.lunch}</td></tr>
            <tr><td className="py-1.5 font-medium">Cena</td><td className="py-1.5 text-muted-foreground">{content.schedule.dinner}</td></tr>
          </tbody>
        </table>
      </section>

      <div className="mt-7">
        {isDone ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-primary-soft py-3 text-sm font-semibold" style={{ color: "var(--success)" }}>
            <Check size={18} /> Día completado
          </div>
        ) : (
          <button onClick={markDone} disabled={saving} className="btn-primary">
            {saving ? "Guardando…" : "✓ Marcar día como completado"}
          </button>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        {day > 1 ? (
          <Link to="/protocol/$day" params={{ day: String(day - 1) }} className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <ChevronLeft size={16} /> Día anterior
          </Link>
        ) : <span />}
        {canGoNext ? (
          <button
            onClick={() => nav({ to: "/protocol/$day", params: { day: String(day + 1) } })}
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--primary)" }}
          >
            Día siguiente <ChevronRight size={16} />
          </button>
        ) : <span />}
      </div>
    </div>
  );
}

function BackBar({ day }: { day: number }) {
  return (
    <Link to="/protocol" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
      <ChevronLeft size={16} /> Todos los días
    </Link>
  );
}
