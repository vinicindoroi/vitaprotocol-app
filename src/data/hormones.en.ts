import type { HormoneKey, HormoneProfile } from "./hormones";

export const HORMONES_EN: Record<HormoneKey, HormoneProfile> = {
  cortisol: {
    key: "cortisol",
    name: "Elevated Cortisol Pattern",
    icon: "🧠",
    badgeBg: "#FFEDD5",
    badgeText: "#9A3412",
    description:
      "Your body is in constant alert mode. Elevated cortisol builds up abdominal fat and blocks energy burning — even if you eat little.",
    focus:
      "In the first 2 weeks we prioritize lowering cortisol with schedule adjustments and anti-inflammatory nutrition.",
  },
  estrogeno: {
    key: "estrogeno",
    name: "Estrogen Dominance Pattern",
    icon: "💧",
    badgeBg: "#EDE9FE",
    badgeText: "#5B21B6",
    description:
      "Fluid retention, bloating, and an irregular cycle are signs that estrogen is out of balance with progesterone.",
    focus:
      "Your protocol starts with foods that help your liver process excess estrogen.",
  },
  tiroides: {
    key: "tiroides",
    name: "Sluggish Thyroid Pattern",
    icon: "🔋",
    badgeBg: "#DBEAFE",
    badgeText: "#1E40AF",
    description:
      "Slow metabolism, weak hair, constant tiredness — your thyroid needs the right nutrients to speed up without medication.",
    focus:
      "We prioritize key minerals and meal timing that activate thyroid function.",
  },
  insulina: {
    key: "insulina",
    name: "Insulin Resistance Pattern",
    icon: "🍬",
    badgeBg: "#FEF3C7",
    badgeText: "#92400E",
    description:
      "Constant hunger and sugar cravings aren't a lack of willpower — it's your dysregulated insulin sending the wrong signals.",
    focus:
      "We rearrange the order and composition of your meals to stabilize glucose.",
  },
  leptina: {
    key: "leptina",
    name: "Leptin Resistance Pattern",
    icon: "🔕",
    badgeBg: "#DCFCE7",
    badgeText: "#166534",
    description:
      "Your brain isn't receiving the fullness signal properly — that's why you feel like you're never satisfied even after eating enough.",
    focus:
      "The protocol restores leptin sensitivity with strategic sleep and eating habits.",
  },
};
