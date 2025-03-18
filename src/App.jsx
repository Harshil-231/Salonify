import './Styles/app.css';
import './Styles/salon.css';
import { Routes, Route } from 'react-router-dom';
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Google OAuth Provider
import axios from "axios"

import { HomePage } from './pages/HomePage';
import { Blog } from './pages/Blog';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { PrivateRoute } from './Components/PrivateRoute';

import { AdminDashboard } from './pages/admin/AdminDashboard';

import { UserDashboard } from './pages/user/UserDashboard';
import { UserProfile } from './pages/user/UserProfile';
import { UserProfileEdit } from './pages/user/UserProfileEdit';

import { SalonDashboard } from './pages/salon/SalonDashboard';
import { SalonProfile } from './pages/salon/SalonProfile';

import { Trial } from './pages/Trial';
import { AuthPage } from './pages/AuthPage';
// import { Loader } from './Components/Common/Loader';

// import { ThemeProvider, createTheme } from '@mui/material/styles';

const GOOGLE_CLIENT_ID = "616976635256-6dbof6or41jhmvp75blc9cgbv4okdidn.apps.googleusercontent.com"; // Replace with your actual client ID

// const theme = createTheme(); 


function App() {
  axios.defaults.baseURL = "http://localhost:3200"
  return (
    // <ThemeProvider theme={theme}>
    // </ThemeProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/AuthPage" element={<AuthPage />} />


        {/* Admin Routes (Full Access) */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* User-Only Routes */}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="" element={<PrivateRoute />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/edit" element={<UserProfileEdit />} />
        </Route>

        {/* Salon Owner Routes */}
        <Route element={<PrivateRoute allowedRoles={["salon owner"]} />}>
          <Route path="/salon" element={<SalonDashboard />} />
          <Route path="/salon-profile" element={<SalonProfile />} />
          <Route path="/salon-dashboard" element={<SalonDashboard />} />
        </Route>



        <Route path="/trial" element={<Trial />} />
        {/* <Route path="/loader" element={<Loader />} /> */}

      </Routes>



    </GoogleOAuthProvider>
  );
}

export default App;


