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
    help_title: "¿Necesitas ayuda?",
    help_subtitle: "Escríbenos y te acompañamos.",
    help_contact: "Contactar soporte",
    help_close: "Cerrar",
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
    help_title: "Need help?",
    help_subtitle: "Write to us and we'll guide you.",
    help_contact: "Contact support",
    help_close: "Close",
  },
} as const;

export type DictKey = keyof (typeof DICT)["es"];
