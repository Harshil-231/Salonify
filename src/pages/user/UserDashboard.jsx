import React, { useState } from "react";
import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <UserHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Container */}
      <div className="flex pt-[72px]">
        {/* Sidebar */}
        <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-6 transition-all duration-200 ease-in-out md:ml-64">
          <div className="max-w-4xl mx-auto">
            <Outlet />
            
          </div>
        </main>
      </div>
    </div>
  );
};