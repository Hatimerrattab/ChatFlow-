"use client"

import { Bell, CalendarDays, UserCircle } from "lucide-react"

export default function Topbar() {
  return (
    <header className="flex justify-between items-center bg-neutral-900 border-b border-neutral-800 px-6 py-3">
      <h1 className="text-lg font-semibold text-white">Tableau de bord</h1>
      <div className="flex items-center space-x-4">
        <CalendarDays className="text-gray-400 hover:text-white cursor-pointer" size={20} />
        <Bell className="text-gray-400 hover:text-white cursor-pointer" size={20} />
        <UserCircle className="text-gray-400 hover:text-white cursor-pointer" size={26} />
      </div>
    </header>
  )
}
