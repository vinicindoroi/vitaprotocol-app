import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, Salad, Compass, Sparkles, Hand, HelpCircle, CheckCircle2, Home, Calendar } from "lucide-react";

const STORAGE_KEY = "vp.tutorial.v1";

type Step = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  eyebrow: string;
};

const STEPS: Step[] = [
  {
    eyebrow: "Bienvenida",
    title: "Esto no es una dieta. Es un acompañamiento.",
    body: "Durante 30 días vas a enviarle a tu cuerpo señales suaves. Sin prohibiciones, sin conteos. Solo pequeños gestos diarios que reequilibran tus hormonas.",
    Icon: Sparkles,
  },
  {
    eyebrow: "Tu día",
    title: "Cinco pilares, todos los días.",
    body: "En la pantalla de inicio verás cinco íconos: Nutrir, Ritmo, Mover, Descanso y Agua. Son los gestos del día. No importa el orden.",
    Icon: Salad,
  },
  {
    eyebrow: "Cómo marcar",
    title: "Toca el ícono cuando lo completes.",
    body: "Al tocarlo, el círculo se vuelve verde con un check. Verás tu progreso del día en el porcentaje arriba a la derecha.",
    Icon: Hand,
  },
  {
    eyebrow: "Entender el porqué",
    title: "“¿Por qué esto?” en cada paso.",
    body: "Dentro del Protocolo diario, cada pilar tiene una nota corta que te explica la intención. Y el sello de Camila te da la mirada científica.",
    Icon: HelpCircle,
  },
  {
    eyebrow: "Cerrar el día",
    title: "Un cierre suave al terminar.",
    body: "Cuando completes los cinco pilares, la app te acompaña con una frase de Sofía. Ese es tu momento de reconocer lo que hiciste hoy.",
    Icon: CheckCircle2,
  },
  {
    eyebrow: "Tu jornada",
    title: "Cinco etapas de transformación.",
    body: "Diagnóstico, Reequilibrio, Activación, Transformación y Consolidación. En la pestaña Jornada ves en qué etapa estás y cuánto ya recorriste.",
    Icon: Compass,
  },
  {
    eyebrow: "Moverte en la app",
    title: "Todo vive en la barra inferior.",
    body: "Hoy es tu día actual. Protocolo abre el detalle de cada día. Jornada muestra tu progreso. Compras trae la lista y Perfil tus datos.",
    Icon: Home,
  },
  {
    eyebrow: "Constancia",
    title: "Un día no cuenta. Treinta transforman.",
    body: "Vuelve cada mañana. La app te espera con el día correcto — no tienes que buscarlo. Al llegar al Día 30 verás tu comparación completa.",
    Icon: Calendar,
  },
];


export function TutorialWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 350);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    localStorage.setItem(STORAGE_KEY, "done");
    setOpen(false);
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  }

  if (!open || typeof document === "undefined") return null;

  const s = STEPS[step];
  const { Icon } = s;
  const isLast = step === STEPS.length - 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center px-4 animate-fade-in"
      style={{ background: "rgba(27,58,46,0.55)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida"
    >
      <div
        key={step}
        className="animate-fade-up mb-4 w-full max-w-[440px] overflow-hidden rounded-[32px] bg-card"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <div
          className="relative flex items-center justify-center px-6 pb-8 pt-10"
          style={{
            background:
              "linear-gradient(160deg, var(--primary-soft) 0%, #FFFFFF 100%)",
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Saltar tutorial"
            className="tap absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.9)", color: "var(--primary)" }}
          >
            <X size={16} />
          </button>
          <div
            className="animate-breathe flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 20px 40px -14px rgba(45,106,79,0.55)",
            }}
          >
            <Icon size={30} strokeWidth={1.6} />
          </div>
        </div>

        <div className="px-7 pb-7 pt-5">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--primary)" }}
          >
            {s.eyebrow}
          </p>
          <h2
            className="mt-2 text-[22px] leading-[1.2]"
            style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
          >
            {s.title}
          </h2>
          <p
            className="mt-3 text-[14px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {s.body}
          </p>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 22 : 6,
                  background:
                    i === step ? "var(--primary)" : "rgba(45,106,79,0.2)",
                }}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            {!isLast && (
              <button
                type="button"
                onClick={close}
                className="tap text-[13px] font-semibold"
                style={{ color: "var(--muted-foreground)" }}
              >
                Saltar
              </button>
            )}
            <button type="button" onClick={next} className="btn-primary flex-1">
              <span>{isLast ? "Comenzar mi día" : "Siguiente"}</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
