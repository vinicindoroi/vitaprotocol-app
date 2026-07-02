import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useProfile, profileQueryKey } from "@/hooks/use-profile";
import { useDaySteps, useToggleStep } from "@/hooks/use-day-steps";
import { DAY_STEPS, STEP_ORDER } from "@/data/protocol-steps";
import { DayStepCard } from "@/components/day-step-card";
import { SofiaMessage } from "@/components/sofia-message";
import { LockedCard } from "@/components/locked-card";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/protocol/$day")({
  component: ProtocolDayView,
});

const CLOSING_MESSAGES = [
  "Tu cuerpo recibió las señales correctas hoy.",
  "Un paso más concluido.",
  "Continúa mañana. El protocolo funciona por consistencia.",
];

function ProtocolDayView() {
  const { day: dayStr } = Route.useParams();
  const day = parseInt(dayStr, 10);
  const { data: profile } = useProfile();
  const { done } = useDaySteps(day);
  const toggle = useToggleStep();
  const qc = useQueryClient();
  const nav = useNavigate();
  const [showClosing, setShowClosing] = useState(false);
  const [wasComplete, setWasComplete] = useState(false);

  const allComplete = STEP_ORDER.every((s) => done.has(s));

  // When user completes the last step of the day, advance current_day and show closing.
  useEffect(() => {
    if (!profile || Number.isNaN(day)) return;
    if (allComplete && !wasComplete) {
      setWasComplete(true);
      setShowClosing(true);
      (async () => {
        const { data: u } = await supabase.auth.getUser();
        if (!u.user) return;
        const newCurrent = Math.max(profile.current_day, Math.min(day + 1, 30));
        // Also insert into legacy day_completions for the calendar view.
        await supabase.from("day_completions").insert({ user_id: u.user.id, day_number: day }).then(() => {});
        await supabase.from("profiles").update({ current_day: newCurrent, last_active: new Date().toISOString() }).eq("id", u.user.id);
        qc.invalidateQueries({ queryKey: profileQueryKey() });
        qc.invalidateQueries({ queryKey: ["completions"] });
        if (day === 30) setTimeout(() => nav({ to: "/journey-complete" }), 1800);
      })();
    }
    if (!allComplete && wasComplete) setWasComplete(false);
  }, [allComplete, wasComplete, day, profile, qc, nav]);

  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;
  if (Number.isNaN(day) || day < 1 || day > 30) {
    return <div className="px-6 pt-12">Día no válido.</div>;
  }

  const content = DAY_STEPS[day - 1];
  const locked = profile.plan === "basic" && day > 7;

  if (locked) {
    return (
      <div className="px-5 pt-8 pb-6">
        <BackBar />
        <div className="mt-6"><LockedCard /></div>
      </div>
    );
  }

  const closingText = CLOSING_MESSAGES[(day - 1) % CLOSING_MESSAGES.length];

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up" key={day}>
      <BackBar />

      <header className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
          Día {day} · Hoy
        </p>
        <h1
          className="mt-1 text-[24px] leading-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {content.title}
        </h1>
      </header>

      <div className="mt-6 space-y-3">
        {STEP_ORDER.map((s, i) => (
          <DayStepCard
            key={s}
            step={s}
            content={content[s]}
            index={i}
            done={done.has(s)}
            onToggle={() => toggle.mutate({ day, step: s, done: !done.has(s) })}
          />
        ))}
      </div>

      {showClosing && (
        <div className="mt-6 animate-fade-up">
          <SofiaMessage>
            <p>{closingText}</p>
          </SofiaMessage>
          <button
            className="mt-3 w-full text-center text-[13px] text-muted-foreground"
            onClick={() => setShowClosing(false)}
          >
            cerrar
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        {day > 1 ? (
          <Link
            to="/protocol/$day"
            params={{ day: String(day - 1) }}
            className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground"
          >
            <ChevronLeft size={14} /> Día anterior
          </Link>
        ) : <span />}
        {day < 30 && day < profile.current_day ? (
          <Link
            to="/protocol/$day"
            params={{ day: String(day + 1) }}
            className="flex items-center gap-1 text-[13px] font-medium"
            style={{ color: "var(--primary)" }}
          >
            Día siguiente <ChevronRight size={14} />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}

function BackBar() {
  return (
    <Link to="/protocol" className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
      <ChevronLeft size={14} /> Todos los días
    </Link>
  );
}
