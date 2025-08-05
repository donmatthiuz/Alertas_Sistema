"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Login_Page from '../components/Login.js'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn) router.push("/home")
  }, [])

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true")
    router.push("/home")
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Login_Page onLogin={handleLogin}/>
    </div>
  )
}
