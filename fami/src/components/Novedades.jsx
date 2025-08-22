import React, { useState } from "react";

function Novedades() {
  const [novedades, setNovedades] = useState([
    {
      id: 1,
      titulo: "🎉 ¡Feliz Cumpleaños Pablo!",
      contenido:
        "Hoy celebramos los 18 años de nuestro querido Pablo. ¡Felicidades!",
      fecha: "2024-07-24",
      autor: "Mamá",
      importante: true,
      comentarios: [
        {
          autor: "Ely",
          mensaje: "¡Feliz cumpleaños hermanito! 🎂",
          fecha: "2024-07-24",
        },
        {
          autor: "Shami",
          mensaje: "Disfruta tu día especial 🎁",
          fecha: "2024-07-24",
        },
      ],
    },
    {
      id: 2,
      titulo: "📸 Reunión Familiar",
      contenido:
        "Este domingo tenemos reunión familiar en casa de papá. ¡No falten! Traer algo para compartir.",
      fecha: "2024-07-20",
      autor: "Papá",
      importante: true,
      comentarios: [],
    },
    {
      id: 3,
      titulo: "🏆 Logro Destacado",
      contenido:
        "Melani ganó el primer lugar en el concurso de matemáticas de su escuela. ¡Estamos muy orgullosos!",
      fecha: "2024-07-18",
      autor: "Ely",
      importante: false,
      comentarios: [
        {
          autor: "Abuela",
          mensaje: "¡Qué inteligente nuestra nieta! 👏",
          fecha: "2024-07-18",
        },
      ],
    },
  ]);

  const [nuevaNovedad, setNuevaNovedad] = useState({
    titulo: "",
    contenido: "",
    importante: false,
  });

  const [nuevoComentario, setNuevoComentario] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarNovedad = (e) => {
    e.preventDefault();
    if (nuevaNovedad.titulo && nuevaNovedad.contenido) {
      const novedad = {
        id: Date.now(),
        titulo: nuevaNovedad.titulo,
        contenido: nuevaNovedad.contenido,
        fecha: new Date().toISOString().split("T")[0],
        autor: "Tú",
        importante: nuevaNovedad.importante,
        comentarios: [],
      };
      setNovedades([novedad, ...novedades]);
      setNuevaNovedad({ titulo: "", contenido: "", importante: false });
      setMostrarFormulario(false);
    }
  };

  const agregarComentario = (novedadId, mensaje) => {
    if (mensaje.trim()) {
      setNovedades(
        novedades.map((novedad) => {
          if (novedad.id === novedadId) {
            return {
              ...novedad,
              comentarios: [
                ...novedad.comentarios,
                {
                  autor: "Tú",
                  mensaje,
                  fecha: new Date().toISOString().split("T")[0],
                },
              ],
            };
          }
          return novedad;
        })
      );
      setNuevoComentario({ ...nuevoComentario, [novedadId]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📢 Novedades Familiares
          </h1>
          <p className="text-gray-600">
            Mantente al día con las noticias de nuestra familia
          </p>
        </div>

        {/* Botón para agregar novedad */}
        <div className="text-center mb-6">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {mostrarFormulario ? "Cancelar" : "+ Agregar Novedad"}
          </button>
        </div>

        {/* Formulario para nueva novedad */}
        {mostrarFormulario && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Comparte una novedad</h2>
            <form onSubmit={agregarNovedad}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={nuevaNovedad.titulo}
                  onChange={(e) =>
                    setNuevaNovedad({ ...nuevaNovedad, titulo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: ¡Feliz Cumpleaños!"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Contenido</label>
                <textarea
                  value={nuevaNovedad.contenido}
                  onChange={(e) =>
                    setNuevaNovedad({
                      ...nuevaNovedad,
                      contenido: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Comparte los detalles..."
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={nuevaNovedad.importante}
                    onChange={(e) =>
                      setNuevaNovedad({
                        ...nuevaNovedad,
                        importante: e.target.checked,
                      })
                    }
                    className="mr-2 h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">Marcar como importante</span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Publicar Novedad
              </button>
            </form>
          </div>
        )}

        {/* Lista de Novedades */}
        <div className="space-y-6">
          {novedades.map((novedad) => (
            <div
              key={novedad.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                novedad.importante ? "border-l-4 border-yellow-400" : ""
              }`}
            >
              {/* Header de la novedad */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {novedad.titulo}
                  </h2>
                  {novedad.importante && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      ⭐ Importante
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{novedad.contenido}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Por {novedad.autor}</span>
                  <span>{novedad.fecha}</span>
                </div>
              </div>

              {/* Comentarios */}
              {novedad.comentarios.length > 0 && (
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Comentarios
                  </h3>
                  <div className="space-y-3">
                    {novedad.comentarios.map((comentario, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-800">
                            {comentario.autor}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comentario.fecha}
                          </span>
                        </div>
                        <p className="text-gray-600">{comentario.mensaje}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulario para nuevo comentario */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevoComentario[novedad.id] || ""}
                    onChange={(e) =>
                      setNuevoComentario({
                        ...nuevoComentario,
                        [novedad.id]: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe un comentario..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        agregarComentario(
                          novedad.id,
                          nuevoComentario[novedad.id]
                        );
                      }
                    }}
                  />
                  <button
                    onClick={() =>
                      agregarComentario(novedad.id, nuevoComentario[novedad.id])
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío */}
        {novedades.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📢</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No hay novedades aún
            </h2>
            <p className="text-gray-500">
              Sé el primero en compartir una noticia familiar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Novedades;
