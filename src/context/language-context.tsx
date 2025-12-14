"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { dictionary, Locale, Dictionary } from "@/lib/dictionary";
import Cookies from "js-cookie";

type LanguageContextType = {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("tr");
  const supportedLanguages: Locale[] = [
    "tr",
    "en",
    "de",
    "es",
    "fr",
    "it",
    "ru",
    "ja",
    "zh",
    "nl",
    "pt",
    "ar",
    "ko",
  ];
  useEffect(() => {
    const saved = Cookies.get("language") as Locale | undefined;

    if (saved && supportedLanguages.includes(saved)) {
      queueMicrotask(() => {
        setLanguageState(saved);
      });
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    Cookies.set("language", lang, { expires: 365 });
  };

  const t = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
