import type { HormoneKey } from "./hormones";

export interface QuizOption {
  label: string;
  scores: Partial<Record<HormoneKey, number>>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es tu principal síntoma?",
    options: [
      { label: "Cansancio extremo aunque duerma bien", scores: { cortisol: 2 } },
      { label: "Hinchazón y retención de líquidos", scores: { estrogeno: 2 } },
      { label: "Caída de cabello y metabolismo lento", scores: { tiroides: 2 } },
      { label: "Ansiedad por dulce y hambre constante", scores: { insulina: 2 } },
      { label: "Me siento satisfecha pero igual subo de peso", scores: { leptina: 2 } },
    ],
  },
  {
    id: 2,
    question: "¿Cómo describes tu nivel de estrés diario?",
    options: [
      { label: "Alto — trabajo, familia, siempre ocupada", scores: { cortisol: 2 } },
      { label: "Moderado — algunos días más que otros", scores: { cortisol: 1 } },
      { label: "Bajo — soy bastante tranquila", scores: {} },
    ],
  },
  {
    id: 3,
    question: "¿Cómo es tu sueño?",
    options: [
      { label: "Duermo mal, me despierto de noche", scores: { cortisol: 1, leptina: 1 } },
      { label: "Duermo bien pero me levanto cansada", scores: { tiroides: 2 } },
      { label: "Duermo bien y me levanto con energía", scores: {} },
    ],
  },
  {
    id: 4,
    question: "¿Tienes ciclo menstrual regular?",
    options: [
      { label: "Sí, regular", scores: {} },
      { label: "Irregular, con dolor", scores: { estrogeno: 2 } },
      { label: "En menopausia o perimenopausia", scores: { estrogeno: 2, cortisol: 1 } },
      { label: "No tengo ciclo (DIU hormonal, etc.)", scores: {} },
    ],
  },
  {
    id: 5,
    question: "¿Qué describe mejor tu relación con la comida?",
    options: [
      { label: "Como poco pero engordo igual", scores: { tiroides: 2, leptina: 1 } },
      { label: "Tengo muchas ganas de comer dulce", scores: { insulina: 2 } },
      { label: "Como normal pero me hincho siempre", scores: { estrogeno: 2 } },
      { label: "Como bien pero no pierdo peso", scores: { cortisol: 1, insulina: 1 } },
    ],
  },
];

export function scoreQuiz(answers: number[]): HormoneKey {
  const totals: Record<HormoneKey, number> = {
    cortisol: 0,
    estrogeno: 0,
    tiroides: 0,
    insulina: 0,
    leptina: 0,
  };
  answers.forEach((optIdx, qIdx) => {
    const opt = QUIZ[qIdx]?.options[optIdx];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.scores)) {
      totals[k as HormoneKey] += v ?? 0;
    }
  });
  let winner: HormoneKey = "cortisol";
  let max = -1;
  (Object.keys(totals) as HormoneKey[]).forEach((k) => {
    if (totals[k] > max) {
      max = totals[k];
      winner = k;
    }
  });
  return winner;
}
