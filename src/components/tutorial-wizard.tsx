import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const DEFAULT_STORAGE_KEY = "vp.tutorial.v3";

export type TourStep = {
  target?: string; // data-tour selector; omitted => centered welcome/close
  eyebrow: string;
  title: string;
  body: string;
  placement?: "top" | "bottom" | "auto";
  padding?: number;
};

const DASHBOARD_STEPS: TourStep[] = [
  {
    eyebrow: "Bienvenida",
    title: "Te voy a mostrar cómo usar tu protocolo.",
    body: "Son 8 pasos muy cortos. Vas a ver, en la propia pantalla, para qué sirve cada parte de la app.",
  },
  {
    target: "[data-tour='hero']",
    eyebrow: "Tu saludo diario",
    title: "Aquí sabes en qué día estás.",
    body: "Cada mañana la app te recibe con tu nombre, el día actual y la etapa de la jornada en la que te encuentras.",
    placement: "bottom",
  },
  {
    target: "[data-tour='today']",
    eyebrow: "El día de hoy",
    title: "Este es tu bloque principal.",
    body: "Todo lo que necesitas hoy vive dentro de esta tarjeta: los cinco pilares, tu avance y el siguiente paso.",
    placement: "bottom",
  },
  {
    target: "[data-tour='pillars']",
    eyebrow: "Los cinco pilares",
    title: "Toca cada ícono cuando lo completes.",
    body: "Nutrir, Ritmo, Mover, Descanso y Agua. Se vuelven verdes con un check al marcarlos. No importa el orden.",
    placement: "bottom",
  },
  {
    target: "[data-tour='progress']",
    eyebrow: "Tu progreso",
    title: "Este porcentaje sigue tu día.",
    body: "Sube a medida que marcas los pilares. Cuando llega al 100%, tu cuerpo recibió todas las señales del día.",
    placement: "bottom",
    padding: 12,
  },
  {
    target: "[data-tour='next-step']",
    eyebrow: "Siguiente paso",
    title: "Toca aquí para ver el detalle.",
    body: "Abre el Protocolo del día: cada pilar con su explicación, el “¿Por qué esto?” y el sello de Camila.",
    placement: "top",
  },
  {
    target: "[data-tour='journey']",
    eyebrow: "Tu jornada",
    title: "Las cinco etapas de 30 días.",
    body: "Diagnóstico, Reequilibrio, Activación, Transformación y Consolidación. Toca la tarjeta para ver todo el camino.",
    placement: "top",
  },
  {
    target: "[data-tour='camila']",
    eyebrow: "Visión de Camila",
    title: "La ciencia detrás de cada gesto.",
    body: "Camila te da la explicación clínica. Sofía, en el Protocolo diario, te acompaña con la parte emocional.",
    placement: "top",
  },
  {
    target: "[data-tour='nav']",
    eyebrow: "Moverte en la app",
    title: "Todo vive en esta barra.",
    body: "Hoy · Protocolo · Jornada · Compras · Perfil. Vuelve cada día — la app abre siempre en el día correcto.",
    placement: "top",
    padding: 14,
  },
  {
    eyebrow: "Listo",
    title: "Nos vemos mañana temprano.",
    body: "Un día no cuenta, treinta transforman. Empieza por el primer pilar cuando estés lista.",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

export function TutorialWizard({
  steps = DASHBOARD_STEPS,
  storageKey = DEFAULT_STORAGE_KEY,
}: {
  steps?: TourStep[];
  storageKey?: string;
} = {}) {
  const STEPS = steps;
  const STORAGE_KEY = storageKey;
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(220);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const step = STEPS[i];

  // Measure target rect + scroll it into view
  useLayoutEffect(() => {
    if (!open) return;
    if (!step.target) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.target) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    let raf = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    // Re-measure after scroll animation settles
    const t1 = window.setTimeout(measure, 200);
    const t2 = window.setTimeout(measure, 500);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [i, open, step.target]);

  useLayoutEffect(() => {
    if (cardRef.current) setCardH(cardRef.current.offsetHeight);
  }, [i, open, rect, viewport.w]);

  if (!open || typeof document === "undefined") return null;

  function close() {
    localStorage.setItem(STORAGE_KEY, "done");
    setOpen(false);
  }
  function next() {
    if (i < STEPS.length - 1) setI(i + 1);
    else close();
  }
  function prev() {
    if (i > 0) setI(i - 1);
  }

  const pad = step.padding ?? 10;
  const hasTarget = !!rect;

  // Cutout box (with padding). Constrained to viewport for the mask.
  const cut = rect
    ? {
        top: Math.max(0, rect.top - pad),
        left: Math.max(0, rect.left - pad),
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      }
    : null;

  // Card placement
  const cardWidth = Math.min(380, viewport.w - 24);
  const margin = 16;
  let cardTop: number;
  let cardLeft: number;

  if (!hasTarget || !cut) {
    cardTop = Math.max(20, (viewport.h - cardH) / 2);
    cardLeft = (viewport.w - cardWidth) / 2;
  } else {
    const spaceBelow = viewport.h - (cut.top + cut.height);
    const spaceAbove = cut.top;
    const placeBelow =
      step.placement === "bottom" ||
      (step.placement !== "top" && spaceBelow > spaceAbove);
    cardTop = placeBelow
      ? Math.min(cut.top + cut.height + margin, viewport.h - cardH - 20)
      : Math.max(20, cut.top - cardH - margin);
    cardLeft = Math.min(
      Math.max(12, cut.left + cut.width / 2 - cardWidth / 2),
      viewport.w - cardWidth - 12,
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial"
      style={{ pointerEvents: "auto" }}
    >
      {/* SVG mask overlay with cutout */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ pointerEvents: "auto" }}
      >
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {cut && (
              <rect
                x={cut.left}
                y={cut.top}
                width={cut.width}
                height={cut.height}
                rx={20}
                ry={20}
                fill="black"
                style={{ transition: "all 380ms cubic-bezier(0.22,1,0.36,1)" }}
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(27,58,46,0.62)"
          mask="url(#tour-mask)"
          style={{ backdropFilter: "blur(2px)" }}
        />
        {cut && (
          <rect
            x={cut.left}
            y={cut.top}
            width={cut.width}
            height={cut.height}
            rx={20}
            ry={20}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={2}
            style={{
              transition: "all 380ms cubic-bezier(0.22,1,0.36,1)",
              filter: "drop-shadow(0 0 12px rgba(82,183,136,0.7))",
            }}
          />
        )}
      </svg>

      {/* Coach-mark card */}
      <div
        ref={cardRef}
        key={i}
        className="animate-fade-up absolute rounded-[28px] bg-card p-5"
        style={{
          top: cardTop,
          left: cardLeft,
          width: cardWidth,
          boxShadow: "var(--shadow-float)",
          transition: "top 380ms cubic-bezier(0.22,1,0.36,1), left 380ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--primary)" }}
          >
            {step.eyebrow}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Saltar tutorial"
            className="tap -mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            <X size={14} />
          </button>
        </div>

        <h2
          className="mt-2 text-[19px] leading-[1.2]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--primary-deep)",
          }}
        >
          {step.title}
        </h2>
        <p
          className="mt-2 text-[13.5px] leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {step.body}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {STEPS.map((_, idx) => (
              <span
                key={idx}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === i ? 18 : 5,
                  background:
                    idx === i ? "var(--primary)" : "rgba(45,106,79,0.22)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {i > 0 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="tap flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: "var(--muted)",
                  color: "var(--primary)",
                }}
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="tap inline-flex h-10 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white"
              style={{
                background: "var(--primary)",
                boxShadow: "0 10px 22px -10px rgba(45,106,79,0.6)",
              }}
            >
              {i === STEPS.length - 1 ? "Comenzar" : "Siguiente"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
