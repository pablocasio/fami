import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function ArbolGenealogico() {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [hoveredMember, setHoveredMember] = useState(null);

  // Ajustar vista según el tamaño de pantalla
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 500) {
        setCalendarView("timeGridDay");
      } else if (window.innerWidth < 768) {
        setCalendarView("dayGridWeek");
      } else {
        setCalendarView("dayGridMonth");
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
    { title: "👶 Melani (hija de Ely)", date: "2025-05-26", id: "hijaEly" },
    {
      title: "👧 Britnay (hija de Shami)",
      date: "2025-06-15",
      id: "hijaShami",
    },
    { title: "👨 Papá", date: "2025-01-25", id: "padre" },
    { title: "👩 Mamá", date: "2025-09-26", id: "madre" },
    { title: "🤵‍♂️ Solano (esposo de Ely)", date: "2025-04-18", id: "esposoEly" },
    {
      title: "🤵‍♂️ Teo (esposo de Shami)",
      date: "2025-11-07",
      id: "esposoShami",
    },
    { title: "🐱 Michi (gato de la familia)", date: "2025-02-14", id: "gato" },
  ];

  // Manejar selección
  const handleSelectMember = (id) => {
    const event = cumpleanos.find((c) => c.id === id);
    if (event) {
      setSelectedDate(event.date);
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(event.date);
      const calendarSection = document.getElementById("calendario");
      if (calendarSection) {
        calendarSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Estilos para miembros
  const memberStyles = {
    padre: "border-blue-400 bg-blue-50",
    madre: "border-pink-400 bg-pink-50",
    pablo: "border-green-400 bg-green-50",
    keyla: "border-purple-400 bg-purple-50",
    ely: "border-yellow-400 bg-yellow-50",
    shami: "border-red-400 bg-red-50",
    hijaEly: "border-pink-300 bg-pink-50",
    hijaShami: "border-pink-300 bg-pink-50",
    esposoEly: "border-blue-300 bg-blue-50",
    esposoShami: "border-blue-300 bg-blue-50",
    gato: "border-gray-300 bg-gray-50",
  };

  // Tamaños uniformes para todos los miembros
  const memberSizes = {
    large: "w-24 h-24 sm:w-28 sm:h-28",
    medium: "w-20 h-20 sm:w-24 sm:h-24",
    small: "w-16 h-16 sm:w-20 sm:h-20",
    xsmall: "w-14 h-14 sm:w-16 sm:h-16",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 flex flex-col items-center">
        {/* Árbol familiar */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          👨‍👩‍👧‍👦 Árbol Familiar Casio Bejarano
        </h2>

        {/* Padres */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex gap-8 sm:gap-16 flex-wrap justify-center">
            {/* Padre */}
            <div
              className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleSelectMember("padre")}
              onMouseEnter={() => setHoveredMember("padre")}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div
                className={`${
                  memberSizes.large
                } rounded-full border-4 shadow-lg flex items-center justify-center overflow-hidden ${
                  memberStyles.padre
                } ${hoveredMember === "padre" ? "ring-4 ring-blue-200" : ""}`}
              >
                <img
                  src="/pa.jpg"
                  alt="Padre"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 font-semibold text-sm sm:text-base bg-white px-3 py-1 rounded-full shadow-sm">
                👨 Pablo Albino Bejarano
              </p>
            </div>

            {/* Madre */}
            <div
              className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleSelectMember("madre")}
              onMouseEnter={() => setHoveredMember("madre")}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div
                className={`${
                  memberSizes.large
                } rounded-full border-4 shadow-lg flex items-center justify-center overflow-hidden ${
                  memberStyles.madre
                } ${hoveredMember === "madre" ? "ring-4 ring-pink-200" : ""}`}
              >
                <img
                  src="/ma.jpg"
                  alt="Madre"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 font-semibold text-sm sm:text-base bg-white px-3 py-1 rounded-full shadow-sm">
                👩 Lidia Casio Huamana
              </p>
            </div>
          </div>

          {/* Línea decorativa */}
          <div className="h-12 sm:h-16 w-1 bg-gradient-to-b from-blue-300 to-pink-300 my-6 relative">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
          </div>

          {/* Hijos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">
            {/* Pablo */}
            <div className="flex flex-col items-center">
              <div
                className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleSelectMember("pablo")}
                onMouseEnter={() => setHoveredMember("pablo")}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div
                  className={`${
                    memberSizes.medium
                  } rounded-full border-4 shadow-md flex items-center justify-center overflow-hidden ${
                    memberStyles.pablo
                  } ${
                    hoveredMember === "pablo" ? "ring-4 ring-green-200" : ""
                  }`}
                >
                  <img
                    src="/pablo.jpg"
                    alt="Pablo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  🎉 Pablo
                </p>
              </div>
            </div>

            {/* Keyla */}
            <div className="flex flex-col items-center">
              <div
                className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleSelectMember("keyla")}
                onMouseEnter={() => setHoveredMember("keyla")}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div
                  className={`${
                    memberSizes.medium
                  } rounded-full border-4 shadow-md flex items-center justify-center overflow-hidden ${
                    memberStyles.keyla
                  } ${
                    hoveredMember === "keyla" ? "ring-4 ring-purple-200" : ""
                  }`}
                >
                  <img
                    src="/keyla.jpg"
                    alt="Keyla"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  🎂 Keyla
                </p>
              </div>
            </div>

            {/* Ely y familia */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                {/* Esposo de Ely */}
                <div
                  className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleSelectMember("esposoEly")}
                  onMouseEnter={() => setHoveredMember("esposoEly")}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div
                    className={`${
                      memberSizes.small
                    } rounded-full border-4 shadow flex items-center justify-center overflow-hidden ${
                      memberStyles.esposoEly
                    } ${
                      hoveredMember === "esposoEly"
                        ? "ring-4 ring-blue-200"
                        : ""
                    }`}
                  >
                    <img
                      src="/m.jpeg"
                      alt="Esposo de Ely"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                    Solano
                  </p>
                </div>

                {/* Línea conectora */}
                <div className="h-1 w-6 bg-gradient-to-r from-blue-300 to-yellow-300"></div>

                {/* Ely */}
                <div
                  className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleSelectMember("ely")}
                  onMouseEnter={() => setHoveredMember("ely")}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div
                    className={`${
                      memberSizes.medium
                    } rounded-full border-4 shadow-md flex items-center justify-center overflow-hidden ${
                      memberStyles.ely
                    } ${
                      hoveredMember === "ely" ? "ring-4 ring-yellow-200" : ""
                    }`}
                  >
                    <img
                      src="/ely.jpg"
                      alt="Ely"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold bg-white px-2 py-1 rounded-full shadow-sm">
                    🎁 Ely
                  </p>
                </div>
              </div>

              {/* Línea a hija */}
              <div className="h-6 w-1 bg-gradient-to-b from-yellow-300 to-pink-300 mt-2 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-300 rounded-full"></div>
              </div>

              {/* Hija de Ely */}
              <div
                className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105 mt-2"
                onClick={() => handleSelectMember("hijaEly")}
                onMouseEnter={() => setHoveredMember("hijaEly")}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div
                  className={`${
                    memberSizes.small
                  } rounded-full border-4 shadow flex items-center justify-center overflow-hidden ${
                    memberStyles.hijaEly
                  } ${
                    hoveredMember === "hijaEly" ? "ring-4 ring-pink-200" : ""
                  }`}
                >
                  <img
                    src="/m.jpeg"
                    alt="Hija de Ely"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                  Melani
                </p>
              </div>
            </div>

            {/* Shami y familia */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                {/* Esposo de Shami */}
                <div
                  className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleSelectMember("esposoShami")}
                  onMouseEnter={() => setHoveredMember("esposoShami")}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div
                    className={`${
                      memberSizes.small
                    } rounded-full border-4 shadow flex items-center justify-center overflow-hidden ${
                      memberStyles.esposoShami
                    } ${
                      hoveredMember === "esposoShami"
                        ? "ring-4 ring-blue-200"
                        : ""
                    }`}
                  >
                    <img
                      src="/m.jpeg"
                      alt="Esposo de Shami"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                    Teo
                  </p>
                </div>

                {/* Línea conectora */}
                <div className="h-1 w-6 bg-gradient-to-r from-blue-300 to-red-300"></div>

                {/* Shami */}
                <div
                  className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleSelectMember("shami")}
                  onMouseEnter={() => setHoveredMember("shami")}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div
                    className={`${
                      memberSizes.medium
                    } rounded-full border-4 shadow-md flex items-center justify-center overflow-hidden ${
                      memberStyles.shami
                    } ${
                      hoveredMember === "shami" ? "ring-4 ring-red-200" : ""
                    }`}
                  >
                    <img
                      src="/m.jpeg"
                      alt="Shami"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold bg-white px-2 py-1 rounded-full shadow-sm">
                    🎊 Shami
                  </p>
                </div>
              </div>

              {/* Línea a hija */}
              <div className="h-6 w-1 bg-gradient-to-b from-red-300 to-pink-300 mt-2 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-300 rounded-full"></div>
              </div>

              {/* Hija de Shami */}
              <div
                className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-105 mt-2"
                onClick={() => handleSelectMember("hijaShami")}
                onMouseEnter={() => setHoveredMember("hijaShami")}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div
                  className={`${
                    memberSizes.small
                  } rounded-full border-4 shadow flex items-center justify-center overflow-hidden ${
                    memberStyles.hijaShami
                  } ${
                    hoveredMember === "hijaShami" ? "ring-4 ring-pink-200" : ""
                  }`}
                >
                  <img
                    src="/m.jpeg"
                    alt="Hija de Shami"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                  Britnay
                </p>
              </div>
            </div>
          </div>

          {/* Mascota */}
        </div>

        {/* Calendario */}
        <h2
          id="calendario"
          className="text-2xl sm:text-3xl font-bold mt-14 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          📅 Cumpleaños en el Calendario
        </h2>
        <div className="w-full max-w-5xl bg-white p-4 sm:p-6 rounded-2xl shadow-xl overflow-x-auto">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView={calendarView}
            events={cumpleanos}
            height="auto"
            aspectRatio={window.innerWidth < 500 ? 0.8 : 1.5} // Ajusta relación en móvil
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                window.innerWidth < 500
                  ? "dayGridWeek,timeGridDay"
                  : "dayGridMonth,dayGridWeek,timeGridDay",
            }}
            buttonText={{
              today: window.innerWidth < 500 ? "Hoy" : "Today",
              month: window.innerWidth < 500 ? "Mes" : "Month",
              week: window.innerWidth < 500 ? "Semana" : "Week",
              day: window.innerWidth < 500 ? "Día" : "Day",
            }}
            dayMaxEventRows={window.innerWidth < 500 ? 2 : 3} // menos eventos en móvil
            dayCellDidMount={(info) => {
              if (info.dateStr === selectedDate) {
                info.el.style.backgroundColor = "#fef3c7";
                info.el.style.border = "2px solid #f59e0b";
                info.el.style.borderRadius = "8px";
                info.el.classList.add("animate-pulse");
              }
            }}
            eventContent={(arg) => (
              <div className="text-xs sm:text-sm truncate px-1">
                {arg.event.title}
              </div>
            )}
            className="overflow-x-auto w-full"
          />
        </div>
      </main>
    </div>
  );
}
