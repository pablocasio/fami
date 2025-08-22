import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  // Efecto para detectar scroll y cambiar transparencia
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-lg shadow-sm border-b border-white/20"
          : "bg-white/95 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="text-xl font-bold text-gray-800 flex items-center gap-2 hover:text-gray-900 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white">
            ❤️
          </div>
          <span className="font-semibold">Familia Casio</span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* Menú de navegación */}
        <nav
          className={`${
            isOpen
              ? "flex opacity-100 translate-y-0"
              : "hidden opacity-0 -translate-y-4"
          } flex-col absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl p-6 gap-3 text-base md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:p-0 md:opacity-100 md:translate-y-0 transition-all duration-300 md:transition-none border-t border-gray-100 md:border-none`}
        >
          <Link
            to="/home"
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              location.pathname === "/home"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">🏠</span>
            Home
          </Link>

          <Link
            to="/arbol-genealogico"
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              location.pathname === "/arbol-genealogico"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">🌳</span>
            Árbol
          </Link>

          <Link
            to="/actividades"
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              location.pathname === "/actividades"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">📅</span>
            Actividades
          </Link>

          <Link
            to="/perfil"
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              location.pathname === "/perfil"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">👤</span>
            Perfil
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 flex items-center gap-2 md:ml-2 border border-gray-200 hover:border-red-200 mt-2 md:mt-0"
          >
            <span className="text-lg">🚪</span>
            Cerrar Sesión
          </button>
        </nav>
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Navbar;
