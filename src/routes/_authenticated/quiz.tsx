import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { scoreQuiz } from "@/data/quiz";
import { type HormoneKey } from "@/data/hormones";
import { SofiaMessage } from "@/components/sofia-message";
import { supabase } from "@/integrations/supabase/client";
import { profileQueryKey } from "@/hooks/use-profile";
import { toast } from "sonner";
import { useLang } from "@/i18n";
import { useContent } from "@/i18n/content";

export const Route = createFileRoute("/_authenticated/quiz")({
  component: QuizPage,
});

type Phase = "questions" | "listening" | "preparing" | "result";

function QuizPage() {
  const { pick } = useLang();
  const { quiz: QUIZ, hormones: HORMONES } = useContent();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("questions");
  const [result, setResult] = useState<HormoneKey | null>(null);
  const qc = useQueryClient();
  const nav = useNavigate();

  useEffect(() => {
    if (phase !== "listening") return;
    const t1 = setTimeout(() => setPhase("preparing"), 2400);
    return () => clearTimeout(t1);
  }, [phase]);

  useEffect(() => {
    if (phase !== "preparing") return;
    (async () => {
      const r = scoreQuiz(answers);
      const { data: u } = await supabase.auth.getUser();
      if (u.user) {
        const { error } = await supabase
          .from("profiles")
          .update({ dominant_hormone: r, quiz_completed: true })
          .eq("id", u.user.id);
        if (error) toast.error(error.message);
        qc.invalidateQueries({ queryKey: profileQueryKey() });
      }
      setTimeout(() => {
        setResult(r);
        setPhase("result");
      }, 2400);
    })();
  }, [phase, answers, qc]);

  function selectOption(optIdx: number) {
    const next = [...answers];
    next[step] = optIdx;
    setAnswers(next);
    setTimeout(() => {
      if (step + 1 < QUIZ.length) setStep(step + 1);
      else setPhase("listening");
    }, 320);
  }

  if (phase === "listening" || phase === "preparing") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-8 text-center">
        <div className="animate-fade-up" key={phase}>
          <PulseDot />
          <p
            className="mt-8 text-[22px] leading-relaxed text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {phase === "listening"
              ? pick("Estamos identificando qué señales está mostrando tu cuerpo…", "We're identifying the signals your body is showing…")
              : pick("Tu protocolo se está preparando…", "Your protocol is being prepared…")}
          </p>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    const h = HORMONES[result];
    return (
      <div className="min-h-[100dvh] px-6 pt-12 pb-10 animate-fade-up">
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
          {pick("Diagnóstico listo", "Diagnostic ready")}
        </p>
        <h1
          className="mt-2 text-[26px] leading-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {pick("Tu cuerpo está pidiendo trabajar sobre:", "Your body is asking to work on:")}
        </h1>
        <div className="card-soft mt-6 p-6">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{ background: h.badgeBg, color: h.badgeText }}
          >
            <span className="text-base">{h.icon}</span> {h.name}
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{h.description}</p>
        </div>

        <div className="mt-6">
          <SofiaMessage>
            <p>{pick("Hoy empieza tu camino.", "Today your journey begins.")}</p>
            <p>{pick(
              "Vamos paso a paso, en secuencia. Tu cuerpo sabe responder cuando recibe las señales correctas.",
              "We'll go step by step, in sequence. Your body knows how to respond when it receives the right signals.",
            )}</p>
          </SofiaMessage>
        </div>

        <button
          onClick={() => nav({ to: "/dashboard" })}
          className="btn-primary mt-8"
        >
          {pick("Comenzar el Día 1", "Start Day 1")}
        </button>
      </div>
    );
  }

  const q = QUIZ[step];
  if (!q) return null;
  const selected = answers[step];
  return (
    <div className="flex min-h-[100dvh] flex-col px-7 pt-16 pb-10">
      <div className="mb-10 flex items-center gap-1">
        {QUIZ.map((_, i) => (
          <span
            key={i}
            className="h-[3px] flex-1 rounded-full transition-all"
            style={{ background: i <= step ? "var(--primary)" : "var(--border)" }}
          />
        ))}
      </div>

      <div className="animate-fade-up flex-1" key={step}>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {pick("Pregunta", "Question")} {step + 1} {pick("de", "of")} {QUIZ.length}
        </p>
        <h2
          className="mt-4 text-[26px] leading-snug text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {q.question}
        </h2>

        <div className="mt-8 space-y-3">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className="w-full rounded-xl border-[1.5px] px-4 py-4 text-left text-[15.5px] leading-snug transition-all"
                style={{
                  borderColor: isSel ? "var(--primary)" : "var(--border)",
                  background: isSel ? "var(--primary-soft)" : "var(--background)",
                  color: "var(--foreground)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-6 self-start text-[13px] font-medium text-muted-foreground"
        >
          {pick("← Anterior", "← Previous")}
        </button>
      )}
    </div>
  );
}

function PulseDot() {
  return (
    <div className="relative mx-auto h-16 w-16">
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: "var(--primary)", opacity: 0.15, animation: "pulseDot 1.6s ease-out infinite" }}
      />
      <span
        className="absolute inset-3 rounded-full"
        style={{ background: "var(--primary)", opacity: 0.35, animation: "pulseDot 1.6s ease-out infinite 0.3s" }}
      />
      <span className="absolute inset-[26px] rounded-full" style={{ background: "var(--primary)" }} />
      <style>{`@keyframes pulseDot { 0% { transform: scale(0.85); opacity: 0.6 } 100% { transform: scale(1.4); opacity: 0 } }`}</style>
    </div>
  );
}
