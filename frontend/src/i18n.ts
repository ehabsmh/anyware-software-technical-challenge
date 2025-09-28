// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        logoName: "Coligo",
        welcome: "Welcome to",
        loginMessage: "Please log in to access your dashboard.",
        loggedinMessage: "You are logged in!",
        login: "Login",
        logout: "Logout",
      },
    },
    ar: {
      translation: {
        logoName: "كوليغو",
        welcome: "مرحباً بك في ",
        loginMessage: "من فضلك قم بتسجيل الدخول للوصول إلى لوحة التحكم.",
        loggedinMessage: "أنت مسجل الدخول!",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
