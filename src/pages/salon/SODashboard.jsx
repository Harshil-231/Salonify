import React from "react";
import { SONavbar } from "../../pages/salon/SONavbar";
import { SOSidebar } from "../../pages/salon/SOSidebar";
import { Outlet } from "react-router-dom"; // Import Outlet

export const SODashboard = () => {
    return (
        <div className="h-screen flex flex-col bg-none">
            <SONavbar />
            <div className="flex flex-1">
                {/* Sidebar - Stays visible on medium+ screens */}
                <div className="w-64 hidden md:block">
                    <SOSidebar />
                </div>
                
                <div className="flex-1 mt-24" > {/* Make the content area flexible */}
                    <Outlet /> {/* Render nested routes here */}
                </div>
                
            </div>
        </div>
    );
};