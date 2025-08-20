import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "El nombre de usuario es requerido",
    "string.alphanum":
      "El nombre de usuario solo puede contener letras y números",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
    "string.max": "El nombre de usuario no puede tener más de 30 caracteres",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "El email es requerido",
    "string.email": "El email no es válido",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es requerida",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "El email es requerido",
    "string.email": "El email no es válido",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es requerida",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});
