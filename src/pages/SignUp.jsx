import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Bounce, toast, ToastContainer } from 'react-toastify';


export const SignUp = () => {
    const navigate = useNavigate();
    const notify1 = () => toast('User registered successfully!');
    const notify2 = () => toast('Failed to register user');
    const notify3 = () => toast('An error occurred while signing up');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [firstNameHasValue, setFirstNameHasValue] = useState(false);

    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [lastNameHasValue, setLastNameHasValue] = useState(false);

    const [emailFocused, setEmailFocused] = useState(false);
    const [emailHasValue, setEmailHasValue] = useState(false);

    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordHasValue, setPasswordHasValue] = useState(false);

    const [contactFocused, setContactFocused] = useState(false);
    const [contactHasValue, setContactHasValue] = useState(false);

    // const onSubmit = (data) => {
    //     console.log("Signup Data:", data);
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
        try {
            // data.roleId = "67be99fbb53f2c9819bdacfd"
            const res = await axios.post("/user", data); // Ensure the correct backend URL
            // console.log(data)
            if (res.status === 201) {
                console.log("User added successfully", res.data);
                // alert("User registered successfully!");
                notify1()
                setTimeout(() => {
                    navigate("/user-dashboard");
                }, 2000);
            } else {
                console.error("User not added");
                // alert("Failed to register user");
                notify2()
            }
        } catch (error) {
            console.error("Error during signup:", error);
            // alert("An error occurred while signing up");
            notify3()
        }
    };



    return (
        <div style={{ display: "inline-block", textAlign: "center", padding: "80px", height: "775px", background: "ffffff" }}>

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

            <h2 style={{
                color: "black",
                fontSize: "28px",
                marginBottom: "20px"
            }}>Sign Up</h2>
            <form onSubmit={handleSubmit(submitHandler)}
                style={{
                    display: "inline-block",
                    textAlign: "left",
                    background: "#ffffff",
                    width: "400px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgb(0, 0, 0)"
                }}>


                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label
                        style={{
                            position: "absolute",
                            left: "12px",
                            top: firstNameFocused || firstNameHasValue ? "0px" : "50%",
                            transform: firstNameFocused || firstNameHasValue ? "translateY(1)" : "translateY(-50%)",
                            fontSize: firstNameFocused || firstNameHasValue ? "12px" : "16px",
                            color: "black",
                            transition: "0.3s ease-in-out"
                        }}
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        {...register("firstName", { required: "First Name is required" })}
                        onFocus={() => setFirstNameFocused(true)}
                        onBlur={(e) => {
                            setFirstNameFocused(false);
                            setFirstNameHasValue(e.target.value.length > 0);
                            // console.log("First Name Input:", e.target.value); 
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
                    {errors.firstName && <p style={{ color: "red", fontSize: "14px" }}>{errors.firstName.message}</p>}
                </div>


                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label
                        style={{
                            position: "absolute",
                            left: "12px",
                            top: lastNameFocused || lastNameHasValue ? "0px" : "50%",
                            transform: lastNameFocused || lastNameHasValue ? "translateY(1)" : "translateY(-50%)",
                            fontSize: lastNameFocused || lastNameHasValue ? "12px" : "16px",
                            color: "black",
                            transition: "0.3s ease-in-out"
                        }}
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        {...register("lastName", { required: "Last Name is required" })}
                        onFocus={() => setLastNameFocused(true)}
                        onBlur={(e) => {
                            setLastNameFocused(false);
                            setLastNameHasValue(e.target.value.length > 0);
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
                    {errors.lastName && <p style={{ color: "red", fontSize: "14px" }}>{errors.lastName.message}</p>}
                </div>


                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label
                        style={{
                            position: "absolute",
                            left: "12px",
                            top: emailFocused || emailHasValue ? "0px" : "50%",
                            transform: emailFocused || emailHasValue ? "translateY(1)" : "translateY(-50%)",
                            fontSize: emailFocused || emailHasValue ? "12px" : "16px",
                            color: "black",
                            transition: "0.3s ease-in-out"
                        }}
                    >
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
                    <label
                        style={{
                            position: "absolute",
                            left: "12px",
                            top: passwordFocused || passwordHasValue ? "0px" : "50%",
                            transform: passwordFocused || passwordHasValue ? "translateY(1)" : "translateY(-50%)",
                            fontSize: passwordFocused || passwordHasValue ? "12px" : "16px",
                            color: "black",
                            transition: "0.3s ease-in-out"
                        }}
                    >
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


                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <label
                        style={{
                            position: "absolute",
                            left: "12px",
                            top: contactFocused || contactHasValue ? "0px" : "50%",
                            transform: contactFocused || contactHasValue ? "translateY(1)" : "translateY(-50%)",
                            fontSize: contactFocused || contactHasValue ? "12px" : "16px",
                            color: "black",
                            transition: "0.3s ease-in-out"
                        }}
                    >
                        Contact
                    </label>
                    <input
                        type="text"
                        {...register("contact", { required: "contact number is required" })}
                        onFocus={() => setContactFocused(true)}
                        onBlur={(e) => {
                            setContactFocused(false);
                            setContactHasValue(e.target.value.length > 0);
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
                    {errors.contact && <p style={{ color: "red", fontSize: "14px" }}>{errors.contact.message}</p>}
                </div>

                <button type="submit" style={{
                    width: "100%",
                    padding: "10px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}> Sign Up </button>

                <p style={{ textAlign: "left", fontSize: "14px", color: "#007bff", cursor: "pointer", marginTop: "10px", marginBottom: "2px" }}>
                    <Link to="/Login">
                        Already have an account?
                    </Link>
                </p>
            </form>
            <br />
            <br />
            <p>------------------------OR-------------------------</p>

            {/* Google Login Button */}
            <div style={{
                width: "100%",
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


