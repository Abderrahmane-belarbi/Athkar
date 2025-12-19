"use client"

import * as React from "react"

export type Locale = "ar" | "en" | "fr"

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  ar: {
    "app.title": "أذكار المسلم",
    "app.subtitle": "من أذكار الكتاب والسنة",
    "nav.home": "الرئيسية",
    "nav.athkar": "الأذكار",
    "nav.dashboard": "لوحة التحكم",
    "theme.toggle": "تبديل المظهر",
    language: "اللغة",
    "counter.remaining": "المتبقي",
    "counter.completed": "مكتمل",
    "counter.reset": "إعادة تعيين",
    "athkar.repeat": "كرر",
    "athkar.times": "مرات",
    "dashboard.title": "لوحة التحكم",
    "dashboard.create": "إضافة ذكر جديد",
    "dashboard.edit": "تعديل",
    "dashboard.delete": "حذف",
    "form.title": "العنوان",
    "form.category": "الفئة",
    "form.phrase": "العبارة",
    "form.count": "العدد",
    "form.transliteration": "النطق بالحروف اللاتينية",
    "form.translation": "الترجمة",
    "form.add_phrase": "إضافة عبارة",
    "form.save": "حفظ",
    "form.cancel": "إلغاء",
  },
  en: {
    "app.title": "Muslim Athkar",
    "app.subtitle": "Remembrances from Quran and Sunnah",
    "nav.home": "Home",
    "nav.athkar": "Athkar",
    "nav.dashboard": "Dashboard",
    "theme.toggle": "Toggle theme",
    language: "Language",
    "counter.remaining": "Remaining",
    "counter.completed": "Completed",
    "counter.reset": "Reset",
    "athkar.repeat": "Repeat",
    "athkar.times": "times",
    "dashboard.title": "Dashboard",
    "dashboard.create": "Create New Athkar",
    "dashboard.edit": "Edit",
    "dashboard.delete": "Delete",
    "form.title": "Title",
    "form.category": "Category",
    "form.phrase": "Phrase",
    "form.count": "Count",
    "form.transliteration": "Transliteration",
    "form.translation": "Translation",
    "form.add_phrase": "Add Phrase",
    "form.save": "Save",
    "form.cancel": "Cancel",
  },
  fr: {
    "app.title": "Athkar Musulman",
    "app.subtitle": "Invocations du Coran et de la Sunnah",
    "nav.home": "Accueil",
    "nav.athkar": "Athkar",
    "nav.dashboard": "Tableau de bord",
    "theme.toggle": "Changer le thème",
    language: "Langue",
    "counter.remaining": "Restant",
    "counter.completed": "Terminé",
    "counter.reset": "Réinitialiser",
    "athkar.repeat": "Répéter",
    "athkar.times": "fois",
    "dashboard.title": "Tableau de bord",
    "dashboard.create": "Créer un nouveau Athkar",
    "dashboard.edit": "Modifier",
    "dashboard.delete": "Supprimer",
    "form.title": "Titre",
    "form.category": "Catégorie",
    "form.phrase": "Phrase",
    "form.count": "Nombre",
    "form.transliteration": "Translittération",
    "form.translation": "Traduction",
    "form.add_phrase": "Ajouter une phrase",
    "form.save": "Enregistrer",
    "form.cancel": "Annuler",
  },
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("ar")

  React.useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale
    if (stored && ["ar", "en", "fr"].includes(stored)) {
      setLocaleState(stored)
      document.documentElement.lang = stored
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr"
    } else {
      document.documentElement.lang = "ar"
      document.documentElement.dir = "rtl"
    }
  }, [])

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"
  }, [])

  const t = React.useCallback(
    (key: string) => {
      return translations[locale]?.[key] || key
    },
    [locale],
  )

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = React.useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
