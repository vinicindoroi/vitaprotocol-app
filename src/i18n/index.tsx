import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICT, type Lang, type DictKey } from "./dict";

const STORAGE_KEY = "vp.lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  /** Picks the value matching the active language. */
  pick: <T>(es: T, en: T) => T;
};

const LangContext = createContext<Ctx | null>(null);

function detectInitial(): Lang {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  const nav = window.navigator.language?.toLowerCase() ?? "es";
  return nav.startsWith("en") ? "en" : "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const setLang = (l: Lang) => {
      setLangState(l);
      try {
        window.localStorage.setItem(STORAGE_KEY, l);
      } catch {
        /* ignore */
      }
    };
    const t = (key: DictKey, vars?: Record<string, string | number>) => {
      let s = (DICT[lang] as Record<string, string>)[key] ?? (DICT.es as Record<string, string>)[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    };
    const pick = <T,>(es: T, en: T): T => (lang === "en" ? en : es);
    return { lang, setLang, t, pick };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Safe fallback (e.g. during SSR before provider mounts)
    return {
      lang: "es",
      setLang: () => {},
      t: (k) => (DICT.es as Record<string, string>)[k] ?? k,
      pick: (es) => es,
    };
  }
  return ctx;
}

export type { Lang };
