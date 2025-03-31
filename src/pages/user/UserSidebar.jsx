import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faCalendar, faWallet,
  faHeart, faFile, faBox, faCog, faBars
} from "@fortawesome/free-solid-svg-icons";

export const UserSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-8 left-40 text-white p-2 rounded-md z-20"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar (Fixed below the Navbar) */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white transition-transform 
        ${open ? "translate-x-0" : "-translate-x-64"}`}
      >
        <nav className="mt-4">
          <Link to="profile" className=" p-4 hover:bg-gray-700  hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
          <Link to="appointments" className=" p-4 hover:bg-gray-700  hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendar} /> Appointments
          </Link>
          <Link to="wallet" className="p-4 hover:bg-gray-700 flex  hover:text-blue-300 hover:no-underline items-center gap-2">
            <FontAwesomeIcon icon={faWallet} /> Wallet
          </Link>
          <Link to="favourites" className="p-4 hover:bg-gray-700 hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faHeart} /> Favourites
          </Link>
          <Link to="forms" className=" p-4 hover:bg-gray-700  hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faFile} /> Forms
          </Link>
          <Link to="orders" className="p-4 hover:bg-gray-700  hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} /> Product Orders
          </Link>
          <Link to="settings" className=" p-4 hover:bg-gray-700  hover:text-blue-300 hover:no-underline flex items-center gap-2">
            <FontAwesomeIcon icon={faCog} /> Settings
          </Link>
        </nav>
      </div>
    </>
  );
};
