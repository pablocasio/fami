import React from "react";

export default function IniT() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="animate-pulse-slow absolute w-72 h-72 bg-white opacity-20 rounded-full -top-20 -left-20"></div>
        <div className="animate-pulse-slow absolute w-96 h-96 bg-white opacity-10 rounded-full top-40 left-20"></div>
        <div className="animate-pulse-slow absolute w-80 h-80 bg-white opacity-15 rounded-full bottom-10 right-10"></div>
      </div>

      {/* Texto principal */}
      <h1 className="relative text-white text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-widest text-center animate-fadeIn">
        👨‍👩‍👧‍👦 Familia Casio
      </h1>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm sm:text-base">
          Desplázate hacia abajo
        </span>
        <svg
          className="w-6 h-6 text-white mt-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2;}
          50% { transform: scale(1.2); opacity: 0.4;}
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
