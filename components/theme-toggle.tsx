"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/app/hooks/use-theme"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { toggleTheme, isDark, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="size-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      <Sun className="size-5 block dark:hidden" />
      <Moon className="size-5 hidden dark:block" />
    </Button>
  )
}