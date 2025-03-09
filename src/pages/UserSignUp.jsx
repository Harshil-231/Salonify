import React from 'react'
import { Link } from 'react-router-dom'

import "../styles/signuplogin.css";

export const UserSignUp = () => {
    return (
        <div className="signup-container">
            {/* Left Side */}
            <div className="left">
                <button className="back-btn">←</button>
                <h2>Sign up/log in</h2>
                <Link to="/signup" className="option-card">
                    <div className="text">
                        <strong>Salonify for customers</strong>
                        <p>Book salons and spas near you</p>
                    </div>
                    <span className="arrow">→</span>
                </Link>

                <Link to="/business" className="option-card">
                    <div className="text">
                        <strong>Salonify for professionals</strong>
                        <p>Manage and grow your business</p>
                    </div>
                    <span className="arrow">→</span>
                </Link>
            </div>

            {/* Right Side (Image) */}
            <div className="right">
                <img src="/images/boy.png" alt="Smiling Woman" />
            </div>
        </div >
    );
};

