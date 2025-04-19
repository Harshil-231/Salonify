import React, { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Home, Briefcase, Loader2, PenSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchCustomer = async () => {
            const token = localStorage.getItem("token");

            if (!userId) {
                setError("User ID missing in localStorage.");
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3200/customers/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(res.data.data);
                // setPreview(res.data.data.profileImage);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
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
        const formData = new FormData();  // <---- Add this line
        formData.append("profilePicture", file); // <---- Add this line

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `http://localhost:3200/customers/${userId}`,
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
                profilePicture: res.data.data.profilePicture,
            }));
            setPreview(res.data.data.profilePicture);

        } catch (error) {
            alert("Image upload failed. Try again.");
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const formattedDob = userData?.dateOfBirth
        ? new Date(userData.dateOfBirth).toLocaleDateString("en-IN")
        : "Not specified";

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="relative h-32 bg-gradient-to-r from-green-500 to-teal-500">
                        <Link
                            to="/user-dashboard/profile-edit"
                            className="absolute top-4 right-4 text-white bg-white/10 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/20"
                        >
                            <PenSquare className="w-4 h-4" />
                            <span>Edit</span>
                        </Link>
                    </div>

                    {/* Avatar */}
                    <div className="relative -mt-16 px-6">
                        <div className="relative inline-block">
                            <img
                                src={preview || userData?.profilePicture || "/images/default1.png"}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow"
                                alt="Customer"
                            />
                            <label className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors">
                                <Camera className="text-white w-5 h-5" />
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

                    {/* Details */}
                    <div className="px-6 py-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {userData?.firstName} {userData?.lastName}
                        </h2>
                        <p className="text-gray-500">{userData?.email}</p>

                        <div className="mt-6 grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p className="text-gray-900">{userData?.contact || "-"}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Date of Birth</label>
                                <p className="text-gray-900">{formattedDob}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Gender</label>
                                <p className="text-gray-900">{userData?.gender || "-"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="border-t border-gray-200 px-6 py-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Addresses</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 hover:border-green-500 transition">
                                <div className="flex items-center mb-2 space-x-2">
                                    <Home className="w-5 h-5 text-gray-500" />
                                    <h3 className="text-gray-900 font-medium">Home</h3>
                                </div>
                                <p className="text-gray-600">{userData?.homeAddress || "Not provided"}</p>
                            </div>
                            <div className="border rounded-lg p-4 hover:border-green-500 transition">
                                <div className="flex items-center mb-2 space-x-2">
                                    <Briefcase className="w-5 h-5 text-gray-500" />
                                    <h3 className="text-gray-900 font-medium">Work</h3>
                                </div>
                                <p className="text-gray-600">{userData?.workAddress || "Not provided"}</p>
                            </div>
                        </div>
                        <button className="mt-4 inline-flex items-center text-green-600 hover:text-green-700">
                            <Plus className="w-5 h-5 mr-1" />
                            Add new address
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

