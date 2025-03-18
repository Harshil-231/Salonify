import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"; // Ensure this file exists

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="logo">✂ 𝙎𝙖𝙡𝙤𝙣𝙞𝙛𝙮</Link>

            {/* Menu Container (Wrap button + menu for hover effect) */}
            <div className="menu-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                {/* Mobile Menu Button */}
                <button className="menu-toggle">☰</button>

                {/* Navigation Links */}
                <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/features" className="nav-link">Features</Link></li>
                    <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                    <li><Link to="/blog" className="nav-link">Blog</Link></li>
                    <li><Link to="/authpage" className="nav-btn">Login</Link></li>
                    {/* <li><Link to="/login" className="nav-btn">Login</Link></li> */}
                    {/* <li><Link to="/signup" className="nav-btn">Sign Up</Link></li> */}
                </ul>
            </div>
        </nav>
    );
};
