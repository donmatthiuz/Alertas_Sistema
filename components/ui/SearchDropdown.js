import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export default function SearchDropdownOutlined({
  placeholder, 
  initialOptions, 
  onOpenChange,
  inModal = false,
  allowAddNew = true
}) {
  const [options, setoptions] = useState(initialOptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredoptions = options.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const trimmed = newUser.trim();
    if (
      trimmed &&
      !options.some((u) => u.toLowerCase() === trimmed.toLowerCase())
    ) {
      setoptions((prev) => [...prev, trimmed]);
      setSelectedUser(trimmed);
      setNewUser("");
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  // Determinar las clases del dropdown basado en si está en modal
  const dropdownClasses = inModal 
    ? "relative z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-auto overflow-hidden"
    : "absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedUser || placeholder}
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
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

          <ul
            role="listbox"
            className={`${inModal ? 'max-h-32' : 'max-h-32'} overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
            aria-labelledby="dropdownLabel"
          >
            {filteredoptions.length > 0 ? (
              filteredoptions.map((user) => (
                <li
                  key={user}
                  role="option"
                  className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-100 text-sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setSearchTerm("");
                    setIsOpen(false);
                  }}
                >
                  {user}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No se encontró usuario</li>
            )}
          </ul>

          {allowAddNew && (
            <div className="border-t border-gray-200 p-2 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Si no existe, escríbelo"
                className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddUser();
                  }
                }}
              />
              <button
                onClick={handleAddUser}
                className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
              >
                Agregar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}