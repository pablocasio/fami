import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { set } from "mongoose";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setErrors] = useState();
  //creamos un estado de carga
  const [loading, setLoading] = useState(true);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data);
    }
  };

  const loginn = async (userData) => {
    try {
      const res = await loginRequest(userData);

      // ✅ solo guardamos si el backend devuelve valores
      if (res.data?.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
      }
      if (res.data?.user) {
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
        setUser(res.data.user);
      }

      setIsAuthenticated(true);
      console.log("Respuesta login:", res.data);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data);
    }
  };
  //para arreglar el acceso despues de logearnos

  useEffect(() => {
    const token = Cookies.get("token");

    if (token && token !== "undefined") {
      console.log("Token encontrado:", token);
      setIsAuthenticated(true);

      const savedUser = Cookies.get("user");
      if (savedUser && savedUser !== "undefined") {
        try {
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Error al parsear usuario:", err);
          Cookies.remove("user"); // 🔥 limpia cookie corrupta
        }
      }
    } else {
      console.log("⚠️ No hay token en cookies");
      setIsAuthenticated(false);
      setUser(null);
    }
    if (token) {
      async function checkLogin() {
        try {
          const res = await verifyTokenRequest(token);
          console.log("Respuesta de verificación:", res.data);
          if (!res.data) {
            setLoading(false);
            setIsAuthenticated(true);
            setUser(res.data);
            return;
          }
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
      checkLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, loginn, isAuthenticated, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
