"use client"

export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-300 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
     purple: "bg-purple-100 text-purple-800",
    danger: "bg-red-100 text-red-800",
  }

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
