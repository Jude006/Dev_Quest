// routes/AppRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/NotFound";
import MinimalLayout from "../layouts/MinimalLayout";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route
        path="/user/*"
        element={
          <ProtectedRoutes requiredRole="user">
            <UserRoutes />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoutes requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoutes>
        }
      />

      {/* Error pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
