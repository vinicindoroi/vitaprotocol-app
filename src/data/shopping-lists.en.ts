import type { ShoppingCategory, ShoppingWeek } from "./shopping-lists";

export const SHOPPING_LISTS_EN: ShoppingWeek[] = [
  {
    week: 1,
    title: "Week 1 — Cortisol",
    categories: [
      { name: "Vegetables", items: ["Spinach", "Broccoli", "Avocado", "Cucumber"] },
      { name: "Protein", items: ["Eggs (12)", "Chicken (500 g)", "Canned tuna"] },
      { name: "Fruit", items: ["Lemons", "Green apples"] },
      { name: "Pantry", items: ["Olive oil", "Himalayan salt", "Turmeric", "Black pepper", "Coffee without sugar", "Dark chocolate +70%"] },
      { name: "Other", items: ["Almonds", "Pumpkin seeds"] },
    ],
  },
  {
    week: 2,
    title: "Week 2 — Insulin",
    categories: [
      { name: "Vegetables", items: ["Broccoli", "Green beans", "Chayote", "Lettuce", "Tomato"] },
      { name: "Protein", items: ["Eggs", "Chicken", "White fish", "Fresh cheese"] },
      { name: "Fruit", items: ["Strawberries", "Blueberries"] },
      { name: "Pantry", items: ["Olive oil", "Sugar-free oats", "Lentils", "Black beans"] },
      { name: "Other", items: ["Walnuts", "Sugar-free peanut butter"] },
    ],
  },
  {
    week: 3,
    title: "Week 3 — Estrogen + Thyroid",
    categories: [
      { name: "Vegetables", items: ["Cauliflower", "Cabbage", "Radish", "Chard", "Spinach"] },
      { name: "Protein", items: ["Salmon or sardines", "Eggs", "Seafood (if possible)"] },
      { name: "Fruit", items: ["Berries", "Orange"] },
      { name: "Pantry", items: ["Flaxseed (grind at home)", "Chia seeds", "Brazil nuts"] },
      { name: "Other", items: ["Seaweed (if available)", "Vitamin D supplement (optional)"] },
    ],
  },
  {
    week: 4,
    title: "Week 4 — Leptin",
    categories: [
      { name: "Vegetables", items: ["Your favorites from previous weeks"] },
      { name: "Protein", items: ["Chicken", "Egg", "Cottage cheese", "Legumes"] },
      { name: "Fruit", items: ["Whole fruit (not juices)"] },
      { name: "Pantry", items: ["Sugar-free peanut butter", "Pumpkin seeds", "Coconut oil"] },
      { name: "Other", items: ["Everything you already have"] },
    ],
  },
];
