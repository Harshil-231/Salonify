// In AuthPage.js

import React, { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { motion, AnimatePresence } from "framer-motion";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleSignupSuccess = () => {
        setTimeout(() => {
            setShowLogin(true);
        }, 1000);
    };

    const toggleForm = () => setShowLogin((prev) => !prev);

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Bounce} />
            <div className="w-full h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="relative w-full max-w-5xl h-[600px] rounded-2xl shadow-2xl overflow-hidden flex">
                    {/* Image Side */}
                    <div className="hidden md:block w-1/2 relative">
                        <img
                            src="/images/WOMAN3.jpg" // Replace with your image
                            alt="Auth Visual"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                            <h2 className="text-white text-3xl font-semibold text-center px-8">
                                Discover Your Perfect Style
                            </h2>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-gray-900/70 backdrop-blur-md">
                        <AnimatePresence mode="wait">
                            {showLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ y: 100, scale: 0.95, opacity: 0 }}
                                    animate={{ y: 0, scale: 1, opacity: 1 }}
                                    exit={{ y: -100, scale: 0.95, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Login />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ y: 100, scale: 0.95, opacity: 0 }}
                                    animate={{ y: 0, scale: 1, opacity: 1 }}
                                    exit={{ y: -100, scale: 0.95, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <SignUp onSignupSuccess={handleSignupSuccess} />  {/* Pass the prop */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Toggle Button */}
                    <div className="absolute top-4 right-4 z-20">
                        <button
                            onClick={toggleForm}
                            className="text-sm font-medium text-gray-50 hover:underline"
                        >
                            {showLogin ? "New here? Sign up" : "Already have an account? Log in"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;