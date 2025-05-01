"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 text-gray-700 dark:text-gray-300" aria-label="Toggle menu">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-8">
              <button onClick={toggleMenu} className="p-2 text-gray-700 dark:text-gray-300">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              <Link href="/" className="text-xl font-medium text-gray-900 dark:text-white" onClick={toggleMenu}>
                {t("home")}
              </Link>
              <Link href="#" className="text-xl font-medium text-gray-900 dark:text-white" onClick={toggleMenu}>
                {t("products")}
              </Link>
              <Link href="#" className="text-xl font-medium text-gray-900 dark:text-white" onClick={toggleMenu}>
                {t("solutions")}
              </Link>
              <Link href="#" className="text-xl font-medium text-gray-900 dark:text-white" onClick={toggleMenu}>
                {t("businessTypes")}
              </Link>
              <Link href="#" className="text-xl font-medium text-gray-900 dark:text-white" onClick={toggleMenu}>
                {t("resources")}
              </Link>
            </nav>

            <div className="mt-8 flex flex-col space-y-4">
              <Link
                href="#"
                className="w-full bg-blue-500 text-white text-center px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                {t("signUp")}
              </Link>
              <Link
                href="#"
                className="w-full text-center text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={toggleMenu}
              >
                {t("logIn")}
              </Link>
            </div>

            <div className="mt-8 flex justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
