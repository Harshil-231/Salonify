import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const [authState, setAuthState] = useState({ isLoggedin: false, role: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if (role) {
            setAuthState({ isLoggedin: true, role: role });
        }
        setLoading(false);
    }, []);

    return { ...authState, loading };
};

export const PrivateRoute = ({ allowedRoles }) => { // receive allowed roles as prop
    const auth = useAuth();

    if (auth.loading) {
        return <h1>Loading...</h1>; // Prevents redirection before auth state is set
    }

    if (!auth.isLoggedin) {
        return <Navigate to="/authpage" />; // Redirect if not logged in
    }

    if (allowedRoles.includes(auth.role)) {
        return <Outlet />; // Render Outlet if role is allowed
    } else {
        return <Navigate to="/authpage" />; // Redirect if role is not allowed
    }
};