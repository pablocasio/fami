import mongoose from "mongoose";

const actividadSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["familiar", "personal"],
      default: "personal",
    },
    visibilidad: {
      type: String,
      enum: ["publico", "privado"],
      default: "publico",
    },
    completado: {
      type: Boolean,
      default: false,
    },
    creado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Asegúrate que tu modelo de usuario se llame "User"
      required: true,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Actividad", actividadSchema);
