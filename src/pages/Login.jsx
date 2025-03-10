import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import '../Styles/LoginSignUp.css';

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [inputState, setInputState] = useState({
        email: { focused: false, hasValue: false },
        password: { focused: false, hasValue: false },
    });

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

    const notify = (message, type = "success") => toast(message, { type });

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("login", data);
            if (res.status === 200) {
                notify("Login successful!");
                setTimeout(() => navigate("/user"), 2000);
            } else {
                notify("Invalid credentials", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            notify("An error occurred while logging in", "error");
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log("Google User:", credentialResponse);
        // Send token to backend for authentication if required
    };

    const handleGoogleFailure = () => {
        notify("Google Sign-In Failed", "error");
    };

    return (
        <div className="login-container">
            <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Bounce} />
            <h2 className="login-title">Login</h2>

            <form onSubmit={handleSubmit(submitHandler)} className="login-form">
                {["email", "password"].map((field) => (
                    <div key={field} className="input-group">
                        <label
                            className={`floating-label ${inputState[field].focused || inputState[field].hasValue ? "active" : ""}`}
                        >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "email" ? "email" : "password"}
                            {...register(field, {
                                required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
                                ...(field === "email" && {
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Invalid email format",
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

                <button type="submit" className="submit-btn">Login</button>
            </form>

            <div className="google-login">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </div>

            <p className="signup-redirect">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};
