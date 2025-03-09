import React, { useState } from "react";
import { FaBars, FaChevronDown, FaChartPie, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../../Styles/SalonDashboard.css";

export const SalonDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleDropdown = (menu) => {
        setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="salondashboard-navbar">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <h1>Salonify Dashboard</h1>
            </nav>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <ul className="sidebar-menu">
                    <li className="menu-item">
                        <FaChartPie />
                        <span>Dashboard</span>
                    </li>

                    <li className="menu-item dropdown">
                        <div onClick={() => toggleDropdown("appointments")} className="menu-title">
                            <FaUser />
                            <span>Appointments</span>
                            <FaChevronDown className={`arrow ${dropdownOpen["appointments"] ? "open" : ""}`} />
                        </div>
                        {dropdownOpen["appointments"] && (
                            <ul className="submenu">
                                <li>Upcoming</li>
                                <li>Past</li>
                            </ul>
                        )}
                    </li>

                    <li className="menu-item dropdown">
                        <div onClick={() => toggleDropdown("settings")} className="menu-title">
                            <FaCog />
                            <span>Settings</span>
                            <FaChevronDown className={`arrow ${dropdownOpen["settings"] ? "open" : ""}`} />
                        </div>
                        {dropdownOpen["settings"] && (
                            <ul className="submenu">
                                <li>Profile</li>
                                <li>Security</li>
                            </ul>
                        )}
                    </li>

                    <li className="menu-item">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                <div className="stats-cards">
                    <div className="salondashboard-card">💇‍♂️ 150 New Bookings</div>
                    <div className="salondashboard-card">📊 53% Increase</div>
                    <div className="salondashboard-card">🛎️ 44 Active Users</div>
                    <div className="salondashboard-card">🧾 65 Payments Completed</div>
                </div>

                {/* Graph Placeholder */}
                <div className="chart-placeholder">
                    <h2>Sales Overview</h2>
                    <div className="graph">📈 Graph will be here</div>
                </div>
            </main>
        </div>
    );
};
