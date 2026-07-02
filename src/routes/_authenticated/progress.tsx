import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile, useCompletions } from "@/hooks/use-profile";
import { JourneyStages } from "@/components/journey-stages";
import { TutorialWizard } from "@/components/tutorial-wizard";
import { JOURNEY_TOUR } from "@/data/tours";
import { getStage } from "@/data/journey";

export const Route = createFileRoute("/_authenticated/progress")({
  component: JourneyPage,
});

function JourneyPage() {
  const { data: profile } = useProfile();
  const { data: completions = [] } = useCompletions();
  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  const currentDay = Math.min(profile.current_day, 30);
  const stage = getStage(currentDay, profile.quiz_completed);
  const done = new Set(completions);

  return (
    <div className="px-5 pt-10 pb-6 animate-fade-up">
      <TutorialWizard steps={JOURNEY_TOUR} storageKey="vp.tour.journey.v1" />
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
        Tu jornada
      </p>
      <h1 className="mt-2 text-[26px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        Estás en {stage.label}.
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">{stage.subtitle}.</p>

      <section className="mt-8" data-tour="journey-stages">
        <JourneyStages currentDay={currentDay} quizCompleted={profile.quiz_completed} />
      </section>

      <section className="mt-10" data-tour="journey-dots">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Los 30 días
        </p>
        <div className="mt-3 grid grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => {
            const d = i + 1;
            const isDone = done.has(d);
            const isCurrent = d === currentDay;
            const isLocked = profile.plan === "basic" && d > 7;
            return (
              <Link
                key={d}
                to="/protocol/$day"
                params={{ day: String(d) }}
                title={`Día ${d}`}
                className="aspect-square rounded"
                style={{
                  background: isDone
                    ? "var(--primary)"
                    : isCurrent
                    ? "var(--accent)"
                    : isLocked
                    ? "var(--border)"
                    : "var(--primary-soft)",
                }}
              />
            );
          })}
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          Cada punto es un día del protocolo. Los verdes son los que ya viviste.
        </p>
      </section>
    </div>
  );
}
