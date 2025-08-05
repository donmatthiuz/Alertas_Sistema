import React, { useState } from "react";
import { Circle, CheckCircle } from "lucide-react";

export default function HorizontalRadioGroup({ 
  options = [],
  title = "Selecciona una opción",
  onChange,
  initialSelected = null,
  disabled = false,
  className = "",
  name = "radio-group"
}) {
  const [selectedOption, setSelectedOption] = useState(initialSelected);

  const handleSelect = (option) => {
    if (disabled) return;
    
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  // Datos de ejemplo si no se proporcionan opciones
  const defaultOptions = [
    { id: 1, nombre: "Opción 1", valor: "opcion1" },
    { id: 2, nombre: "Opción 2", valor: "opcion2" },
    { id: 3, nombre: "Opción 3", valor: "opcion3" },
    { id: 4, nombre: "Opción 4", valor: "opcion4" },
    { id: 5, nombre: "Opción 5", valor: "opcion5" }
  ];

  const displayOptions = options.length > 0 ? options : defaultOptions;

  return (
    <div className={`w-full max-w-4xl mx-auto pt-6 space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      
      {/* Contenedor horizontal de radio buttons */}
      <div className="flex flex-wrap gap-3">
        {displayOptions.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          
          return (
            <label
              key={option.id}
              className={`
                inline-flex items-center px-4 py-2 rounded-full border-2 cursor-pointer
                transition-all duration-200 ease-in-out
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="radio"
                name={name}
                checked={isSelected}
                onChange={() => handleSelect(option)}
                disabled={disabled}
                className="sr-only"
              />
              
              {/* Icono de radio personalizado */}
              <div className={`
                flex items-center justify-center w-4 h-4 mr-2
                transition-all duration-200
              `}>
                {isSelected ? (
                  <CheckCircle className="w-4 h-4 text-blue-500" fill="currentColor" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
              </div>
              
              <span className="text-sm font-medium select-none">
                {option.nombre}
              </span>
            </label>
          );
        })}
      </div>

      {/* Resumen de selección */}
     

      {/* Botón para limpiar selección */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            setSelectedOption(null);
            if (onChange) onChange(null);
          }}
          disabled={disabled || !selectedOption}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Limpiar selección
        </button>
      </div>
    </div>
  );
}