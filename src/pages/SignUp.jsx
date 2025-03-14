import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Loader } from "../Components/Common/Loader.jsx";

// import jwtDecode from "jwt-decode"; // Ensure you have this installed (currently not )


import '../Styles/LoginSignUp.css'
export const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);

    // Unified state management for input focus and value tracking
    const [inputState, setInputState] = useState({
        firstName: { focused: false, hasValue: false },
        lastName: { focused: false, hasValue: false },
        email: { focused: false, hasValue: false },
        password: { focused: false, hasValue: false },
        // contact: { focused: false, hasValue: false }, 
    });

    // Function to handle focus and blur events
    const handleFocus = (field) => {
        setInputState((prev) => ({
            ...prev,
            [field]: { ...prev[field], focused: true },
        }));
    };

    const handleBlur = (field, value) => {
        setInputState((prev) => ({
            ...prev,
            [field]: { focused: false, hasValue: value.length > 0 },
        }));
    };

    // Toast notifications
    const notify = (message, type = "success") => toast(message, { type });
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        getAllRoles();
    }, []);
    const getAllRoles = async () => {
        const res = await axios.get("/roles");
        setRoles(res.data.data);
    };

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/user", data);
            if (res.status === 201) {
                notify("User registered successfully!");
                setTimeout(() => navigate("/user-dashboard"), 2000);
            } else {
                notify("Failed to register user", "error");
            }
        } catch (error) {
            console.error("Signup error:", error);
            notify("An error occurred while signing up", "error");
        }
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate API call
    }, []);


    // Google Login Handlers
    // const handleGoogleSuccess = (credentialResponse) => {
    // const decoded = jwtDecode(credentialResponse.credential);
    // console.log("Google User:", credentialResponse);
    // Send the token to backend for authentication if required
    // };
    const handleGoogleFailure = () => {
        notify("Google Sign-In Failed", "error");
    };

    return (
        <div className="signup-container">

            {loading && <Loader />}

            <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Bounce} />
            <h2 className="signup-title">Sign Up</h2>

            <form onSubmit={handleSubmit(submitHandler)} className="signup-form">

                {["firstName", "lastName", "email", "password", /*"contact"*/].map((field) => (
                    <div key={field} className="input-group">
                        <label
                            className={`floating-label ${inputState[field].focused || inputState[field].hasValue ? "active" : ""}`}
                        >
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
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/,
                                        message: "Must include uppercase, lowercase, number & special character",
                                    },
                                }),
                            })}
                            onFocus={() => handleFocus(field)}
                            onBlur={(e) => handleBlur(field, e.target.value)}
                            className="input-field"
                        />
                        {errors[field] && <p className="error-message">{errors[field].message}</p>}
                    </div>
                ))}
                <div className="input-group">
                    <label className="floating-label">Select Role</label>
                    <select className="input-field"{...register("roleId")}>
                        <option className="option-dropdown-field">SELECT ROLE</option>
                        {roles?.map((role) => (
                            <option key={role._id} value={role._id} className="option-dropdown-field">{role.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
            </form>

            <div className="google-login">
                {/* <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} /> */}
            </div>

            <p className="login-redirect">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};
