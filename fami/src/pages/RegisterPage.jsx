import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigation = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir o realizar alguna acción si el usuario está autenticado
      navigation("/login"); // Redirigir a la página de inicio
    }
  }, [isAuthenticated]);

  // ✅ Aquí realmente se ejecuta signup
  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro de Usuario
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
              })}
              placeholder="Nombre de usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
              })}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
