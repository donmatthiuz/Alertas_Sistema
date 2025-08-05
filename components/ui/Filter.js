"use client"
import React, { useState, useRef, useEffect } from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"
import { Filter, Search, X } from "lucide-react"

export default function SimpleFilterDropdown({ 
  options = [], 
  onSelect, 
  label: initialLabel = "Filtrar",
  placeholder = "Buscar...",
  showSearch = true,
  showClear = true
}) {
  const [selectedValues, setSelectedValues] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const searchInputRef = useRef(null)

  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Enfocar el input de búsqueda cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, showSearch])

  // Manejar cambios en checkbox
  function handleCheckboxChange(value) {
    const newSelectedValues = new Set(selectedValues)
    
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }
    
    setSelectedValues(newSelectedValues)
    onSelect(Array.from(newSelectedValues)) // Enviar array de valores seleccionados
  }

  // Limpiar todas las selecciones
  function handleClear() {
    setSelectedValues(new Set())
    onSelect([])
    setSearchTerm("")
  }

  // Obtener label del botón basado en selecciones
  function getButtonLabel() {
    if (selectedValues.size === 0) {
      return initialLabel
    } else if (selectedValues.size === 1) {
      const selectedOption = options.find(option => selectedValues.has(option.value))
      return selectedOption ? selectedOption.label : initialLabel
    } else {
      return `${selectedValues.size} seleccionados`
    }
  }

  return (
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2 relative">
          {getButtonLabel()} 
          <Filter size={16} />
          {selectedValues.size > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedValues.size}
            </span>
          )}
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={4}
          className={cn(
            "z-50 min-w-[12rem] max-w-[16rem] overflow-hidden rounded-md border bg-white p-1 text-black shadow-md",
          )}
        >
          {/* Input de búsqueda */}
          {showSearch && (
            <div className="relative p-2 border-b border-gray-200">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Botón de limpiar */}
          {showClear && selectedValues.size > 0 && (
            <div className="p-2 border-b border-gray-200">
              <button
                onClick={handleClear}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <X size={16} />
                Limpiar selección
              </button>
            </div>
          )}

          {/* Lista de opciones con checkbox */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-4 text-sm text-gray-500 text-center">
                {searchTerm ? "No se encontraron resultados" : "No hay opciones disponibles"}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex items-center gap-2 cursor-pointer select-none rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-gray-100",
                  )}
                  onClick={() => handleCheckboxChange(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.has(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <label className="flex-1 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))
            )}
          </div>

          {/* Información de selección */}
          {selectedValues.size > 0 && (
            <div className="p-2 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600">
                {selectedValues.size} de {options.length} seleccionados
              </div>
            </div>
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}