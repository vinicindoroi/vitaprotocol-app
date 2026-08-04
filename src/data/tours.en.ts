import type { TourStep } from "@/components/tutorial-wizard";

export const PROTOCOL_TOUR_EN: TourStep[] = [
  {
    eyebrow: "Your protocol",
    title: "The full 30 days.",
    body: "Here you see the whole sequence. Each box is a day on the path.",
  },
  {
    target: "[data-tour='protocol-grid']",
    eyebrow: "Calendar",
    title: "Tap any open day.",
    body: "Green ones are already lived, the marked one is today, and the locked ones open as you progress.",
    placement: "bottom",
  },
  {
    eyebrow: "Ready",
    title: "Go step by step, no rush.",
    body: "One day at a time is enough. Consistency is what rebalances.",
  },
];

export const JOURNEY_TOUR_EN: TourStep[] = [
  {
    eyebrow: "Your journey",
    title: "The five 30-day stages.",
    body: "Diagnosis, Rebalancing, Activation, Transformation, and Consolidation. Each stage has a purpose.",
  },
  {
    target: "[data-tour='journey-stages']",
    eyebrow: "Stages",
    title: "Here you see where you are.",
    body: "The active stage lights up. The rest will arrive in their time.",
    placement: "bottom",
  },
  {
    target: "[data-tour='journey-dots']",
    eyebrow: "The 30 days",
    title: "One dot for each day lived.",
    body: "Tap any of them to revisit it. It's your emotional map of the process.",
    placement: "top",
  },
];

export const SHOPPING_TOUR_EN: TourStep[] = [
  {
    eyebrow: "Shopping list",
    title: "Everything you need, week by week.",
    body: "We prepared the lists so you don't have to think about what to buy.",
  },
  {
    target: "[data-tour='shopping-weeks']",
    eyebrow: "Weeks",
    title: "Choose the week you're on.",
    body: "Switch between the four weeks of the protocol whenever you want.",
    placement: "bottom",
  },
  {
    target: "[data-tour='shopping-list']",
    eyebrow: "Ingredients",
    title: "Check off what you already have.",
    body: "The list saves itself. You can check everything or clear it with one tap below.",
    placement: "top",
  },
];

export const PROFILE_TOUR_EN: TourStep[] = [
  {
    eyebrow: "Your profile",
    title: "Everything of yours lives here.",
    body: "Your plan, your dominant hormone, and the app's settings.",
  },
  {
    target: "[data-tour='profile-plan']",
    eyebrow: "Your plan",
    title: "Basic or Complete.",
    body: "If you're on Basic, here you can upgrade to the full 30-day protocol.",
    placement: "bottom",
  },
  {
    target: "[data-tour='profile-hormone']",
    eyebrow: "Your hormone",
    title: "The axis of your diagnosis.",
    body: "You can retake the diagnosis whenever you feel your body has changed.",
    placement: "top",
  },
  {
    target: "[data-tour='profile-actions']",
    eyebrow: "Settings",
    title: "Password, support, and sign out.",
    body: "Write to us whenever you want. We're on the other side.",
    placement: "top",
  },
];
