import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ Import correcto
import ProtectedRoute from "./ProtectedRoute.jsx";
import Actividades from "./pages/ActividadesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Home from "./pages/Home.jsx"; // Importar Home si es necesario
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<h1>home</h1>} /> */}
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/calendario" element={<h1>calendario</h1>} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/home" element={<Home />} />
            <Route path="/arbol-genealogico" element={<HomePage />} />
          </Route>
          <Route path="/admin" element={<h1>admin</h1>} />
          <Route path="*" element={<h1>no existe esta ruta</h1>} />
        </Routes>
        s
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
