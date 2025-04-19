// In SignUp.js

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Loader } from "../Components/Common/Loader.jsx";
import "../Styles/LoginSignUp.css";

export const SignUp = ({ onSignupSuccess }) => { 
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const getAllRoles = async () => {
        try {
            const res = await axios.get("http://localhost:3200/roles");

            const filteredRoles = res.data.data.filter(role => role.name === "admin" || role.name === "customer" || role.name === "owner" || role.name === "staff");
            setRoles(filteredRoles);
        } catch (error) {
            console.error("Error fetching roles:", error);
            toast.error("Failed to load roles");
        }
    };

    const notify = (message, type = "success") => toast(message, { type });

    const submitHandler = async (data) => {
        console.log("Signup Data:", data);
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3200/signup", data);
            console.log("Signup Response:", res);
            if (res.status === 201) {
                notify("User registered successfully!");
                // Call the onSignupSuccess prop to signal AuthPage to show login
                onSignupSuccess(); // Call the function
            } else {
                notify(`Failed to register user. Status: ${res.status}`, "error");
            }
        } catch (error) {
            console.error("Signup error:", error);
            let errorMessage = "An error occurred during signup.";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            }
            notify(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            {loading && <Loader />}
            {/* <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Bounce} /> */}
            <h2 className="signup-title">Sign Up</h2>

            <form onSubmit={handleSubmit(submitHandler)} className="signup-form">
                {["firstName", "lastName", "email", "password", "contact"].map((field) => (
                    <div key={field} className="input-group">
                        <label className="floating-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                            {...register(field, {
                                required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
                                ...(field === "email" && {
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Invalid email format",
                                    },
                                }),
                                ...(field === "password" && {
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                        message: "Must include uppercase, lowercase, number & special character",
                                    },
                                }),
                            })}
                            className="input-field"
                        />
                        {errors[field] && <p className="error-message-inline">{errors[field].message}</p>}
                    </div>
                ))}

                <div className="input-group">
                    <label className="floating-label">Select Role</label>
                    <select className="input-field" {...register("roleId", { required: "Role is required" })}>
                        <option className="bg-yellow-600" value="">none</option>
                        {roles?.map((role) => (
                            <option key={role._id} value={role._id} className="option-dropdown-field">
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.roleId && <p className="error-message-inline">{errors.roleId.message}</p>}
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;