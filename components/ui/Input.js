"use client"

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  )
}
