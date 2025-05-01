"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Language = "dk" | "eng"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  translations: Record<string, Record<Language, string>>
  t: (key: string) => string
}

const translations = {
  home: {
    dk: "Home",
    eng: "Home",
  },
  products: {
    dk: "Produkter",
    eng: "Products",
  },
  solutions: {
    dk: "Løsninger",
    eng: "Solutions",
  },
  businessTypes: {
    dk: "Virksomhedstyper",
    eng: "Business Types",
  },
  resources: {
    dk: "Ressourcer",
    eng: "Resources",
  },
  signUp: {
    dk: "Tilmeld dig",
    eng: "Sign Up",
  },
  logIn: {
    dk: "Log ind",
    eng: "Log In",
  },
  heroTitle: {
    dk: "Vækst med Wolt til partnere med os",
    eng: "Growth with Wolt for partners with us",
  },
  growthWithWolt: {
    dk: "Vækst med Wolt",
    eng: "Growth with Wolt",
  },
  growthWithWoltDesc: {
    dk: "Få adgang til vores aktive kundebase ved at tilbyde afhentning og levering i Wolt-appen. Derudover kan du øge salget ved at nå loyale kunder ved hjælp af vores abonnementstjeneste Wolt+ – kunder, der i gennemsnit bestiller mere fra Wolt.",
    eng: "Get access to our active customer base by offering pickup and delivery in the Wolt app. Additionally, you can increase sales by reaching loyal customers through our subscription service Wolt+ – customers who on average order more from Wolt.",
  },
  moreOrders: {
    dk: "Få flere bestillinger",
    eng: "Get More Orders",
  },
  moreOrdersDesc: {
    dk: "Med Wolt kan du øge dine bestillinger ved at nå ud til vores aktive kunder. Tilmelding er gratis, og prissætningen er provisionsbaseret. Derudover hjælper Wolt Ads dig med at øge din synlighed og få endnu flere bestillinger i Wolt-appen.",
    eng: "With Wolt, you can increase your orders by reaching our active customers. Registration is free, and pricing is commission-based. Additionally, Wolt Ads helps you increase your visibility and get even more orders in the Wolt app.",
  },
  deliverToCustomers: {
    dk: "Levér til flere kunder",
    eng: "Deliver to More Customers",
  },
  deliverToCustomersDesc: {
    dk: "Når en bestilling er afgivet, leverer Wolts kurérpartnere til dine kunder på ca. 30 minutter. Du kan også forbinde din egen hjemmeside eller app og levere med Wolt Drive, der tilbyder ekspressleveringer fra din virksomhed til dine kunders hjem indenfor én time.",
    eng: "When an order is placed, Wolt's courier partners deliver to your customers in about 30 minutes. You can also connect your own website or app and deliver with Wolt Drive, which offers express deliveries from your business to your customers' homes within one hour.",
  },
  language: {
    dk: "Sprog",
    eng: "Language",
  },
  theme: {
    dk: "Tema",
    eng: "Theme",
  },
  light: {
    dk: "Lys",
    eng: "Light",
  },
  dark: {
    dk: "Mørk",
    eng: "Dark",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("dk")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string) => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
