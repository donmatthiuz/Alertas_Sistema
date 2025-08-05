"use client"

import { LogOut, Bell, Search, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Button from "./ui/Button"
import Input from "./ui/Input"

export default function Header({ onLogout }) {
  const router = useRouter()
  const handleLogOut = () => {

    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-800">Sistema de Gestion de Alertas</h1>
        </div>

        <div className="flex items-center space-x-4">

          <Button variant="ghost" size="sm" className="p-2 text-gray-600 hover:text-gray-800">
            <User size={20} />
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogOut}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut size={16} />
            <span>Cerrar Sesion</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
