import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import UserAuth from '../Common/UserAuth'; // Import AuthButton
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the bars icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutFromNavbar = () => {
        // logout tasks 
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src="/images/Salonify.png" alt="logo" />
            </Link>

            <div className="menu-container row" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <button className="menu-toggle ml-9 ">
                <FontAwesomeIcon icon={faBars} />
                </button>

                <ul className="nav-menu">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/features" className="nav-link">Features</Link></li>
                    <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                    <li><Link to="/blog" className="nav-link">Blog</Link></li>
                </ul>
                   
                <UserAuth  onLogout={handleLogoutFromNavbar} />
                   
            </div>
        </nav>
    );
};