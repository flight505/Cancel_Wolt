"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import MobileMenu from "@/components/mobile-menu"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-bold">
              <Image
                src="/wolt-logo.svg"
                alt="Wolt"
                width={120}
                height={30}
                className="h-8 w-auto dark:invert"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              >
                {t("products")} <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              >
                {t("solutions")} <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              >
                {t("businessTypes")} <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              >
                {t("resources")} <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="#"
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                {t("signUp")}
              </Link>
              <Link
                href="#"
                className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("logIn")}
              </Link>
            </div>

            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">{t("heroTitle")}</h1>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center">
                <div className="mb-6 h-64 w-full relative">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt={t("growthWithWolt")}
                    width={256}
                    height={256}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("growthWithWolt")}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("growthWithWoltDesc").replace(
                    "Wolt+",
                    `<span class="text-blue-500 dark:text-blue-400">Wolt+</span>`,
                  )}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center">
                <div className="mb-6 h-64 w-full relative">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt={t("moreOrders")}
                    width={256}
                    height={256}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("moreOrders")}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("moreOrdersDesc").replace(
                    "Wolt Ads",
                    `<span class="text-blue-500 dark:text-blue-400">Wolt Ads</span>`,
                  )}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center">
                <div className="mb-6 h-64 w-full relative">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt={t("deliverToCustomers")}
                    width={256}
                    height={256}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("deliverToCustomers")}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("deliverToCustomersDesc").replace(
                    "Wolt Drive",
                    `<span class="text-blue-500 dark:text-blue-400">Wolt Drive</span>`,
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
