import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import UserAuth from '../Common/UserAuth'; // Import AuthButton

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutFromNavbar = () => {
        // Perform any additional logout tasks here
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src="/images/Salonify.png" alt="logo" />
            </Link>

            <div className="menu-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <button className="menu-toggle">☰</button>

                <ul className="nav-menu">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/features" className="nav-link">Features</Link></li>
                    <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                    <li><Link to="/blog" className="nav-link">Blog</Link></li>
                    <li>
                        <UserAuth onLogout={handleLogoutFromNavbar} />
                    </li>
                </ul>
            </div>
        </nav>
    );
};