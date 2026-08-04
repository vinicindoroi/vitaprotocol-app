import type { JourneyStage } from "./journey";

export const STAGES_EN: JourneyStage[] = [
  { key: "diagnostico",   label: "Diagnosis",       subtitle: "Listening to your body's signals",   from: 0,  to: 0  },
  { key: "reequilibrio",  label: "Rebalancing",     subtitle: "Lowering alert levels",              from: 1,  to: 7  },
  { key: "activacion",    label: "Activation",      subtitle: "The body starts to respond",         from: 8,  to: 15 },
  { key: "transformacion",label: "Transformation",  subtitle: "The changes become visible",         from: 16, to: 24 },
  { key: "consolidacion", label: "Consolidation",   subtitle: "Your new rhythm becomes yours",      from: 25, to: 30 },
];
