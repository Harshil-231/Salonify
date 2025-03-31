import './Styles/app.css';
import './Styles/salon.css';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

import { HomePage } from './pages/HomePage';
import { Blog } from './pages/Blog';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { PrivateRoute } from './Components/PrivateRoute';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SODashboard } from './pages/salon/SODashboard';
import { UserDashboard } from './pages/user/UserDashboard';

import { UserProfile } from './pages/user/UserProfile';
import { UserProfileEdit } from './pages/user/UserProfileEdit';

import { SalonProfile } from './pages/salon/SalonProfile';

import { Navbar } from './Components/Common/Navbar';


import { Trial } from './pages/Trial';
import { AuthPage } from './pages/AuthPage';


import { BookAppointments } from './pages/user/BookAppointments';

const GOOGLE_CLIENT_ID = '616976635256-6dbof6or41jhmvp75blc9cgbv4okdidn.apps.googleusercontent.com';

function App() {
    axios.defaults.baseURL = 'http://localhost:3200';
    const location = useLocation(); // Get current location

    const showNavbar = ['/', '/blog', '/features', '/pricing', '/AuthPage'].includes(location.pathname); // Check if Navbar should be shown

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {showNavbar && <Navbar />} {/* Conditionally render Navbar */}


            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/AuthPage" element={<AuthPage />} />
                {/* Admin Routes (Full Access) */}
                <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                {/* User-Only Routes */}
                <Route element={<PrivateRoute allowedRoles={['customer']} />}>
                    <Route path="/user-dashboard" element={<UserDashboard />} >
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="profile-edit" element={<UserProfileEdit />} />
                        <Route path="appointments" element={<BookAppointments />} />
                    </Route>
                </Route>
                {/* Salon Owner Routes */}
                <Route element={<PrivateRoute allowedRoles={['salon owner']} />}>
                    <Route path="/so-dashboard" element={<SODashboard />} >
                        <Route path="profile" element={<SalonProfile />} />
                        <Route path="profile" element={<SalonProfile />} />
                    </Route>
                </Route>
                <Route path="/trial" element={<Trial />} />
            </Routes>
        </GoogleOAuthProvider>
    );
}

export default App;