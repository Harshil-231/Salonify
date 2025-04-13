import React from "react";
import { Link, useLocation } from "react-router-dom";
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
import { X } from "lucide-react";

export const UserSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { to: "profile", icon: faUser, label: "Profile" },
    { to: "appointments", icon: faCalendar, label: "Appointments" },
    { to: "wallet", icon: faWallet, label: "Wallet" },
    { to: "favourites", icon: faHeart, label: "Favourites" },
    { to: "forms", icon: faFile, label: "Forms" },
    { to: "orders", icon: faBox, label: "Product Orders" },
    { to: "settings", icon: faCog, label: "Settings" },
  ];

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Content */}
        <div className="pt-20 pb-6">
          <nav className="space-y-1 px-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => onClose()}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`w-5 h-5 ${
                    isActive(link.to) ? "text-purple-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};