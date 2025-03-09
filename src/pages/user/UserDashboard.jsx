import React from 'react';
import "../../Styles/UserDashboard.css";
import { Link } from 'react-router-dom'

export const UserDashboard = () => {
    return (
        <div className="homepage-container">
            {/* Header */}
            <header className="header">
                <Link to="/" className="logo">✂ 𝙎𝙖𝙡𝙤𝙣𝙞𝙛𝙮</Link>
                {/* <button className="business-btn">For Businesses</button> */}
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="main-heading">Book local beauty and wellness services</h1>

                {/* Search Box */}
                <div className="search-box">
                    <label className="search-option">
                        <span role="img" aria-label="search">🔍</span>
                        <input type="text" placeholder="All treatments and venues" />
                    </label>
                    <label className="search-option">
                        <span role="img" aria-label="location">📍</span>
                        <input type="text" placeholder="Current location" />
                    </label>
                    <label className="search-option">
                        <span role="img" aria-label="date">📅</span>
                        <input type="text" placeholder="Any date" />
                    </label>
                    <label className="search-option">
                        <span role="img" aria-label="time">⏰</span>
                        <input type="text" placeholder="Any time" />
                    </label>
                    <button className="search-btn">Search</button>
                </div>

                {/* Booking Stats */}
                {/* <p className="booking-stats">4,63,417 appointments booked today</p> */}

                {/* Get the App Button */}
                <button className="app-btn">Get the app</button>
            </main>
        </div>
    );
};
