export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  category: string;
  badge?: string;
  image: string; // emoji or short symbol used as visual
  accent: string; // background tint
  description: string;
  highlights: string[];
  ingredients?: string[];
  usage: string;
  ctaUrl: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "protocolo-completo",
    name: "Protocolo Completo 30 días",
    tagline: "El plan integral para reactivar tu ritmo hormonal.",
    price: 89,
    currency: "USD",
    category: "Programa",
    badge: "Más elegido",
    image: "◉",
    accent: "linear-gradient(155deg, #2D6A4F 0%, #1B3A2E 100%)",
    description:
      "Un acompañamiento diario de 30 días diseñado por Camila y Sofía para nutrir tu cuerpo, ordenar tu ritmo circadiano y devolver la calma a tu sistema hormonal.",
    highlights: [
      "Acceso completo a los 30 días del protocolo",
      "Listas de compra semanales personalizadas",
      "Meditaciones guiadas de Sofía",
      "Comunidad privada con acompañamiento",
    ],
    usage: "Sigue un paso al día. En 30 días tu cuerpo integra un nuevo ritmo.",
    ctaUrl: "https://example.com/checkout/protocolo-completo",
  },
  {
    id: "mineral-armonia",
    name: "Mineral Armonía",
    tagline: "Magnesio bisglicinato + potasio para el descanso profundo.",
    price: 34,
    currency: "USD",
    category: "Suplemento",
    image: "☾",
    accent: "linear-gradient(155deg, #EAF2ED 0%, #C9DED3 100%)",
    description:
      "Fórmula suave que apoya la relajación muscular, el sueño reparador y la respuesta al estrés. Sin aditivos, en cápsulas vegetales.",
    highlights: [
      "300mg de magnesio bisglicinato por dosis",
      "Coadyuvante del sueño profundo",
      "Sin gluten ni excipientes innecesarios",
    ],
    ingredients: ["Magnesio bisglicinato", "Potasio orgánico", "Glicina", "Vitamina B6"],
    usage: "1 cápsula 40 minutos antes de dormir, con agua.",
    ctaUrl: "https://example.com/checkout/mineral-armonia",
  },
  {
    id: "te-ritmo",
    name: "Té Ritmo",
    tagline: "Infusión adaptógena para las mañanas tranquilas.",
    price: 22,
    currency: "USD",
    category: "Infusión",
    image: "❋",
    accent: "linear-gradient(155deg, #F1F5F2 0%, #D8E4DC 100%)",
    description:
      "Mezcla artesanal de ashwagandha, rooibos y jengibre. Un ritual matinal para despertar sin sobresaltar tu sistema nervioso.",
    highlights: [
      "30 dosis por bolsa",
      "Sin cafeína, apto para todo ciclo",
      "Cosecha orgánica certificada",
    ],
    ingredients: ["Ashwagandha", "Rooibos", "Jengibre", "Cáscara de limón", "Cardamomo"],
    usage: "Una cucharadita en agua caliente durante 5 minutos. Cada mañana.",
    ctaUrl: "https://example.com/checkout/te-ritmo",
  },
  {
    id: "aceite-nutre",
    name: "Aceite Nutre",
    tagline: "Omega 3 vegetal prensado en frío.",
    price: 28,
    currency: "USD",
    category: "Suplemento",
    image: "◈",
    accent: "linear-gradient(155deg, #EAF2ED 0%, #B7CFC0 100%)",
    description:
      "Aceite de linaza y chía prensado en frío. Aporta ácidos grasos esenciales que sostienen la membrana celular y el equilibrio hormonal.",
    highlights: [
      "Prensado en frío, sin refinar",
      "Botella ámbar para preservar propiedades",
      "Ideal para ensaladas y desayunos",
    ],
    usage: "Una cucharada al día, en frío. Nunca calentar.",
    ctaUrl: "https://example.com/checkout/aceite-nutre",
  },
  {
    id: "diario-jornada",
    name: "Diario Jornada",
    tagline: "Cuaderno guiado para tus 30 días.",
    price: 18,
    currency: "USD",
    category: "Ritual",
    image: "❦",
    accent: "linear-gradient(155deg, #FAFBF9 0%, #E8EEE9 100%)",
    description:
      "Un diario editorial impreso en papel reciclado con espacios para registrar cómo se siente tu cuerpo cada día del protocolo.",
    highlights: [
      "128 páginas, papel crema",
      "Prompts diseñados por Sofía",
      "Marcapáginas de lino",
    ],
    usage: "Cinco minutos al final del día. Escribe sin juzgar.",
    ctaUrl: "https://example.com/checkout/diario-jornada",
  },
  {
    id: "kit-inicio",
    name: "Kit Inicio Consciente",
    tagline: "Todo lo esencial para tu primera semana.",
    price: 64,
    currency: "USD",
    category: "Kit",
    badge: "Ahorra 20%",
    image: "✦",
    accent: "linear-gradient(155deg, #2D6A4F 0%, #52B788 100%)",
    description:
      "Reúne Té Ritmo, Mineral Armonía y el Diario Jornada en un solo paquete pensado para empezar el protocolo con calma.",
    highlights: [
      "Incluye 3 productos esenciales",
      "Empaque de regalo incluido",
      "Envío prioritario",
    ],
    usage: "Todo lo que necesitas para tu primera semana del protocolo.",
    ctaUrl: "https://example.com/checkout/kit-inicio",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
