export type Lang = "es" | "en";

// Shared UI strings. Page-specific copy uses `pick(es, en)` from useLang().
export const DICT = {
  es: {
    loading: "Cargando…",
    day: "Día",
    days: "días",
    back: "Volver",
    next: "Siguiente",
    previous: "Anterior",
    close: "Cerrar",
    save: "Guardar",
    nav_today: "Hoy",
    nav_protocol: "Protocolo",
    nav_journey: "Jornada",
    nav_shopping: "Compras",
    nav_profile: "Perfil",
    language: "Idioma",
  },
  en: {
    loading: "Loading…",
    day: "Day",
    days: "days",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    save: "Save",
    nav_today: "Today",
    nav_protocol: "Protocol",
    nav_journey: "Journey",
    nav_shopping: "Shop",
    nav_profile: "Profile",
    language: "Language",
  },
} as const;

export type DictKey = keyof (typeof DICT)["es"];
