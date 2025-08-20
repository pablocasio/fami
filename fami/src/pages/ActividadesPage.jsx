import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CumpleanosCalendar() {
  // Lista de cumpleaños
  const cumpleanos = [
    {
      title: "🎉 Pablo (2005)",
      date: "2025-07-24",
      foto: "https://i.pravatar.cc/150?img=1",
    },
    {
      title: "🎂 Maria",
      date: "2025-03-15",
      foto: "https://i.pravatar.cc/150?img=2",
    },
    {
      title: "🎁 Juan",
      date: "2025-05-02",
      foto: "https://i.pravatar.cc/150?img=3",
    },
    {
      title: "🎊 Sofia",
      date: "2025-09-18",
      foto: "https://i.pravatar.cc/150?img=4",
    },
    {
      title: "🎂 Carlos",
      date: "2025-12-10",
      foto: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <div className="p-6">
      {/* Bloque de fotos de cumpleañeros */}
      <h2 className="text-2xl font-bold mb-4">🎂 Cumpleañeros</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {cumpleanos.map((persona, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-2xl shadow"
          >
            <img
              src={persona.foto}
              alt={persona.title}
              className="w-20 h-20 rounded-full mb-2 border-2 border-pink-400"
            />
            <p className="text-center text-sm font-semibold">{persona.title}</p>
            <span className="text-xs text-gray-500">
              {new Date(persona.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Calendario con cumpleaños */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={cumpleanos}
        editable={false} // ❌ no se pueden mover
        selectable={false} // ❌ no se pueden seleccionar
        eventStartEditable={false} // ❌ no se pueden cambiar de fecha
        eventDurationEditable={false} // ❌ no se pueden cambiar de duración
        height="auto"
      />
    </div>
  );
}
