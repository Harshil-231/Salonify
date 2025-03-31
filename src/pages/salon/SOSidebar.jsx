import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaCalendarAlt, FaCut, FaUsers, FaWallet, FaStar, FaCog } from "react-icons/fa";

export const SOSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-8 left-40 text-white p-2 rounded-md z-20"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Sidebar (Fixed below the Navbar) */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white transition-transform ${open ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        <ul className="mt-4">
          <li className="p-4 hover:bg-gray-700 flex items-center text-white gap-2">
            <FaUser /> <Link to="profile" className="hover:no-underline hover:text-white">Profile</Link> {/* Corrected Link */}
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaCalendarAlt /> <Link to="/so-appointments" className="hover:no-underline hover:text-white" >Appointments</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaUsers /> <Link to="/so-clients" className="hover:no-underline hover:text-white" >Clients</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaCut /><Link to="/so-manage-services" className="hover:no-underline hover:text-white" >Manage Services</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaUsers /> <Link to="/so-manage-staff" className="hover:no-underline hover:text-white" >Manage Staff</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaStar /> <Link to="/so-reviews" className="hover:no-underline hover:text-white" >Reviews & Ratings</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaWallet /> <Link to="/so-payments" className="hover:no-underline hover:text-white" >Payments</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center gap-2">
            <FaCog /> <Link to="/so-settings" className="hover:no-underline hover:text-white" >Settings</Link>
          </li>
          <li className="p-4 hover:bg-red-700 flex items-center gap-2">
            <FaSignOutAlt /> <Link to="/logout" className="hover:no-underline hover:text-white" >Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};