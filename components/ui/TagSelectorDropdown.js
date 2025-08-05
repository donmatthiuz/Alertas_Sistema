import React, { useState, useRef, useEffect } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
 
export default function TagSelectorDropdown({ 
  allTags = [],
  title,
  placeholder = "Buscar",
  addoption = false 
}) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTag = (tag) => {
    const exists = selectedTags.find((t) => t.id === tag.id);
    if (exists) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const removeTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  // Filtrar tags basado en el término de búsqueda
  const filteredTags = allTags.filter(tag =>
    tag.nombre && tag.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {title}
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      selectedTags.find((t) => t.id === tag.id)
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {tag.nombre} - {tag.id}
                    {selectedTags.find((t) => t.id === tag.id) && (
                      <span className="ml-2 text-blue-500">✓</span>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No se encontraron resultados
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 border"
            >
              {tag.nombre}
              <button
                onClick={() => removeTag(tag.id)}
                className="hover:text-red-500 focus:outline-none transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Tags seleccionados:{" "}
        {selectedTags.length > 0
          ? selectedTags.map((tag) => tag.nombre).join(", ")
          : "Ninguno"}
      </div>
    </div>
  );
}