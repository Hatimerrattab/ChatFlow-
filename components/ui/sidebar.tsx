"use client"

import { Home, BarChart, Settings, User } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col">
      <div className="p-6 text-xl font-bold text-white border-b border-neutral-800">
        Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <Home size={18} />
          <span>Accueil</span>
        </Link>
        <Link href="/analytics" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <BarChart size={18} />
          <span>Analytique</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <Settings size={18} />
          <span>Paramètres</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-neutral-800 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-600" />
        <div>
          <p className="text-sm font-medium text-white">Utilisateur</p>
          <p className="text-xs text-gray-400">En ligne</p>
        </div>
      </div>
    </aside>
  )
}
