import React, { useState, useRef, useEffect } from "react";
import "../../Styles/user.css";
import {
    FaBars,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa"; // Import arrow icons
import { Link } from "react-router-dom"; // Import Link

export const UserProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
    const dropdownRef = useRef(null); // Ref for click outside detection

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="fresh-profile-page">
            {/* ... (rest of your component) */}
            <header className="fresh-header">
                {/* ... (logo, menu button, search bar) */}
                <div className="fresh-logo">Salonify</div>
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <div className="fresh-search-bar">
                    <input type="text" placeholder=" All treatments" />
                    <input type="text" placeholder=" Current location" />
                    <input type="text" placeholder=" Any date" />
                    <input type="text" placeholder=" Any time" />
                </div>
                <div className="fresh-user-icon-nd-drop">

                    <div className="fresh-user-icon" ref={dropdownRef}>
                        <div
                            className="fresh-user-icon-placeholder"
                            onClick={toggleDropdown}
                        ></div>
                        <button
                            className="fresh-dropdown-arrow"
                            onClick={toggleDropdown}
                        >
                            {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {dropdownOpen && (
                            <div className="fresh-dropdown">
                                <div className="fresh-dropdown-title">Harshil Panchal</div>
                                <Link to="/profile" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Profile icon */}
                                    </span>
                                    Profile
                                </Link>
                                <Link to="/appointments" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Appointments icon */}
                                    </span>
                                    Appointments
                                </Link>
                                <Link to="/wallet" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Wallet icon */}
                                    </span>
                                    Wallet
                                </Link>
                                <Link to="/favourites" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Favourites icon */}
                                    </span>
                                    Favourites
                                </Link>
                                <Link to="/forms" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Forms icon */}
                                    </span>
                                    Forms
                                </Link>
                                <Link to="/product-orders" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Product Orders icon */}
                                    </span>
                                    Product orders
                                </Link>
                                <Link to="/settings" className="fresh-dropdown-item">
                                    <span className="fresh-dropdown-icon">
                                        {/* Replace with Settings icon */}
                                    </span>
                                    Settings
                                </Link>
                                <Link to="/logout" className="fresh-dropdown-item">
                                    Log out
                                </Link>
                                <div className="fresh-dropdown-divider"></div>
                                <div className="fresh-dropdown-title">Other</div>
                                <Link to="/businesses" className="fresh-dropdown-item">
                                    For businesses
                                </Link>
                                <Link to="/download-app" className="fresh-dropdown-item">
                                    Download the app
                                </Link>
                                <Link to="/customer-support" className="fresh-dropdown-item">
                                    Customer support
                                </Link>
                                <Link to="/english" className="fresh-dropdown-item">
                                    GB English
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <aside className={`fresh-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="fresh-sidebar-title">Harshil Panchal</div>
                <Link to="/profile" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Profile icon */}
                    </span>
                    Profile
                </Link>
                <Link to="/appointments" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Appointments icon */}
                    </span>
                    Appointments
                </Link>
                <Link to="/wallet" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Wallet icon */}
                    </span>
                    Wallet
                </Link>
                <Link to="/favourites" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Favourites icon */}
                    </span>
                    Favourites
                </Link>
                <Link to="/forms" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Forms icon */}
                    </span>
                    Forms
                </Link>
                <Link to="/product-orders" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Product Orders icon */}
                    </span>
                    Product orders
                </Link>
                <Link to="/settings" className="fresh-dropdown-item">
                    <span className="fresh-dropdown-icon">
                        {/* Replace with Settings icon */}
                    </span>
                    Settings
                </Link>
            </aside>

            <main className="fresh-main-content">
                <div className="fresh-profile-details">
                    <Link to="/user-profile/edit">
                        <div className="fresh-profile-edit-btn">
                            Edit
                        </div>
                    </Link>
                    <div className="fresh-profile-image">
                        {/* Replace with an actual profile image */}
                        <div className="fresh-profile-image-placeholder"></div>
                        <button className="fresh-edit-button">Edit</button>
                    </div>
                    <div className="fresh-profile-name">Harshil Panchal</div>
                    <div className="fresh-profile-field">
                        <label>First name</label>
                        <div>Harshil</div>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Last name</label>
                        <div>Panchal</div>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Mobile number</label>
                        <div>-</div>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Email</label>
                        <div>harshilpanchal1523@gmail.com</div>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Date of birth</label>
                        <div>-</div>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Gender</label>
                        <div>-</div>
                    </div>
                </div> 

                <div className="fresh-address-section">
                    <div className="fresh-address-title">My addresses</div>
                    <div className="fresh-address-card">
                        <div className="fresh-address-card-title">Home</div>
                        <div className="fresh-address-card-description">
                            Add a home address
                        </div>
                    </div>
                    <div className="fresh-address-card">
                        <div className="fresh-address-card-title">Work</div>
                        <div className="fresh-address-card-description">
                            Add a work address
                        </div>
                    </div>
                    <button className="fresh-add-address-button">Add</button>
                </div>
            </main>
        </div>
    );
};