import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/integrations/supabase/client";
import { SofiaMessage } from "@/components/sofia-message";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/journey-complete")({
  component: JourneyCompletePage,
});

const DIMENSIONS = [
  { key: "energy",     label: "Energía" },
  { key: "sleep",      label: "Sueño" },
  { key: "bloating",   label: "Hinchazón" },
  { key: "wellbeing",  label: "Bienestar" },
  { key: "clothes",    label: "Cómo te queda la ropa" },
  { key: "mood",       label: "Humor" },
  { key: "selfesteem", label: "Autoestima" },
] as const;

type Dim = typeof DIMENSIONS[number]["key"];

function JourneyCompletePage() {
  const { data: profile } = useProfile();
  const [phase, setPhase] = useState<"letter" | "reflect" | "done">("letter");
  const [before, setBefore] = useState<Record<Dim, number>>(() => ({} as any));
  const [after, setAfter] = useState<Record<Dim, number>>(() => ({} as any));
  const [saving, setSaving] = useState(false);

  const firstName = (profile?.full_name || "").split(" ")[0] || "";

  async function save() {
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { setSaving(false); return; }
    const payload: Record<string, any> = { user_id: u.user.id };
    for (const d of DIMENSIONS) {
      payload[`${d.key}_before`] = before[d.key] ?? null;
      payload[`${d.key}_after`] = after[d.key] ?? null;
    }
    const { error } = await supabase
      .from("journey_reflection")
      .upsert(payload, { onConflict: "user_id" });
    if (error) toast.error(error.message);
    else setPhase("done");
    setSaving(false);
  }

  if (phase === "letter") {
    return (
      <div className="min-h-[100dvh] px-6 pt-14 pb-10 animate-fade-up">
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
          Día 30 · Cierre
        </p>
        <h1 className="mt-3 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          Llegaste{firstName ? `, ${firstName}` : ""}.
        </h1>
        <div className="mt-6">
          <SofiaMessage>
            <p>Si llegaste hasta aquí, quiero que recuerdes una cosa.</p>
            <p>Al comienzo tal vez creías que necesitabas una dieta más.</p>
            <p>Hoy espero que hayas entendido que tu cuerpo solo necesitaba seguir el orden correcto.</p>
          </SofiaMessage>
        </div>
        <button onClick={() => setPhase("reflect")} className="btn-primary mt-8">
          Mirar mi cambio
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="min-h-[100dvh] px-6 pt-16 pb-10 text-center animate-fade-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--primary)" }}>
          <span className="text-2xl text-white">✓</span>
        </div>
        <h1 className="mt-6 text-[24px]" style={{ fontFamily: "var(--font-display)" }}>
          Tu jornada quedó registrada.
        </h1>
        <p className="mt-3 text-[14px] text-muted-foreground">
          Vuelve cuando quieras a leer lo que aprendiste sobre tu cuerpo.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-10 animate-fade-up">
      <h1 className="text-[24px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        ¿Cómo estabas entonces? ¿Y ahora?
      </h1>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Sin números en la balanza. Solo cómo se siente tu cuerpo.
      </p>

      <div className="mt-8 space-y-6">
        {DIMENSIONS.map((d) => (
          <div key={d.key}>
            <p className="text-[14px] font-semibold text-foreground">{d.label}</p>
            <ScaleRow
              caption="Día 1"
              value={before[d.key]}
              onChange={(v) => setBefore({ ...before, [d.key]: v })}
            />
            <ScaleRow
              caption="Hoy"
              value={after[d.key]}
              onChange={(v) => setAfter({ ...after, [d.key]: v })}
            />
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} className="btn-primary mt-10">
        {saving ? "Guardando…" : "Guardar mi cierre"}
      </button>
    </div>
  );
}

function ScaleRow({ caption, value, onChange }: { caption: string; value: number | undefined; onChange: (v: number) => void }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="w-12 shrink-0 text-[11px] text-muted-foreground">{caption}</span>
      <div className="flex flex-1 gap-1">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className="h-8 flex-1 rounded-md text-[12px] font-semibold transition-all"
              style={{
                background: active ? "var(--primary)" : "var(--muted)",
                color: active ? "#fff" : "var(--muted-foreground)",
                border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
