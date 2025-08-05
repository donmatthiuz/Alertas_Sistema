"use client"

export function Table({ children, className = "" }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${className}`}>{children}</table>
    </div>
  )
}

export function TableHeader({ children, className = "" }) {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>
}

export function TableBody({ children, className = "" }) {
  return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
}

export function TableRow({ children, className = "" }) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
}

export function TableHead({ children, className = "" }) {
  return (
    <th className={`px-6 py-3 text-left text-sm font-medium uppercase tracking-wider ${className}`}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = "" }) {
  return <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
}
