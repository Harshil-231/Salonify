import React from "react";
import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";
import { Outlet } from "react-router-dom"; // Enables nested routing


export const UserDashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
        <UserHeader />
      </div>

      {/* Main Container (Below Navbar) */}
      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar (Hidden on small screens, fixed on larger screens) */}
        <div className="hidden md:block fixed top-[70px] left-0 h-[calc(100vh-70px)] w-64 shadow-md overflow-y-auto">
          <UserSidebar />
        </div>

        {/* Main Content (Centered with Equal Margin) */}
        <main className="flex-1 mx-auto max-w-4xl p-6 overflow-y-auto">
          <Outlet /> {/* Enables nested pages within the dashboard */}
        </main>
      </div>
    </div>
  );
};
