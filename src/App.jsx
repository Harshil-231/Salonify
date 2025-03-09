import './Styles/app.css';
import './Styles/salon.css';
import { Route, Routes } from 'react-router-dom';
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Google OAuth Provider
import axios from "axios"
import { HomePage } from './pages/HomePage';
import { Blog } from './pages/Blog';
import { Features } from './pages/Features';
import { Login } from './pages/Login';
import { Pricing } from './pages/Pricing';
import { SignUp } from './pages/SignUp';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserDashboard } from './pages/user/UserDashboard';
import { SalonDashboard } from './pages/salon/SalonDashboard';
import { SalonProfile } from './pages/salon/SalonProfile';
import { UserProfile } from './pages/user/UserProfile';
import { Trial } from './pages/Trial';
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/salon" element={<SalonDashboard />} />
        <Route path="/salon-profile" element={<SalonProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        <Route path="/salon-dashboard" element={<SalonDashboard />} />
        <Route path="/trial" element={<Trial />} />



      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
// hi there its a trail
