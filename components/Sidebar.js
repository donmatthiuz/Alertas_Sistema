"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Home, Settings, Menu, Calculator, Store, Tag, LetterText } from "lucide-react"
import Button from "./ui/Button"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { label: "Home", icon: Home, path: "/home" },
  ]

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-xl font-bold">Navigation</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-white hover:bg-gray-700"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <li key={path}>
              <Button
                variant="ghost"
                onClick={() => router.push(path)}
                className={`w-full flex items-center px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors justify-start ${
                  pathname === path ? "bg-gray-700 border-r-4 border-blue-500" : ""
                }`}
              >
                <Icon size={20} />
                {!isCollapsed && <span className="ml-3">{label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
