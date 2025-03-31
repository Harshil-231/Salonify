import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/user.css";
import axios from "axios";

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id")?.trim(); // Remove unwanted spaces

            if (!userId) {
                setError("User ID missing in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3200/customers/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                setUserData(response.data.data); // Ensure correct data extraction
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="loading-message">Loading profile...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="fresh-profile-page">
            <main className="fresh-main-content">
                <div className="fresh-profile-details">
                    <Link to="/user-profile/edit">
                        <div className="fresh-profile-edit-btn">Edit</div>
                    </Link>
                    <div className="fresh-profile-image">
                        <img
                            src={userData.profileImage || "/images/image.png"}
                            alt="Profile"
                            className="rounded-full w-24 h-24 object-cover"
                        />
                        <button className="fresh-edit-button">Edit</button>
                    </div>
                    <div className="fresh-profile-field">
                        <label>First name</label>
                        <p className="text-white">{userData.firstName || "-"}</p>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Last name</label>
                        <p className="text-white">{userData.lastName || "-"}</p>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Mobile number</label>
                        <p className="text-white">{userData.contact || "-"}</p>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Email</label>
                        <p className="text-white">{userData.email || "-"}</p>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Date of birth</label>
                        <p className="text-white">{userData.dateOfBirth || "Not provided"}</p>
                    </div>
                    <div className="fresh-profile-field">
                        <label>Gender</label>
                        <p className="text-white">{userData.gender || "Not specified"}</p>
                    </div>
                </div>

                <div className="fresh-address-section">
                    <div className="fresh-address-title">My addresses</div>
                    <div className="fresh-address-card">
                        <div className="fresh-address-card-title">Home</div>
                        <div className="fresh-address-card-description">
                            {userData.homeAddress || "Add a home address"}
                        </div>
                    </div>
                    <div className="fresh-address-card">
                        <div className="fresh-address-card-title">Work</div>
                        <div className="fresh-address-card-description">
                            {userData.workAddress || "Add a work address"}
                        </div>
                    </div>
                    <button className="fresh-add-address-button">Add</button>
                </div>
            </main>
        </div>
    );
};
