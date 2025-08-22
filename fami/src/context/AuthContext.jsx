import React, { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/";
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data);
    }
  };

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
      if (res.data?.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
      }
      if (res.data?.user) {
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
        setUser(res.data.user);
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && token !== "undefined") {
      setIsAuthenticated(true);
      const savedUser = Cookies.get("user");
      if (savedUser && savedUser !== "undefined") {
        try {
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Error al parsear usuario:", err);
          Cookies.remove("user");
        }
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    if (token) {
      async function checkLogin() {
        try {
          const res = await verifyTokenRequest(token);
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
      value={{
        user,
        signup,
        loginn,
        isAuthenticated,
        error,
        loading,
        logout, // Asegúrate de que logout esté incluido aquí
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// No es necesario exportar AuthContext por separado si ya se exporta useAuth y AuthProvider
