import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";

export const SONavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed w-full top-0 z-10">
            {/* Logo & Home Button */}
            <div className="flex items-center">
                <img src="/images/Salonify.png" alt="Logo" className="h-10 w-100" />
            </div>

            {/* Search Bar */}
            <div className="relative w-1/3 hidden sm:flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 bg-gray-800 border border-gray-600 rounded-md focus:outline-none"
                />
                <FaSearch className="absolute -left-6 top-3 text-gray-400" />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FaUser className="text-xl cursor-pointer hover:text-gray-300" />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg">
                        <a href="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
                        <a href="/logout" className="block px-4 py-2 hover:bg-gray-700">Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};
