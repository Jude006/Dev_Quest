import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import ContentManagement from "../pages/admin/ContentManagement";
// import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";
import DashboardLayout from "../components/admin/DashboardLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManagement />} />
        {/* <Route path="analytics" element={<Analytics />} /> */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;