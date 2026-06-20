// Hormone profiles shown after the diagnostic quiz.
export type HormoneKey = "cortisol" | "estrogeno" | "tiroides" | "insulina" | "leptina";

export interface HormoneProfile {
  key: HormoneKey;
  name: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  focus: string;
}

export const HORMONES: Record<HormoneKey, HormoneProfile> = {
  cortisol: {
    key: "cortisol",
    name: "Patrón de Cortisol Elevado",
    icon: "🧠",
    badgeBg: "#FFEDD5",
    badgeText: "#9A3412",
    description:
      "Tu cuerpo está en modo de alerta constante. El cortisol elevado acumula grasa abdominal y bloquea la quema de energía — aunque comas poco.",
    focus:
      "Las primeras 2 semanas priorizamos reducir el cortisol con ajustes de horario y alimentación anti-inflamatoria.",
  },
  estrogeno: {
    key: "estrogeno",
    name: "Patrón de Estrógeno Dominante",
    icon: "💧",
    badgeBg: "#EDE9FE",
    badgeText: "#5B21B6",
    description:
      "La retención de líquidos, la hinchazón y el ciclo irregular son señales de que el estrógeno está fuera de balance respecto a la progesterona.",
    focus:
      "Tu protocolo empieza con alimentos que ayudan al hígado a procesar el exceso de estrógeno.",
  },
  tiroides: {
    key: "tiroides",
    name: "Patrón de Tiroides Lenta",
    icon: "🔋",
    badgeBg: "#DBEAFE",
    badgeText: "#1E40AF",
    description:
      "Metabolismo lento, cabello débil, cansancio constante — tu tiroides necesita los nutrientes correctos para acelerar sin medicación.",
    focus:
      "Priorizamos minerales clave y horarios de comida que activan la función tiroidea.",
  },
  insulina: {
    key: "insulina",
    name: "Patrón de Resistencia a la Insulina",
    icon: "🍬",
    badgeBg: "#FEF3C7",
    badgeText: "#92400E",
    description:
      "El hambre constante y la ansiedad por dulce no son falta de fuerza de voluntad — es tu insulina desregulada enviando señales equivocadas.",
    focus:
      "Reorganizamos el orden y la composición de tus comidas para estabilizar la glucosa.",
  },
  leptina: {
    key: "leptina",
    name: "Patrón de Resistencia a la Leptina",
    icon: "🔕",
    badgeBg: "#DCFCE7",
    badgeText: "#166534",
    description:
      "Tu cerebro no recibe la señal de saciedad correctamente — por eso sientes que nunca estás satisfecha aunque hayas comido suficiente.",
    focus:
      "El protocolo restaura la sensibilidad a la leptina con hábitos de sueño y alimentación estratégica.",
  },
};
