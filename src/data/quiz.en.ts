import type { QuizQuestion } from "./quiz";

export const QUIZ_EN: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your main symptom?",
    options: [
      { label: "Extreme tiredness even when I sleep well", scores: { cortisol: 2 } },
      { label: "Bloating and fluid retention", scores: { estrogeno: 2 } },
      { label: "Hair loss and slow metabolism", scores: { tiroides: 2 } },
      { label: "Sugar cravings and constant hunger", scores: { insulina: 2 } },
      { label: "I feel full but still gain weight", scores: { leptina: 2 } },
    ],
  },
  {
    id: 2,
    question: "How would you describe your daily stress level?",
    options: [
      { label: "High — work, family, always busy", scores: { cortisol: 2 } },
      { label: "Moderate — some days more than others", scores: { cortisol: 1 } },
      { label: "Low — I'm pretty calm", scores: {} },
    ],
  },
  {
    id: 3,
    question: "How is your sleep?",
    options: [
      { label: "I sleep poorly, I wake up at night", scores: { cortisol: 1, leptina: 1 } },
      { label: "I sleep well but wake up tired", scores: { tiroides: 2 } },
      { label: "I sleep well and wake up with energy", scores: {} },
    ],
  },
  {
    id: 4,
    question: "Is your menstrual cycle regular?",
    options: [
      { label: "Yes, regular", scores: {} },
      { label: "Irregular, with pain", scores: { estrogeno: 2 } },
      { label: "In menopause or perimenopause", scores: { estrogeno: 2, cortisol: 1 } },
      { label: "I don't have a cycle (hormonal IUD, etc.)", scores: {} },
    ],
  },
  {
    id: 5,
    question: "What best describes your relationship with food?",
    options: [
      { label: "I eat little but still gain weight", scores: { tiroides: 2, leptina: 1 } },
      { label: "I have strong sugar cravings", scores: { insulina: 2 } },
      { label: "I eat normally but always feel bloated", scores: { estrogeno: 2 } },
      { label: "I eat well but don't lose weight", scores: { cortisol: 1, insulina: 1 } },
    ],
  },
];
