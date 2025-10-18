"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: currentTheme === "dark"
  }
}