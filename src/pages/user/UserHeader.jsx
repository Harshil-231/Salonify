import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const UserHeader = () => {
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

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md px-6 py-3 z-50">
            {/* Header Container */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* Logo & Mobile Profile */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/images/Salonify.png" alt="logo" className="h-16 w-auto" />
                    </Link>

                    {/* Profile Dropdown (Mobile) */}
                    <div className="relative md:" ref={dropdownRef}>
                        <div className="relative flex-shrink-0 md:hidden" ref={dropdownRef}>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                                <img
                                    src="/images/chacha.jpg" // Your profile image
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <button>
                                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                        </div>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-blue-800 border rounded-lg shadow-lg p-2 z-50 flex flex-col">
                                <div className="px-3 py-2 font-semibold">Harshil Panchal</div>
                                <Link to="/user-profile">Profile</Link>
                                <Link to="/user-appointments">Appointments</Link>
                                <Link to="/wallet">Wallet</Link>
                                <Link to="/favourites">Favourites</Link>
                                <Link to="/forms">Forms</Link>
                                <Link to="/product-orders">Product orders</Link>
                                <Link to="/settings">Settings</Link>
                                <Link to="/logout">Log out</Link>
                                <hr className="my-2" />
                                <div className="px-3 py-2 font-semibold">Other</div>
                                <Link to="/businesses">For businesses</Link>
                                <Link to="/download-app">Download the app</Link>
                                <Link to="/customer-support">Customer support</Link>
                                <Link to="/english">GB English</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100 p-2 rounded-lg shadow-sm w-full max-w-2xl">
                        <input type="text" placeholder="All treatments" />
                        <input type="text" placeholder="Current location" />
                        <input type="text" placeholder="Any date" />
                        <input type="text" placeholder="Any time" />
                    </div>
                </div>

                {/* Profile Dropdown (Desktop) */}
                <div className="hidden md:flex relative" ref={dropdownRef}>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                        <div className="relative flex-shrink-0 md:hidden" ref={dropdownRef}>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                                <img
                                    src="/images/suit.jpg" // Your profile image
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <button>
                                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                        </div> {/* User Icon Placeholder */}
                        <button>{dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</button>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-7 w-56 bg-blue-800 border rounded-lg shadow-lg p-2 z-50">
                            <div className="px-3 py-2 font-semibold">Harshil Panchal</div>
                            <Link to="profile">Profile</Link>
                            <Link to="appointments">Appointments</Link>
                            <Link to="wallet">Wallet</Link>
                            <Link to="favourites">Favourites</Link>
                            <Link to="forms">Forms</Link>
                            <Link to="product-orders">Product orders</Link>
                            <Link to="settings">Settings</Link>
                            <Link to="logout">Log out</Link>
                            <hr className="my-2" />
                            <div className="px-3 py-2 font-semibold">Other</div>
                            <Link to="/businesses">For businesses</Link>
                            <Link to="/download-app">Download the app</Link>
                            <Link to="/customer-support">Customer support</Link>
                            <Link to="/english">GB English</Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};
