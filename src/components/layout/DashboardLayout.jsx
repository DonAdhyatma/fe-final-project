"use client";

import { useAuth } from "../../context/AuthContext";
import SidebarLeft from "./SidebarLeft";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
