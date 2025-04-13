import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Camera, MapPin, Briefcase, Home, Plus, Loader2, PenSquare } from 'lucide-react';

export const SOProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const userId = localStorage.getItem("id")?.trim();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!userId) {
                setError("User ID missing in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3200/owners/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(response.data.data);
                //setPreview(response.data.data.profileImage)
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        setUploading(true);
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("profilePicture", file);
        formData.append("userId", localStorage.getItem("id")); //No need to append user id

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `http://localhost:3200/owners/${userId}`, // Correct endpoint
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUserData((prevData) => ({
                ...prevData,
                profilePicture: res.data.data.profilePicture, // Update with correct field
            }));
            // Update the preview after successful upload
            setPreview(res.data.data.profilePicture);

        } catch (error) {
            alert("Image upload failed. Try again.");
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg">
                Error: {error}
            </div>
        </div>
    );

    const formattedDate = userData?.dateOfBirth
        ? new Date(userData.dateOfBirth).toLocaleDateString("en-IN")
        : "Not provided";


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600">
                        <Link
                            to="/so-dashboard/profile-edit"
                            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/20 transition-colors"
                        >
                            <PenSquare className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </Link>
                    </div>

                    {/* Profile Image */}
                    <div className="relative -mt-16 px-6">
                        <div className="relative inline-block">
                            <img
                                src={preview || userData?.profilePicture || "/images/default1.png"} //Use profilePicture, not profileImage
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors">
                                <Camera className="w-5 h-5 text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="px-6 py-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {userData?.firstName} {userData?.lastName}
                        </h1>
                        <p className="text-gray-500">{userData?.email}</p>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Mobile number</label>
                                    <p className="mt-1 text-gray-900">{userData?.contact || "-"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Date of birth</label>
                                    <p className="mt-1 text-gray-900">{formattedDate}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Gender</label>
                                    <p className="mt-1 text-gray-900">{userData?.gender || "Not specified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="border-t border-gray-200 px-6 py-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Addresses</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="border rounded-lg p-4 hover:border-purple-500 transition-colors">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Home className="w-5 h-5 text-gray-500" />
                                    <h3 className="font-medium text-gray-900">Home</h3>
                                </div>
                                <p className="text-gray-600">
                                    {userData?.homeAddress || "No home address added"}
                                </p>
                            </div>
                            <div className="border rounded-lg p-4 hover:border-purple-500 transition-colors">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Briefcase className="w-5 h-5 text-gray-500" />
                                    <h3 className="font-medium text-gray-900">Work</h3>
                                </div>
                                <p className="text-gray-600">
                                    {userData?.workAddress || "No work address added"}
                                </p>
                            </div>
                        </div>
                        <button className="mt-4 inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                            <Plus className="w-5 h-5" />
                            <span>Add new address</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SOProfile;