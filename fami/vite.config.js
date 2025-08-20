import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // ← Esto está mal

export default defineConfig({
  plugins: [tailwindcss()], // ← Esto también
});
