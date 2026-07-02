import type { TourStep } from "@/components/tutorial-wizard";

export const PROTOCOL_TOUR: TourStep[] = [
  {
    eyebrow: "Tu protocolo",
    title: "Los 30 días completos.",
    body: "Aquí ves toda la secuencia. Cada casilla es un día del camino.",
  },
  {
    target: "[data-tour='protocol-grid']",
    eyebrow: "Calendario",
    title: "Toca cualquier día abierto.",
    body: "Los verdes ya los viviste, el marcado es hoy y los del candado se abren a medida que avanzas.",
    placement: "bottom",
  },
  {
    eyebrow: "Listo",
    title: "Ve paso a paso, sin apuro.",
    body: "Un día por día es suficiente. La constancia es lo que reequilibra.",
  },
];

export const JOURNEY_TOUR: TourStep[] = [
  {
    eyebrow: "Tu jornada",
    title: "Las cinco etapas de 30 días.",
    body: "Diagnóstico, Reequilibrio, Activación, Transformación y Consolidación. Cada etapa tiene un propósito.",
  },
  {
    target: "[data-tour='journey-stages']",
    eyebrow: "Etapas",
    title: "Aquí ves en qué momento estás.",
    body: "La etapa activa se ilumina. Las demás llegarán a su tiempo.",
    placement: "bottom",
  },
  {
    target: "[data-tour='journey-dots']",
    eyebrow: "Los 30 días",
    title: "Un punto por día vivido.",
    body: "Toca cualquiera para revisitarlo. Es tu mapa emocional del proceso.",
    placement: "top",
  },
];

export const SHOPPING_TOUR: TourStep[] = [
  {
    eyebrow: "Lista de compras",
    title: "Todo lo que necesitas, semana por semana.",
    body: "Preparamos las listas para que no tengas que pensar qué comprar.",
  },
  {
    target: "[data-tour='shopping-weeks']",
    eyebrow: "Semanas",
    title: "Elige la semana en la que estás.",
    body: "Cambia entre las cuatro semanas del protocolo cuando quieras.",
    placement: "bottom",
  },
  {
    target: "[data-tour='shopping-list']",
    eyebrow: "Ingredientes",
    title: "Marca lo que ya tienes.",
    body: "La lista se guarda sola. Puedes marcar todo o limpiar con un toque abajo.",
    placement: "top",
  },
];

export const PROFILE_TOUR: TourStep[] = [
  {
    eyebrow: "Tu perfil",
    title: "Aquí vive todo lo tuyo.",
    body: "Tu plan, tu hormona dominante y los ajustes de la app.",
  },
  {
    target: "[data-tour='profile-plan']",
    eyebrow: "Tu plan",
    title: "Básico o Completo.",
    body: "Si estás en Básico, aquí puedes ampliar al protocolo completo de 30 días.",
    placement: "bottom",
  },
  {
    target: "[data-tour='profile-hormone']",
    eyebrow: "Tu hormona",
    title: "El eje de tu diagnóstico.",
    body: "Puedes repetir el diagnóstico cuando sientas que tu cuerpo cambió.",
    placement: "top",
  },
  {
    target: "[data-tour='profile-actions']",
    eyebrow: "Ajustes",
    title: "Contraseña, soporte y salir.",
    body: "Escríbenos cuando quieras. Estamos del otro lado.",
    placement: "top",
  },
];
