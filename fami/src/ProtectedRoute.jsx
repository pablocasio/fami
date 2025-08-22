import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  console.log("loading en ProtectedRoute:", loading);
  console.log("isAuthenticated en ProtectedRoute:", isAuthenticated);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
