import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importar

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginn, errors: SigninErrors = [] } = useAuth();
  const navigate = useNavigate(); // 👈 Inicializar

  const onSubmit = async (data) => {
    try {
      console.log("Datos del formulario:", data);
      await loginn(data); // Llamada al backend
      navigate("/actividades"); // 👈 Redirige tras login correcto
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="login min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {(SigninErrors || []).map((error, index) => (
          <p key={index} className="text-red-500 text-sm mt-1">
            {error}
          </p>
        ))}

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h2>

        <img src="../img/idle/1.png" alt="" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              {...register("email", { required: "El correo es obligatorio" })}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
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
              })}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
