// Las 5 etapas de la jornada. Se derivan del día actual.
export interface JourneyStage {
  key: "diagnostico" | "reequilibrio" | "activacion" | "transformacion" | "consolidacion";
  label: string;
  subtitle: string;
  from: number; // día inicial (0 = antes del día 1, sólo diagnóstico)
  to: number;
}

export const STAGES: JourneyStage[] = [
  { key: "diagnostico",   label: "Diagnóstico",    subtitle: "Escuchando las señales de tu cuerpo", from: 0,  to: 0  },
  { key: "reequilibrio",  label: "Reequilibrio",   subtitle: "Bajando los niveles de alerta",      from: 1,  to: 7  },
  { key: "activacion",    label: "Activación",     subtitle: "El organismo empieza a responder",   from: 8,  to: 15 },
  { key: "transformacion",label: "Transformación", subtitle: "Los cambios se hacen visibles",      from: 16, to: 24 },
  { key: "consolidacion", label: "Consolidación",  subtitle: "Tu nuevo ritmo se vuelve tuyo",      from: 25, to: 30 },
];

export function getStage(day: number, quizCompleted: boolean): JourneyStage {
  if (!quizCompleted) return STAGES[0];
  const s = STAGES.find((s) => day >= s.from && day <= s.to);
  return s ?? STAGES[1];
}
