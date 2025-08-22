import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config(); // carga las variables de .env

connectDB();

const PORT = process.env.PORT || 3000; // usa la variable de entorno o 3000 si no existe

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
