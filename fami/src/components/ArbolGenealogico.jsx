import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function ArbolGenealogico() {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  // Ajustar vista según el tamaño de pantalla
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) {
        setCalendarView("timeGridDay"); // vista día en móviles
      } else if (window.innerWidth < 1024) {
        setCalendarView("dayGridWeek"); // vista semana en tablets
      } else {
        setCalendarView("dayGridMonth"); // vista mes en desktop
      }
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Cumpleaños
  const cumpleanos = [
    { title: "🎉 Pablo (2005)", date: "2025-07-24", id: "pablo" },
    { title: "🎂 Keyla", date: "2025-03-02", id: "keyla" },
    { title: "🎁 Ely", date: "2025-09-10", id: "ely" },
    { title: "🎊 Shami", date: "2025-09-23", id: "shami" },
    { title: "👶 Hija de Ely", date: "2025-05-26", id: "hijaEly" },
    { title: "👨 Cumpleaños Papá", date: "2025-01-25", id: "padre" },
    { title: "👩 Cumpleaños Mamá", date: "2025-09-26", id: "madre" },
  ];

  // Manejar selección en el árbol familiar
  const handleSelectMember = (id) => {
    const event = cumpleanos.find((c) => c.id === id);
    if (event) {
      setSelectedDate(event.date);

      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(event.date);

      // Ir al calendario directamente
      const calendarSection = document.getElementById("calendario");
      if (calendarSection) {
        calendarSection.scrollIntoView({ behavior: "auto" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 flex flex-col items-center">
        {/* Árbol familiar */}
        <h2 className="text-2xl font-bold mb-8 animate-pulse">
          👨‍👩‍👧 Árbol Familiar
        </h2>

        {/* Padres */}
        <div className="flex flex-col items-center">
          <div className="flex gap-12">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectMember("padre")}
            >
              <img
                src="https://i.pravatar.cc/150?img=6"
                alt="Padre"
                className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg hover:scale-110 transition-transform"
              />
              <p className="mt-2 font-semibold">👨 Pablo Albino Bejarano</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectMember("madre")}
            >
              <img
                src="https://i.pravatar.cc/150?img=7"
                alt="Madre"
                className="w-24 h-24 rounded-full border-4 border-pink-400 shadow-lg hover:scale-110 transition-transform"
              />
              <p className="mt-2 font-semibold">👩 Lidia Casio Huamana</p>
            </div>
          </div>

          {/* Línea */}
          <div className="h-12 w-1 bg-gray-400 my-4"></div>

          {/* Hijos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                id: "pablo",
                img: 1,
                border: "border-green-400",
                label: "🎉 Pablo",
              },
              {
                id: "keyla",
                img: 2,
                border: "border-purple-400",
                label: "🎂 Keyla",
              },
              {
                id: "ely",
                img: 3,
                border: "border-yellow-400",
                label: "🎁 Ely",
                hija: { id: "hijaEly", img: 5, label: "👶 Hija de Ely" },
              },
              {
                id: "shami",
                img: 4,
                border: "border-red-400",
                label: "🎊 Shami",
              },
            ].map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelectMember(member.id)}
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${member.img}`}
                  alt={member.label}
                  className={`w-20 h-20 rounded-full border-4 ${member.border} shadow-md hover:scale-110 hover:ring-4 hover:ring-yellow-300 transition-transform`}
                />
                <p className="mt-2 font-semibold">{member.label}</p>

                {/* Hija de Ely */}
                {member.hija && (
                  <>
                    <div className="h-6 w-1 bg-gray-400 mt-2"></div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handleSelectMember(member.hija.id)}
                    >
                      <img
                        src={`https://i.pravatar.cc/150?img=${member.hija.img}`}
                        alt={member.hija.label}
                        className="w-16 h-16 rounded-full border-4 border-pink-300 shadow hover:scale-110 hover:ring-4 hover:ring-yellow-300 transition-transform"
                      />
                      <p className="mt-1 text-sm">{member.hija.label}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Calendario */}
        <h2 id="calendario" className="text-2xl font-bold mt-12 mb-4">
          📅 Cumpleaños en el Calendario
        </h2>
        <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView={calendarView}
            events={cumpleanos}
            height="auto"
            aspectRatio={1.5}
            dayCellDidMount={(info) => {
              if (info.dateStr === selectedDate) {
                info.el.style.backgroundColor = "#fef3c7";
                info.el.style.border = "2px solid #f59e0b";
                info.el.style.borderRadius = "8px";
                info.el.classList.add("animate-pulse");
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
