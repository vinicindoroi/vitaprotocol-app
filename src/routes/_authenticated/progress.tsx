import { createFileRoute } from "@tanstack/react-router";
import { useProfile, useCompletions } from "@/hooks/use-profile";
import { MOTIVATIONAL } from "@/data/motivational";
import { HORMONES, type HormoneKey } from "@/data/hormones";

export const Route = createFileRoute("/_authenticated/progress")({
  component: ProgressPage,
});

const BADGES = [
  { days: 7, emoji: "🌱", label: "Primera semana" },
  { days: 14, emoji: "🌿", label: "Dos semanas" },
  { days: 21, emoji: "💪", label: "Tres semanas" },
  { days: 30, emoji: "🏆", label: "Protocolo completo" },
];

function ProgressPage() {
  const { data: profile } = useProfile();
  const { data: completions = [] } = useCompletions();
  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  const done = new Set(completions);
  const streak = computeStreak(completions);
  const dayIndex = (new Date().getDate() - 1) % 30;
  const phrase = MOTIVATIONAL[dayIndex];
  const hormone = profile.dominant_hormone ? HORMONES[profile.dominant_hormone as HormoneKey] : null;
  const since = new Date(profile.joined_at).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <h1 className="text-[24px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>Tu progreso</h1>

      <section className="card-soft mt-5 p-5">
        <Row k="Días completados" v={`${completions.length} de 30`} />
        <Row k="Racha actual" v={`${streak} ${streak === 1 ? "día" : "días"} seguidos`} />
        <Row k="Miembro desde" v={since} />
        {hormone && <Row k="Tu hormona prioritaria" v={hormone.name} />}
      </section>

      <section className="mt-6">
        <p className="text-xs font-semibold text-muted-foreground">CONSISTENCIA</p>
        <div className="mt-3 grid grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => {
            const d = i + 1;
            const isDone = done.has(d);
            const isCurrent = d === profile.current_day;
            const isLocked = profile.plan === "basic" && d > 7;
            return (
              <div
                key={d}
                title={`Día ${d}`}
                className="aspect-square rounded"
                style={{
                  background: isDone ? "var(--primary)" : isCurrent ? "var(--accent)" : isLocked ? "var(--border)" : "var(--primary-soft)",
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-7">
        <p className="text-xs font-semibold text-muted-foreground">CONQUISTAS</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {BADGES.map((b) => {
            const earned = completions.length >= b.days;
            return (
              <div
                key={b.days}
                className="card-soft flex items-center gap-3 p-4"
                style={{ opacity: earned ? 1 : 0.45 }}
              >
                <div className="text-2xl">{b.emoji}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.days} días</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="content-block-soft mt-7">
        <p className="text-xs font-semibold text-muted-foreground">FRASE DEL DÍA</p>
        <p className="mt-1.5 text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>"{phrase}"</p>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{k}</span>
      <span className="text-sm font-semibold text-foreground">{v}</span>
    </div>
  );
}

function computeStreak(days: number[]): number {
  if (!days.length) return 0;
  const sorted = [...new Set(days)].sort((a, b) => b - a);
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 1) streak++;
    else break;
  }
  return streak;
}
