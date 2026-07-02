import { useState } from "react";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import { CamilaNote } from "./camila-note";
import type { StepContent, StepKey } from "@/data/protocol-steps";
import { STEP_META } from "@/data/protocol-steps";

interface Props {
  step: StepKey;
  content: StepContent;
  done: boolean;
  onToggle: () => void;
  index: number;
}

export function DayStepCard({ step, content, done, onToggle, index }: Props) {
  const [openWhy, setOpenWhy] = useState(false);
  const meta = STEP_META[step];
  return (
    <div
      className="rounded-2xl border bg-card p-4 transition-all"
      style={{
        borderColor: done ? "var(--primary)" : "var(--border)",
        background: done ? "var(--primary-soft)" : "var(--card)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
          style={{ background: "var(--background)", border: "1px solid var(--border)" }}
        >
          {meta.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {index + 1}. {meta.label}
            </span>
          </div>
          <p className="mt-1 text-[15px] leading-snug text-foreground">{content.text}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onToggle}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-all"
          style={{
            background: done ? "var(--primary)" : "transparent",
            color: done ? "var(--primary-foreground)" : "var(--primary)",
            border: `1.5px solid var(--primary)`,
          }}
        >
          {done ? (
            <>
              <Check size={16} className="animate-scale-in" strokeWidth={3} />
              Concluido
            </>
          ) : (
            "Concluir"
          )}
        </button>
        <button
          onClick={() => setOpenWhy((v) => !v)}
          className="flex items-center gap-1 rounded-lg px-3 py-2.5 text-xs font-semibold text-muted-foreground"
          style={{ border: "1px solid var(--border)" }}
          aria-expanded={openWhy}
        >
          <HelpCircle size={14} />
          ¿Por qué?
          <ChevronDown size={12} style={{ transform: openWhy ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />
        </button>
      </div>

      {openWhy && (
        <div className="mt-3 animate-fade-up">
          <p className="text-[13px] leading-snug text-foreground/85">{content.why}</p>
          <CamilaNote text={content.camila} />
        </div>
      )}
    </div>
  );
}
