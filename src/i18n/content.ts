// Language-aware content selectors. Spanish stays the source of truth;
// English mirrors live in *.en.ts files.
import { useLang } from "./index";

import { DAY_STEPS, STEP_META } from "@/data/protocol-steps";
import { DAY_STEPS_EN, STEP_META_EN } from "@/data/protocol-steps.en";
import { PROTOCOL_DAYS } from "@/data/protocol-days";
import { PROTOCOL_DAYS_EN } from "@/data/protocol-days.en";
import { MOTIVATIONAL } from "@/data/motivational";
import { MOTIVATIONAL_EN } from "@/data/motivational.en";
import { QUIZ } from "@/data/quiz";
import { QUIZ_EN } from "@/data/quiz.en";
import { HORMONES } from "@/data/hormones";
import { HORMONES_EN } from "@/data/hormones.en";
import { PRODUCTS } from "@/data/products";
import { PRODUCTS_EN } from "@/data/products.en";
import { STAGES, getStage } from "@/data/journey";
import { STAGES_EN } from "@/data/journey.en";
import {
  PROTOCOL_TOUR,
  JOURNEY_TOUR,
  SHOPPING_TOUR,
  PROFILE_TOUR,
} from "@/data/tours";
import {
  PROTOCOL_TOUR_EN,
  JOURNEY_TOUR_EN,
  SHOPPING_TOUR_EN,
  PROFILE_TOUR_EN,
} from "@/data/tours.en";

export function useContent() {
  const { pick, lang } = useLang();
  return {
    lang,
    pick,
    daySteps: pick(DAY_STEPS, DAY_STEPS_EN),
    stepMeta: pick(STEP_META, STEP_META_EN),
    protocolDays: pick(PROTOCOL_DAYS, PROTOCOL_DAYS_EN),
    motivational: pick(MOTIVATIONAL, MOTIVATIONAL_EN),
    quiz: pick(QUIZ, QUIZ_EN),
    hormones: pick(HORMONES, HORMONES_EN),
    products: pick(PRODUCTS, PRODUCTS_EN),
    stages: pick(STAGES, STAGES_EN),
    tours: {
      protocol: pick(PROTOCOL_TOUR, PROTOCOL_TOUR_EN),
      journey: pick(JOURNEY_TOUR, JOURNEY_TOUR_EN),
      shopping: pick(SHOPPING_TOUR, SHOPPING_TOUR_EN),
      profile: pick(PROFILE_TOUR, PROFILE_TOUR_EN),
    },
    /** Stage for a day, in the active language. */
    stageFor(day: number, quizCompleted: boolean) {
      const es = getStage(day, quizCompleted);
      if (lang === "es") return es;
      return STAGES_EN.find((s) => s.key === es.key) ?? es;
    },
  };
}
