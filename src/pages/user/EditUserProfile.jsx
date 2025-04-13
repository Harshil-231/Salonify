import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EditUserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id")?.trim();

            if (!userId) {
                setError("User ID missing in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3200/customers/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id");
            await axios.put(`http://localhost:3200/customers/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Profile updated successfully!");
            navigate("/user-dashboard/profile");
        } catch (error) {
            alert("Failed to update profile.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="text-center text-white py-8">Loading edit form...</div>;
    if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

    return (
        <div className="min-h-screen  bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-lg text-white space-y-6"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile Number</label>
                        <input
                            type="text"
                            name="contact"
                            value={userData.contact || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={userData.dateOfBirth || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={userData.gender || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Address Section */}
                <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">My Addresses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Home Address</label>
                            <input
                                type="text"
                                name="homeAddress"
                                value={userData.homeAddress || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Work Address</label>
                            <input
                                type="text"
                                name="workAddress"
                                value={userData.workAddress || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md bg-gray-800 text-white p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/user-dashboard/profile")}
                        className="px-6 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updating}
                        className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                    >
                        {updating ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};
