import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/integrations/supabase/client";
import { SofiaMessage } from "@/components/sofia-message";
import { toast } from "sonner";
import { useLang } from "@/i18n";

export const Route = createFileRoute("/_authenticated/journey-complete")({
  component: JourneyCompletePage,
});

function useDimensions() {
  const { pick } = useLang();
  return [
    { key: "energy", label: pick("Energía", "Energy") },
    { key: "sleep", label: pick("Sueño", "Sleep") },
    { key: "bloating", label: pick("Hinchazón", "Bloating") },
    { key: "wellbeing", label: pick("Bienestar", "Well-being") },
    { key: "clothes", label: pick("Cómo te queda la ropa", "How your clothes fit") },
    { key: "mood", label: pick("Humor", "Mood") },
    { key: "selfesteem", label: pick("Autoestima", "Self-esteem") },
  ] as const;
}

type Dim = ReturnType<typeof useDimensions>[number]["key"];

function JourneyCompletePage() {
  const { data: profile } = useProfile();
  const { pick } = useLang();
  const DIMENSIONS = useDimensions();
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
          {pick("Día 30 · Cierre", "Day 30 · Wrap-up")}
        </p>
        <h1 className="mt-3 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          {pick(`Llegaste${firstName ? `, ${firstName}` : ""}.`, `You made it${firstName ? `, ${firstName}` : ""}.`)}
        </h1>
        <div className="mt-6">
          <SofiaMessage>
            <p>{pick("Si llegaste hasta aquí, quiero que recuerdes una cosa.", "If you made it this far, I want you to remember one thing.")}</p>
            <p>{pick("Al comienzo tal vez creías que necesitabas una dieta más.", "At the start you may have thought you needed yet another diet.")}</p>
            <p>{pick("Hoy espero que hayas entendido que tu cuerpo solo necesitaba seguir el orden correcto.", "Today I hope you understand that your body just needed to follow the right order.")}</p>
          </SofiaMessage>
        </div>
        <button onClick={() => setPhase("reflect")} className="btn-primary mt-8">
          {pick("Mirar mi cambio", "See my change")}
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
          {pick("Tu jornada quedó registrada.", "Your journey has been recorded.")}
        </h1>
        <p className="mt-3 text-[14px] text-muted-foreground">
          {pick("Vuelve cuando quieras a leer lo que aprendiste sobre tu cuerpo.", "Come back anytime to read what you learned about your body.")}
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-10 animate-fade-up">
      <h1 className="text-[24px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        {pick("¿Cómo estabas entonces? ¿Y ahora?", "How were you then? And now?")}
      </h1>
      <p className="mt-2 text-[13px] text-muted-foreground">
        {pick("Sin números en la balanza. Solo cómo se siente tu cuerpo.", "No numbers on a scale. Just how your body feels.")}
      </p>

      <div className="mt-8 space-y-6">
        {DIMENSIONS.map((d) => (
          <div key={d.key}>
            <p className="text-[14px] font-semibold text-foreground">{d.label}</p>
            <ScaleRow
              caption={pick("Día 1", "Day 1")}
              value={before[d.key]}
              onChange={(v) => setBefore({ ...before, [d.key]: v })}
            />
            <ScaleRow
              caption={pick("Hoy", "Today")}
              value={after[d.key]}
              onChange={(v) => setAfter({ ...after, [d.key]: v })}
            />
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} className="btn-primary mt-10">
        {saving ? pick("Guardando…", "Saving…") : pick("Guardar mi cierre", "Save my wrap-up")}
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
