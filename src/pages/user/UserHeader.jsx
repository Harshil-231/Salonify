import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, ChevronUp, Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faWallet,
  faHeart,
  faFile,
  faBox,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export const UserHeader = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarLinks = [
    { to: "profile", icon: faUser, label: "Profile" },
    { to: "appointments", icon: faCalendar, label: "Appointments" },
    { to: "wallet", icon: faWallet, label: "Wallet" },
    { to: "favourites", icon: faHeart, label: "Favourites" },
    { to: "forms", icon: faFile, label: "Forms" },
    { to: "orders", icon: faBox, label: "Product Orders" },
    { to: "settings", icon: faCog, label: "Settings" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="px-4 h-[72px] flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <img src="/images/Salonify.png" alt="logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search treatments, locations, or dates..."
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            <img
              src="/images/suit.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {dropdownOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden">
              <div className="p-3 border-b">
                <p className="font-medium">Harshil Panchal</p>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
              <nav className="py-2">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="border-t p-3">
                <Link
                  to="/pricing"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  For businesses
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>
    </header>
  );
};