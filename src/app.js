import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import activities from "./routes/activities.routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // 👈 Esto es lo que permite enviar cookies/sesiones
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", authRoutes);
app.use("/api", activities);
export default app;
