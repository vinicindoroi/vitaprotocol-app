import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile, useCompletions } from "@/hooks/use-profile";
import { TutorialWizard } from "@/components/tutorial-wizard";
import { useLang } from "@/i18n";
import { useContent } from "@/i18n/content";
import { Lock, Check, Circle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/protocol/")({
  component: ProtocolCalendar,
});

function ProtocolCalendar() {
  const { pick } = useLang();
  const { protocolDays: PROTOCOL_DAYS, tours } = useContent();
  const { data: profile } = useProfile();
  const { data: completions = [] } = useCompletions();
  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">{pick("Cargando…", "Loading…")}</div>;

  const limit = profile.plan === "complete" ? 30 : 7;
  const done = new Set(completions);
  const current = profile.current_day;

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <TutorialWizard steps={tours.protocol} storageKey="vp.tour.protocol.v1" />
      <h1 className="text-[24px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>{pick("Tu protocolo", "Your protocol")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{pick("30 días paso a paso.", "30 days, step by step.")}</p>

      <div className="mt-6 grid grid-cols-4 gap-3" data-tour="protocol-grid">
        {PROTOCOL_DAYS.map((d) => {
          const isDone = done.has(d.day);
          const isCurrent = d.day === current;
          const isLocked = d.day > limit;
          return (
            <Link
              key={d.day}
              to="/protocol/$day"
              params={{ day: String(d.day) }}
              className="aspect-square rounded-xl border p-2 flex flex-col items-center justify-center text-center transition"
              style={{
                borderColor: isCurrent ? "var(--primary)" : "var(--border)",
                background: isDone ? "var(--primary-soft)" : isLocked ? "var(--muted)" : "var(--background)",
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              <div className="text-lg font-semibold" style={{ color: isCurrent ? "var(--primary)" : "var(--foreground)" }}>
                {d.day}
              </div>
              {isDone ? <Check size={14} color="var(--success)" /> : isLocked ? <Lock size={12} color="var(--muted-foreground)" /> : isCurrent ? <Circle size={10} fill="var(--primary)" color="var(--primary)" /> : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
