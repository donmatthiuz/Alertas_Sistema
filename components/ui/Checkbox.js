"use client"

export default function Checkbox({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"


  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} border border-gray-700 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}
