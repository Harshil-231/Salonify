import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserAuth = ({ onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        const storedRole = localStorage.getItem('role');

        if (storedId && storedRole) {
            setIsLoggedIn(true);
            setUser({ id: storedId, role: storedRole });
        }
    }, []);

    const handleLogin = () => navigate('/authpage');

    const handleProfile = () => {
        if (user && user.role) {
            switch (user.role) {
                case 'customer':
                    navigate('/user-dashboard');
                    break;
                case 'owner':
                    navigate('/so-dashboard');
                    break;
                // case 'staff':
                //     navigate('/staff-dashboard');
                //     break;
                case 'admin':
                    navigate('/');
                    break;
                default:
                    console.warn('Unknown role:', user.role);
                    navigate('/');
            }
        }
        setShowDropdown(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        onLogout();
        setShowDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    if (isLoggedIn && user) {
        return (
            <div className="relative">
                <button className="nav-btn mt-2.5" onClick={() => setShowDropdown(!showDropdown)}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span>Profile</span>
                </button>
                {showDropdown && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 -mr-11 w-40 bg-white text-black rounded shadow-md">
                        <button className="block w-full text-left p-2  hover:bg-gray-900 hover:text-cyan-100" onClick={handleProfile}>
                            <FontAwesomeIcon icon={faUser} className="mr-3" />Profile
                        </button>
                        <button className="block w-full text-left p-2 hover:bg-gray-900 hover:text-cyan-100 items-center" onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <button
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-white p-2 rounded transition-all "
                onClick={handleLogin}
            >
                Login
            </button>
        );
    }
};

export default UserAuth;