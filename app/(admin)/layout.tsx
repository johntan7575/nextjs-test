import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="m-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
