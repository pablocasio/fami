import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // 👈 esto es el contenido del token
      TOKEN_SECRET, // 👈 aquí va la clave secreta (string)
      { expiresIn: "8h" }, // 👈 opciones del token
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err); // importante rechazar en caso de error
        } else {
          resolve(token);
        }
      }
    );
  });
}
