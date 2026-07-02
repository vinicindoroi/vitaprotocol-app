import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile } from "@/hooks/use-profile";
import { useAllStepCompletions } from "@/hooks/use-day-steps";
import { DAY_STEPS, STEP_ORDER, STEP_META, type StepKey } from "@/data/protocol-steps";
import { getStage } from "@/data/journey";
import { UPGRADE_URL } from "@/lib/config";
import { TutorialWizard } from "@/components/tutorial-wizard";
import { ArrowRight, Lock, Check, Salad, Sparkles, Footprints, Moon, Droplet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const STEP_ICONS: Record<StepKey, LucideIcon> = {
  food: Salad,
  habit: Sparkles,
  movement: Footprints,
  sleep: Moon,
  water: Droplet,
};

const STEP_SHORT: Record<StepKey, string> = {
  food: "Nutrir",
  habit: "Ritmo",
  movement: "Mover",
  sleep: "Descanso",
  water: "Agua",
};

function Dashboard() {
  const { data: profile, isLoading } = useProfile();
  const { data: completions = [] } = useAllStepCompletions();
  if (isLoading || !profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  if (!profile.quiz_completed) return <DiagnosticInvite />;

  const currentDay = Math.min(profile.current_day, 30);
  const day = DAY_STEPS[currentDay - 1];
  const firstName = (profile.full_name || "").split(" ")[0] || "";
  const greeting = getGreeting();
  const doneToday = new Set(
    completions.filter((c) => c.day_number === currentDay).map((c) => c.step),
  );
  const remaining = STEP_ORDER.filter((s) => !doneToday.has(s));
  const stage = getStage(currentDay, profile.quiz_completed);
  const progress = Math.round((STEP_ORDER.length - remaining.length) / STEP_ORDER.length * 100);

  return (
    <div className="px-5 pt-12 pb-6 space-y-7">
      <TutorialWizard />
      {/* Saludo — editorial */}
      <header className="animate-fade-up" data-tour="hero">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "rgba(45,106,79,0.6)" }}
        >
          Día {currentDay} · {stage.label}
        </p>
        <h1
          className="mt-1.5 text-[28px] leading-[1.15]"
          style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
        >
          {greeting}{firstName ? `, ${firstName}` : ""}.<br />
          <span className="italic font-normal" style={{ color: "var(--primary)" }}>
            {remaining.length === 0
              ? "hoy tu cuerpo recibió todo."
              : remaining.length === STEP_ORDER.length
              ? "empecemos con calma."
              : "vas hermoso, sigue."}
          </span>
        </h1>
      </header>



      {/* Card principal: 5 pilares */}
      <section
        className="animate-fade-up delay-1 rounded-[32px] border bg-card p-6"
        style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}
        data-tour="today"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold" style={{ color: "var(--primary-deep)" }}>
            Tu día de hoy
          </h2>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
            data-tour="progress"
          >
            {progress}%
          </span>
        </div>

        <p
          className="mt-1 text-[13px] italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--muted-foreground)" }}
        >
          {day.title}
        </p>

        <div className="mt-5 grid grid-cols-5 gap-2" data-tour="pillars">
          {STEP_ORDER.map((s, i) => {
            const Icon = STEP_ICONS[s];
            const isDone = doneToday.has(s);
            return (
              <div
                key={s}
                className={`flex flex-col items-center gap-2 animate-fade-up delay-${i + 1}`}
              >
                <div
                  className="tap flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={
                    isDone
                      ? {
                          background: "var(--primary)",
                          color: "#fff",
                          boxShadow: "0 8px 20px -8px rgba(45,106,79,0.5)",
                        }
                      : {
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                          border: "1px solid rgba(45,106,79,0.08)",
                        }
                  }
                >
                  {isDone ? (
                    <Check size={20} strokeWidth={2.5} className="animate-check-pop" />
                  ) : (
                    <Icon size={19} strokeWidth={1.8} />
                  )}
                </div>
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: isDone ? "var(--primary)" : "rgba(27,58,46,0.5)",
                  }}
                >
                  {STEP_SHORT[s]}
                </span>
              </div>
            );
          })}
        </div>

        <Link
          to="/protocol/$day"
          params={{ day: String(currentDay) }}
          className="tap mt-6 flex items-center justify-between rounded-2xl px-4 py-3"
          style={{ background: "var(--muted)" }}
        >
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--primary)" }}
            >
              Siguiente paso
            </p>
            <p
              className="mt-0.5 truncate text-[13px]"
              style={{ color: "var(--primary-deep)" }}
            >
              {remaining.length > 0
                ? STEP_META[remaining[0]].label
                : "Cerrar el día"}
            </p>
          </div>
          <ArrowRight size={16} style={{ color: "var(--primary)" }} />
        </Link>
      </section>

      {/* Jornada — card oscuro con luz */}
      <section className="animate-fade-up delay-2">
        <h2
          className="mb-3 text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
        >
          Tu jornada de 30 días
        </h2>
        <Link
          to="/progress"
          className="tap relative block overflow-hidden rounded-[32px] p-7"
          style={{
            background: "linear-gradient(155deg, #2D6A4F 0%, #1B3A2E 100%)",
            boxShadow: "var(--shadow-float)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <div className="relative flex items-center gap-5">
            <div
              className="relative h-24 w-[3px] shrink-0 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <div
                className="absolute top-0 w-full animate-glow rounded-full"
                style={{
                  height: `${Math.max(15, (currentDay / 30) * 100)}%`,
                  background: "#fff",
                }}
              />
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Etapa actual
              </p>
              <h3
                className="mt-1 text-[20px] font-semibold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stage.label}
              </h3>
              <p
                className="mt-1 text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                {stage.subtitle}.
              </p>
            </div>
          </div>
          <div className="relative mt-5 flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background:
                    i < Math.ceil(currentDay / 6)
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </Link>
      </section>

      {/* Insight de Camila */}
      <section
        className="animate-fade-up delay-3 rounded-[32px] p-6"
        style={{ background: "var(--primary-soft)" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0 4px 12px -4px rgba(45,106,79,0.25)" }}
          >
            <span
              className="text-[15px] font-bold italic"
              style={{ color: "var(--primary)", fontFamily: "var(--font-display)" }}
            >
              C
            </span>
          </div>
          <div className="min-w-0 space-y-1.5">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.16em] italic"
              style={{ color: "var(--primary)" }}
            >
              Visión de Camila
            </p>
            <p
              className="text-[14px] leading-relaxed"
              style={{ color: "var(--primary-deep)" }}
            >
              {day.food.camila}
            </p>
          </div>
        </div>
      </section>

      {profile.plan === "basic" && currentDay >= 5 && (
        <section
          className="animate-fade-up delay-4 rounded-[28px] p-5"
          style={{
            background: "var(--card)",
            border: "1px dashed rgba(45,106,79,0.4)",
          }}
        >
          <div className="flex items-center gap-2">
            <Lock size={14} style={{ color: "var(--primary)" }} />
            <p className="text-[13px] font-semibold" style={{ color: "var(--primary-deep)" }}>
              El protocolo continúa después del Día 7.
            </p>
          </div>
          <a
            href={UPGRADE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-[13px] font-semibold"
            style={{ color: "var(--primary)" }}
          >
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
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "var(--primary)" }}
      >
        Primer paso
      </p>
      <h1
        className="mt-2 text-[30px] leading-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
      >
        Antes de comenzar,{" "}
        <span className="italic" style={{ color: "var(--primary)" }}>
          quiero escucharte.
        </span>
      </h1>
      <p className="mt-4 text-[15px]" style={{ color: "var(--muted-foreground)" }}>
        Unas preguntas breves nos permiten preparar tu protocolo a partir de las
        señales que tu cuerpo está mostrando ahora.
      </p>
      <Link to="/quiz" className="btn-primary mt-10">
        Comenzar el diagnóstico
      </Link>
    </div>
  );
}
