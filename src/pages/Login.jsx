import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import '../Styles/LoginSignUp.css';
import { Loader } from "../Components/Common/Loader.jsx";

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const notify = (message, type = "success") => toast(message, { type });

    const submitHandler = async (data) => {
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3200/login/user", data); // Corrected URL

            if (res.status === 200) {
                notify("Login successful!");
                localStorage.setItem("id", res.data.data._id);
                localStorage.setItem("role", res.data.role); // Store the role name
                localStorage.setItem("token", res.data.token); // Store the role name

                if (res.data.role === "customer") {
                    setTimeout(() => navigate("/user-dashboard"), 2000);
                } else if (res.data.role === "salonOwner") {
                    setTimeout(() => navigate("/so-dashboard"), 2000);
                } else if (res.data.role === "staff") {
                    setTimeout(() => navigate("/staff-dashboard"), 2000); //Added staff route
                } else if (res.data.role === "admin") {
                    setTimeout(() => navigate("/"), 2000);
                }
                else {
                    console.warn("Unknown role:", res.data.role);
                    setTimeout(() => navigate("/"), 2000); // Redirect to a default page
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = "Invalid credentials"; // Changed default message
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            notify(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {loading && <Loader />}
            <ToastContainer position="top-center" autoClose={1000} theme="dark" transition={Bounce} />
            <h2 className="login-title">Login</h2>

            <form onSubmit={handleSubmit(submitHandler)} className="login-form">
                {["email", "password"].map((field) => (
                    <div key={field} className="input-group">
                        <label className="floating-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "email" ? "email" : "password"}
                            {...register(field, {
                                required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
                            })}
                            className="input-field"
                        />
                        {errors[field] && <p className="error-message">{errors[field].message}</p>}
                    </div>
                ))}
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
};