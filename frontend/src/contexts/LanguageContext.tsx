/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import i18n from "../i18n";

type LanguageContextType = {
  language: "en" | "ar";
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: any) {
  const [language, setLanguage] = useState<"en" | "ar">(
    (localStorage.getItem("language") as "en" | "ar") || "en"
  );

  function toggleLanguage() {
    const newLanguage = language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLanguage;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
