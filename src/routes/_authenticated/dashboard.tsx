import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile } from "@/hooks/use-profile";
import { useAllStepCompletions } from "@/hooks/use-day-steps";
import { DAY_STEPS, STEP_ORDER, STEP_META } from "@/data/protocol-steps";
import { getStage } from "@/data/journey";
import { UPGRADE_URL } from "@/lib/config";
import { ArrowRight, Lock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: profile, isLoading } = useProfile();
  const { data: completions = [] } = useAllStepCompletions();
  if (isLoading || !profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  // If quiz not done, gently guide to it — first step of the journey.
  if (!profile.quiz_completed) {
    return <DiagnosticInvite />;
  }

  const currentDay = Math.min(profile.current_day, 30);
  const day = DAY_STEPS[currentDay - 1];
  const firstName = (profile.full_name || "").split(" ")[0] || "";
  const greeting = getGreeting();
  const doneToday = new Set(
    completions.filter((c) => c.day_number === currentDay).map((c) => c.step),
  );
  const remaining = STEP_ORDER.filter((s) => !doneToday.has(s));
  const stage = getStage(currentDay, profile.quiz_completed);

  return (
    <div className="px-5 pt-10 pb-6 animate-fade-up">
      <header>
        <h1
          className="text-[24px] leading-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {greeting}{firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Hoy es tu Día {currentDay} de VitalProtocol.
        </p>
      </header>

      <section className="mt-8">
        <p className="text-[15px] text-foreground/85">
          {remaining.length === 0
            ? "Hoy tu cuerpo recibió todas las señales correctas."
            : `Hoy solo necesitas completar ${remaining.length === 5 ? "cinco" : remaining.length === 4 ? "cuatro" : remaining.length === 3 ? "tres" : remaining.length === 2 ? "dos" : "un"} paso${remaining.length === 1 ? "" : "s"}.`}
        </p>

        <Link
          to="/protocol/$day"
          params={{ day: String(currentDay) }}
          className="mt-4 block rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
            Tu día de hoy
          </p>
          <h2
            className="mt-1 text-[20px] leading-snug text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {day.title}
          </h2>

          <ul className="mt-4 space-y-2.5">
            {STEP_ORDER.map((s, i) => {
              const isDone = doneToday.has(s);
              const m = STEP_META[s];
              return (
                <li key={s} className="flex items-center gap-3 text-[14px]">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px]"
                    style={{
                      background: isDone ? "var(--primary)" : "var(--muted)",
                      color: isDone ? "#fff" : "var(--muted-foreground)",
                    }}
                  >
                    {isDone ? "✓" : i + 1}
                  </span>
                  <span
                    style={{
                      color: isDone ? "var(--muted-foreground)" : "var(--foreground)",
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {m.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex items-center justify-end gap-1 text-[13px] font-semibold" style={{ color: "var(--primary)" }}>
            Abrir día <ArrowRight size={14} />
          </div>
        </Link>
      </section>

      <section className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Tu jornada
        </p>
        <div
          className="mt-2 rounded-xl border border-border bg-card p-4"
        >
          <p className="text-[15px]" style={{ fontFamily: "var(--font-display)" }}>
            Estás en <span style={{ color: "var(--primary)" }}>{stage.label}</span>.
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">{stage.subtitle}.</p>
          <Link to="/progress" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: "var(--primary)" }}>
            Ver la jornada completa <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {profile.plan === "basic" && currentDay >= 5 && (
        <section
          className="mt-6 rounded-2xl p-4"
          style={{
            background: "var(--primary-soft)",
            border: "1px dashed var(--primary)",
          }}
        >
          <div className="flex items-center gap-2">
            <Lock size={14} style={{ color: "var(--primary)" }} />
            <p className="text-[13px] font-semibold text-foreground">
              El protocolo continúa después del Día 7.
            </p>
          </div>
          <a href={UPGRADE_URL} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[13px]" style={{ color: "var(--primary)" }}>
            Continuar la secuencia completa →
          </a>
        </section>
      )}
    </div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

function DiagnosticInvite() {
  return (
    <div className="px-6 pt-16 animate-fade-up">
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
        Primer paso
      </p>
      <h1 className="mt-2 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        Antes de comenzar, quiero escucharte.
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        Unas preguntas breves nos permiten preparar tu protocolo a partir de las
        señales que tu cuerpo está mostrando ahora.
      </p>
      <Link to="/quiz" className="btn-primary mt-8">
        Comenzar el diagnóstico
      </Link>
    </div>
  );
}
