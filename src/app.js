import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import activities from "./routes/activities.routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // usa la variable del .env
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", authRoutes);
app.use("/api", activities);
export default app;
