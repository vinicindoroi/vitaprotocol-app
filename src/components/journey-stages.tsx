import { STAGES, type JourneyStage } from "@/data/journey";
import { Check } from "lucide-react";

interface Props {
  currentDay: number;
  quizCompleted: boolean;
}

export function JourneyStages({ currentDay, quizCompleted }: Props) {
  const activeIdx = getActiveIndex(currentDay, quizCompleted);
  return (
    <div className="relative">
      <div
        className="absolute left-[15px] top-3 bottom-3 w-[2px]"
        style={{ background: "var(--border)" }}
      />
      <ul className="space-y-5">
        {STAGES.map((s, i) => {
          const state: "past" | "current" | "future" =
            i < activeIdx ? "past" : i === activeIdx ? "current" : "future";
          return <StageRow key={s.key} stage={s} state={state} />;
        })}
      </ul>
    </div>
  );
}

function StageRow({ stage, state }: { stage: JourneyStage; state: "past" | "current" | "future" }) {
  const color =
    state === "current" ? "var(--primary)" : state === "past" ? "var(--accent)" : "var(--muted-foreground)";
  return (
    <li className="flex items-start gap-4">
      <div
        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
        style={{
          background: state === "future" ? "var(--background)" : color,
          color: state === "future" ? "var(--muted-foreground)" : "#fff",
          border: `2px solid ${state === "future" ? "var(--border)" : color}`,
          boxShadow: state === "current" ? "0 0 0 6px rgba(45,106,79,0.12)" : "none",
        }}
      >
        {state === "past" ? <Check size={14} strokeWidth={3} /> : null}
      </div>
      <div className="flex-1 pt-0.5">
        <p
          className="text-[15px]"
          style={{
            color: state === "future" ? "var(--muted-foreground)" : "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontWeight: state === "current" ? 600 : 500,
          }}
        >
          {stage.label}
        </p>
        <p className="text-[12.5px] text-muted-foreground">{stage.subtitle}</p>
        {state === "current" && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
            Estás aquí
          </p>
        )}
      </div>
    </li>
  );
}

function getActiveIndex(day: number, quizCompleted: boolean): number {
  if (!quizCompleted) return 0;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (day >= STAGES[i].from) return i;
  }
  return 0;
}
