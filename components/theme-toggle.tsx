"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label={t("theme")}
    >
      {theme === "light" ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden sm:inline">{t("light")}</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden sm:inline">{t("dark")}</span>
        </>
      )}
    </button>
  )
}
