import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import '../Styles/LoginSignUp.css';
import { Loader } from "../Components/Common/Loader.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const notify = (message, type = "success") => toast(message, { type });

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3200/login/user", data);
      console.log(res.data)
      if (res.status === 200) {
        notify("Login successful!");
        // console.log(res.data)
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        setTimeout(() => {
          if (res.data.data.roleId.name === "USER") {
            navigate("/user-dashboard");
          } else if (res.data.data.roleId.name === "Admin") {
            navigate("/");
          } else if (res.data.data.roleId.name === "Salon Owner") {
            navigate("/salon-dashboard");
          }
        }, 1000); // Delay navigation by 1 second
      }

    } catch (error) {
      console.error("Login error:", error);
      notify("An error occurred while logging in", "error");
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
                ...(field === "email" && {
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                }),
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