import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode"; // To decode Google token
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from 'react-toastify';


export const Login = () => {
    const navigate = useNavigate();
    const notify1 = () => toast('User login successfully!');
    const notify2 = () => toast('Login failed! Check your credentials.');
    const notify3 = () => toast('An error occurred while logging in.');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [emailFocused, setEmailFocused] = useState(false);
    const [emailHasValue, setEmailHasValue] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordHasValue, setPasswordHasValue] = useState(false);

    // const onSubmit = (data) => {
    //     console.log("Login Data:", data);
    // };

    // Handle Google Login Success
    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Google User:", decoded);
        // Send this token to your backend for authentication if needed
    };

    // Handle Google Login Failure
    const handleGoogleFailure = () => {
        console.error("Google Sign-In Failed");
    };
    const submitHandler = async (data) => {
        // console.log("Submitting Data:"); // ✅ Debug: Check if data is being sent correctly

        try {
            const res = await axios.post("/user/login", data);

            console.log("Response:", res); // ✅ Debug: Check backend response

            if (res.status === 200) {
                console.log("User logged in successfully", data);
                // alert("User login successfully!");
                notify1()
                setTimeout(() => {
                    navigate("/user-dashboard");
                }, 2000);
                localStorage.setItem("id", res.data.data._id)
                localStorage.setItem("roleId", res.data.data.roleId.name)
            } else {
                console.error("Login failed", res.data);
                // alert("Login failed! Check your credentials.");
                notify2()
            }
        } catch (error) {
            console.error("Error during login:", error.response ? error.response.data : error);
            // alert("An error occurred while logging in.");
            notify3()
        }
    };



    return (
        <div style={{ display: "inline-block", textAlign: "center", background: "ffffff", padding: "100px", height: "775px" }}>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

            <h2 style={{ color: "black", fontSize: "28px", marginBottom: "20px" }}>Login</h2>

            <form onSubmit={handleSubmit(submitHandler)} style={{ display: "inline-block", textAlign: "left", background: "white", width: "100%", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgb(0, 0, 0)" }}>

                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label style={{
                        position: "absolute",
                        left: "12px",
                        top: emailFocused || emailHasValue ? "0px" : "50%",
                        transform: emailFocused || emailHasValue ? "translateY(1)" : "translateY(-50%)",
                        fontSize: emailFocused || emailHasValue ? "12px" : "16px",
                        color: "black",
                        transition: "0.3s ease-in-out"
                    }}>
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email format"
                            }
                        })}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={(e) => {
                            setEmailFocused(false);
                            setEmailHasValue(e.target.value.length > 0);
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            outline: "none",
                            background: "transparent",
                            position: "relative"
                        }}
                    />
                    {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</p>}
                </div>

                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label style={{
                        position: "absolute",
                        left: "12px",
                        top: passwordFocused || passwordHasValue ? "0px" : "50%",
                        transform: passwordFocused || passwordHasValue ? "translateY(1)" : "translateY(-50%)",
                        fontSize: passwordFocused || passwordHasValue ? "12px" : "16px",
                        color: "black",
                        transition: "0.3s ease-in-out"
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required", minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/,
                                message: "Password must include uppercase, lowercase, number & special character"
                            }
                        })}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={(e) => {
                            setPasswordFocused(false);
                            setPasswordHasValue(e.target.value.length > 0);
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            outline: "none",
                            background: "transparent",
                            position: "relative"
                        }}
                    />
                    {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password.message}</p>}
                </div>

                <button type="submit" style={{
                    width: "100%",
                    padding: "10px",
                    background: "rgb(39, 117, 234)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}> Login </button>

                <p style={{ textAlign: "left", fontSize: "14px", color: "#007bff", cursor: "pointer", marginTop: "10px", marginBottom: "2px" }}>
                    <Link to="/Features">Forgot Password?</Link>
                </p>

                <p style={{ textAlign: "left", fontSize: "14px", color: "#007bff", cursor: "pointer", marginTop: "10px", marginBottom: "2px" }}>
                    <Link to="/SignUp">
                        New Here?
                    </Link>
                </p>

            </form>
            <br />
            <br />
            <p>------------------------OR-------------------------</p>

            {/* Google Login Button */}
            <div style={{
                width: "400px",
                borderRadius: "10px"

            }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
        </div>
    );
};
