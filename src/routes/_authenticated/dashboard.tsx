import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile, useCompletions } from "@/hooks/use-profile";
import { HORMONES, type HormoneKey } from "@/data/hormones";
import { PROTOCOL_DAYS } from "@/data/protocol-days";
import { ProgressBar } from "@/components/progress-bar";
import { UPGRADE_URL, TELEGRAM_URL } from "@/lib/config";
import { Calendar, BarChart3, ShoppingCart, MessagesSquare, Lock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function Dashboard() {
  const { data: profile, isLoading } = useProfile();
  const { data: completions = [] } = useCompletions();
  if (isLoading || !profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  const currentDay = Math.min(profile.current_day, 30);
  const week = Math.ceil(currentDay / 7);
  const day = PROTOCOL_DAYS[currentDay - 1];
  const pctDone = (completions.length / 30) * 100;
  const hormone = (profile.dominant_hormone as HormoneKey | null) && HORMONES[profile.dominant_hormone as HormoneKey];
  const firstName = profile.full_name.split(" ")[0] || "amiga";

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <header>
        <h1 className="text-[22px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Hola, {firstName} 👋
        </h1>
        <p className="mt-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
          Día {currentDay} de 30 — Semana {week}
        </p>
        <div className="mt-3"><ProgressBar value={pctDone} /></div>
      </header>

      {day && (
        <section className="content-block-soft mt-6">
          <div className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
            📅 Día {day.day} — {WEEKDAYS[new Date().getDay()]}
          </div>
          <h2 className="mt-1 text-[20px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {day.title}
          </h2>
          <p className="mt-2 text-sm text-foreground/80 line-clamp-2">{day.food}</p>
          <Link to="/protocol/$day" params={{ day: String(currentDay) }} className="btn-primary mt-4">
            Ver el protocolo de hoy →
          </Link>
        </section>
      )}

      {hormone && (
        <section className="card-soft mt-5 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu hormona prioritaria</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xl">{hormone.icon}</span>
            <h3 className="text-base font-semibold text-foreground">{hormone.name}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{hormone.focus}</p>
          <Link to="/profile" className="mt-3 inline-block text-sm font-medium" style={{ color: "var(--primary)" }}>
            Ver más sobre tu perfil →
          </Link>
        </section>
      )}

      <section className="mt-6 grid grid-cols-2 gap-3">
        <Quick to="/protocol" icon={<Calendar size={22} />} label="Mi protocolo" />
        <Quick to="/progress" icon={<BarChart3 size={22} />} label="Mi progreso" />
        {profile.plan === "complete" ? (
          <>
            <Quick to="/shopping" icon={<ShoppingCart size={22} />} label="Lista de compras" />
            <QuickExternal href={TELEGRAM_URL} icon={<MessagesSquare size={22} />} label="Comunidad" />
          </>
        ) : (
          <>
            <Quick to="/shopping" icon={<Lock size={18} />} label="Lista de compras" muted />
            <QuickExternal href={UPGRADE_URL} icon={<Lock size={18} />} label="Comunidad" muted />
          </>
        )}
      </section>

      {profile.plan === "basic" && (
        <section
          className="mt-7 rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, var(--primary-soft), var(--background))",
            border: "1.5px dashed var(--primary)",
          }}
        >
          <p className="text-sm font-semibold text-foreground">
            🔓 Desbloquea los 30 días completos
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            + lista de compras + guía de síntomas + comunidad privada.
          </p>
          <a href={UPGRADE_URL} target="_blank" rel="noreferrer" className="btn-outline mt-4">
            Ver oferta especial →
          </a>
        </section>
      )}
    </div>
  );
}

function Quick({ to, icon, label, muted }: { to: "/protocol" | "/progress" | "/shopping"; icon: React.ReactNode; label: string; muted?: boolean }) {
  return (
    <Link to={to} className="card-soft flex flex-col gap-2 p-4" style={{ opacity: muted ? 0.7 : 1 }}>
      <span style={{ color: "var(--primary)" }}>{icon}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </Link>
  );
}
function QuickExternal({ href, icon, label, muted }: { href: string; icon: React.ReactNode; label: string; muted?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card-soft flex flex-col gap-2 p-4" style={{ opacity: muted ? 0.7 : 1 }}>
      <span style={{ color: "var(--primary)" }}>{icon}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </a>
  );
}
