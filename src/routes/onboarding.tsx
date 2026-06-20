import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const SLIDES = [
  {
    title: "Bienvenida a vitaprotocol",
    text: "Tu protocolo personal de reequilibrio hormonal — diseñado para mujeres de 30 a 55 años.",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="20" r="8" />
        <path d="M28 38c0-6 5-10 12-10s12 4 12 10v14H28V38z" />
        <path d="M40 52v18M22 64h36" />
      </svg>
    ),
  },
  {
    title: "30 días. Un paso a la vez.",
    text: "Cada día te decimos exactamente qué comer, en qué horario y qué hábito incluir. Sin adivinar.",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="18" width="52" height="48" rx="6" />
        <path d="M14 30h52M26 14v10M54 14v10" />
        <path d="M30 48l8 8 14-16" />
      </svg>
    ),
  },
  {
    title: "Tu cuerpo no está roto",
    text: "Solo necesitaba el mapa correcto. Empieza hoy.",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 60l16-16 12 12 22-26" />
        <path d="M50 30h12v12" />
      </svg>
    ),
  },
];

export const Route = createFileRoute("/onboarding")({
  ssr: false,
  head: () => ({ meta: [{ title: "Bienvenida — vitaprotocol" }] }),
  component: Onboarding,
});

function Onboarding() {
  const [i, setI] = useState(0);
  const nav = useNavigate();
  const last = i === SLIDES.length - 1;

  const finish = () => {
    window.localStorage.setItem("onboarding_done", "1");
    nav({ to: "/auth" });
  };

  const s = SLIDES[i];
  return (
    <div className="app-shell flex flex-col" style={{ minHeight: "100dvh" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-fade-up" key={i}>
        <div className="mb-8 text-primary">{s.icon}</div>
        <h1 className="text-[28px] font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h1>
        <p className="mt-4 max-w-sm text-muted-foreground">{s.text}</p>
      </div>

      <div className="flex justify-center gap-2 pb-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ir a slide ${idx + 1}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: idx === i ? 24 : 8,
              background: idx === i ? "var(--primary)" : "var(--border)",
            }}
          />
        ))}
      </div>

      <div className="px-6 pb-8 safe-bottom">
        {last ? (
          <button onClick={finish} className="btn-primary">Comenzar mi diagnóstico →</button>
        ) : (
          <div className="flex gap-3">
            <button onClick={finish} className="btn-outline" style={{ flex: 1 }}>Saltar</button>
            <button onClick={() => setI(i + 1)} className="btn-primary" style={{ flex: 2 }}>Continuar →</button>
          </div>
        )}
      </div>
    </div>
  );
}
