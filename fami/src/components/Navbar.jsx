import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-gray-700">Familia Casio ❤️</h1>

      {/* Botón hamburguesa (solo en mobile) */}
      <button
        className="md:hidden flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-gray-600"></span>
        <span className="block w-6 h-0.5 bg-gray-600"></span>
        <span className="block w-6 h-0.5 bg-gray-600"></span>
      </button>

      {/* Menú */}
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col absolute top-16 right-4 bg-white shadow-lg rounded-xl p-4 gap-3 md:gap-4 text-sm md:text-base md:flex md:static md:flex-row md:shadow-none md:bg-transparent`}
      >
        <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
          🏠 Home
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
          🌳 Árbol
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
          📅 Actividades
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
          👤 Perfil
        </button>
        <button className="px-3 py-1 rounded-lg text-red-500 hover:bg-red-100">
          🚪 Cerrar Sesión
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
