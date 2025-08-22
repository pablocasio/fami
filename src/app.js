import "dotenv/config"; // Esto carga automáticamente las variables de tu .env
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import activities from "./routes/activities.routes.js";
import cors from "cors";

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // tu frontend
    credentials: true, // permite enviar cookies
  })
);

// Middleware para parsear JSON
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Rutas
app.use("/api", authRoutes);
app.use("/api", activities);

export default app;
