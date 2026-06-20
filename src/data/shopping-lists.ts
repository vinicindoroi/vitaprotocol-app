export interface ShoppingCategory {
  name: string;
  items: string[];
}

export interface ShoppingWeek {
  week: number;
  title: string;
  categories: ShoppingCategory[];
}

export const SHOPPING_LISTS: ShoppingWeek[] = [
  {
    week: 1,
    title: "Semana 1 — Cortisol",
    categories: [
      { name: "Verduras y vegetales", items: ["Espinaca", "Brócoli", "Aguacate", "Pepino"] },
      { name: "Proteínas", items: ["Huevos (12)", "Pollo (500 g)", "Atún en lata"] },
      { name: "Frutas", items: ["Limones", "Manzanas verdes"] },
      { name: "Despensa", items: ["Aceite de oliva", "Sal del Himalaya", "Cúrcuma", "Pimienta negra", "Café sin azúcar", "Chocolate negro +70%"] },
      { name: "Otros", items: ["Almendras", "Semillas de calabaza"] },
    ],
  },
  {
    week: 2,
    title: "Semana 2 — Insulina",
    categories: [
      { name: "Verduras y vegetales", items: ["Brócoli", "Ejotes / judías verdes", "Chayote", "Lechuga", "Tomate"] },
      { name: "Proteínas", items: ["Huevos", "Pollo", "Pescado blanco", "Queso fresco"] },
      { name: "Frutas", items: ["Fresas", "Arándanos"] },
      { name: "Despensa", items: ["Aceite de oliva", "Avena sin azúcar", "Lentejas", "Frijoles negros"] },
      { name: "Otros", items: ["Nueces de Castilla", "Mantequilla de maní sin azúcar"] },
    ],
  },
  {
    week: 3,
    title: "Semana 3 — Estrógeno + Tiroides",
    categories: [
      { name: "Verduras y vegetales", items: ["Coliflor", "Col / repollo", "Rábano", "Acelga", "Espinaca"] },
      { name: "Proteínas", items: ["Salmón o sardinas", "Huevos", "Mariscos (si es posible)"] },
      { name: "Frutas", items: ["Frutos rojos", "Naranja"] },
      { name: "Despensa", items: ["Semillas de linaza (moler en casa)", "Semillas de chía", "Nueces de Brasil"] },
      { name: "Otros", items: ["Algas marinas (si consigues)", "Suplemento de vitamina D (opcional)"] },
    ],
  },
  {
    week: 4,
    title: "Semana 4 — Leptina",
    categories: [
      { name: "Verduras y vegetales", items: ["Tus favoritos de las semanas anteriores"] },
      { name: "Proteínas", items: ["Pollo", "Huevo", "Queso cottage", "Legumbres"] },
      { name: "Frutas", items: ["Frutas enteras (no jugos)"] },
      { name: "Despensa", items: ["Mantequilla de maní sin azúcar", "Semillas de calabaza", "Aceite de coco"] },
      { name: "Otros", items: ["Todo lo que ya tienes"] },
    ],
  },
];
