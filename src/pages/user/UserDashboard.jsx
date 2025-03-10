import React, { useState } from "react";
import "../../styles/user.css"; // Using normal CSS instead of Tailwind
import { faCalendar, faClock, faStar, faWallet, faHeart, faCog } from "@fortawesome/free-solid-svg-icons";
import { FaBars, FaChevronDown, FaChartPie, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserDashboard = () => {
    const [user] = useState({
        name: "Hp",
        points: 200,
        nextReward: "₹100 off",
        upcomingAppointment: {
            salon: "Luxe Salon",
            service: "Haircut & Styling",
            date: "March 15, 2025",
            time: "3:00 PM",
        },
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleDropdown = (menu) => {
        setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };



    return (
        <>

            <nav className="salondashboard-navbar">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <h1>Salonify Dashboard</h1>
            </nav>

            <div className="ud-dashboard-container">
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

                {/* Welcome Card (Full Width) */}
                <div className="ud-welcome-card">
                    <h2>Hello, {user.name}! Ready for your next pampering session?</h2>
                    <button className="ud-edit-profile-btn">Edit Profile</button>
                </div>

                {/* Dashboard Grid */}
                <div className="ud-dashboard-grid">
                    <div className="ud-dashboard-card">
                        <div className="ud-card-header">
                            <FontAwesomeIcon icon={faCalendar} size="lg" />
                            <span>Upcoming Appointment</span>
                        </div>
                        <p><strong>Salon:</strong> {user.upcomingAppointment.salon}</p>
                        <p><strong>Service:</strong> {user.upcomingAppointment.service}</p>
                        <p><strong>Date:</strong> {user.upcomingAppointment.date}</p>
                        <p><strong>Time:</strong> {user.upcomingAppointment.time}</p>
                        <button className="ud-action-btn">Modify / Cancel</button>
                    </div>

                    <div className="ud-dashboard-card">
                        <div className="ud-card-header">
                            <FontAwesomeIcon icon={faStar} size="lg" />
                            <span>Loyalty Points</span>
                        </div>
                        <p className="ud-points">{user.points} Points</p>
                        <p className="ud-reward-text">Earn {user.nextReward} by booking 2 more services!</p>
                    </div>

                    <div className="ud-dashboard-card">
                        <div className="ud-card-header">
                            <FontAwesomeIcon icon={faWallet} size="lg" />
                            <span>Payments & Transactions</span>
                        </div>
                        <button className="ud-action-btn">View All Payments</button>
                    </div>

                    <div className="ud-dashboard-card">
                        <div className="ud-card-header">
                            <FontAwesomeIcon icon={faHeart} size="lg" />
                            <span>Favorite Salons</span>
                        </div>
                        <button className="ud-action-btn">View Saved Salons</button>
                    </div>

                    <div className="ud-dashboard-card">
                        <div className="ud-card-header">
                            <FontAwesomeIcon icon={faCog} size="lg" />
                            <span>Account Settings</span>
                        </div>
                        <button className="ud-action-btn">Manage Settings</button>
                    </div>
                </div>
            </div>
        </>
    );

};