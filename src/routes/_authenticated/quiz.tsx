import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUIZ, scoreQuiz } from "@/data/quiz";
import { HORMONES, type HormoneKey } from "@/data/hormones";
import { ProgressBar } from "@/components/progress-bar";
import { supabase } from "@/integrations/supabase/client";
import { profileQueryKey } from "@/hooks/use-profile";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const [step, setStep] = useState(0); // 0..QUIZ.length (last = result)
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<HormoneKey | null>(null);
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();
  const nav = useNavigate();
  const isResult = step === QUIZ.length;
  const pct = (Math.min(step, QUIZ.length) / QUIZ.length) * 100;

  useEffect(() => {
    if (isResult && !result) {
      const r = scoreQuiz(answers);
      setResult(r);
      // save in background
      (async () => {
        setSaving(true);
        const { data: u } = await supabase.auth.getUser();
        if (u.user) {
          const { error } = await supabase
            .from("profiles")
            .update({ dominant_hormone: r, quiz_completed: true })
            .eq("id", u.user.id);
          if (error) toast.error(error.message);
          qc.invalidateQueries({ queryKey: profileQueryKey() });
        }
        setSaving(false);
      })();
    }
  }, [isResult, result, answers, qc]);

  function pick(optIdx: number) {
    const next = [...answers];
    next[step] = optIdx;
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 350);
  }

  if (isResult && result) {
    const h = HORMONES[result];
    return (
      <div className="px-6 pt-10 pb-10 animate-fade-up">
        <h1 className="text-[26px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>Tu diagnóstico está listo ✓</h1>
        <p className="mt-2 text-muted-foreground">Tu principal desequilibrio hormonal es:</p>
        <div className="card-soft mt-6 p-6">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: h.badgeBg, color: h.badgeText }}>
            <span className="text-base">{h.icon}</span> {h.name}
          </div>
          <p className="mt-4 text-foreground" style={{ lineHeight: 1.7 }}>{h.description}</p>
          <div className="content-block-soft mt-5">
            <p className="text-sm font-semibold text-primary">Enfoque del protocolo</p>
            <p className="mt-1 text-sm text-foreground">{h.focus}</p>
          </div>
        </div>
        <button onClick={() => nav({ to: "/dashboard" })} disabled={saving} className="btn-primary mt-8">
          {saving ? "Guardando…" : "Comenzar el Día 1 de mi protocolo →"}
        </button>
      </div>
    );
  }

  const q = QUIZ[step];
  if (!q) return null;
  const selected = answers[step];
  return (
    <div className="px-6 pt-10 pb-10">
      <div className="mb-6">
        <ProgressBar value={pct} />
        <p className="mt-2 text-xs text-muted-foreground">Pregunta {step + 1} de {QUIZ.length}</p>
      </div>
      <div className="animate-fade-up" key={step}>
        <h2 className="text-[22px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>{q.question}</h2>
        <div className="mt-6 space-y-3">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                className="w-full rounded-xl border-2 px-4 py-4 text-left text-base transition"
                style={{
                  borderColor: isSel ? "var(--primary)" : "var(--border)",
                  background: isSel ? "var(--primary-soft)" : "var(--background)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
      {step > 0 && (
        <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm font-medium text-muted-foreground">← Atrás</button>
      )}
    </div>
  );
}
