"use client"

import { useLanguage } from "@/contexts/language-context"
import { Check, ChevronDown, Globe } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLanguageChange = (newLanguage: "dk" | "eng") => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        aria-label={t("language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{language === "dk" ? "Dansk" : "English"}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleLanguageChange("dk")}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Dansk</span>
            {language === "dk" && <Check className="h-4 w-4" />}
          </button>
          <button
            onClick={() => handleLanguageChange("eng")}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>English</span>
            {language === "eng" && <Check className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
