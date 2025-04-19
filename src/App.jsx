import './Styles/app.css';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

import { HomePage } from './pages/HomePage';
import { Blog } from './pages/Blog';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { PrivateRoute } from './Components/PrivateRoute';

import  AdminDashboard  from './pages/admin/AdminDashboard';
import { SODashboard } from './pages/salon/SODashboard';
import { UserDashboard } from './pages/user/UserDashboard';

import { UserProfile } from './pages/user/UserProfile';
import { EditUserProfile } from './pages/user/EditUserProfile';
import  BookAppointments  from './pages/user/BookAppointments';


import { Navbar } from './Components/Common/Navbar';

// import { Trial } from './pages/Trial';

import { AuthPage } from './pages/AuthPage';



// import AddSalonForm from './pages/salon/AddSalonForm';
import SOProfile from './pages/salon/SOProfile';
import { EditOwnerProfile } from './pages/salon/EditOwnerProfile';
import { SearchSalon } from './pages/user/SearchSalon';
import { SalonDetailPage } from './pages/salon/SalonDetailPage';
import SelectServicesPage from './pages/salon/SelectServicesPage';
import ManageSalons from './pages/salon/ManageSalons';
import ManageServices from './pages/salon/ManageServices';
import { ManageStaff } from './pages/salon/ManageStaff';
import  AppointmentBooking  from './pages/salon/AppointmentBooking';

const GOOGLE_CLIENT_ID = '616976635256-6dbof6or41jhmvp75blc9cgbv4okdidn.apps.googleusercontent.com';

function App() {
    axios.defaults.baseURL = 'http://localhost:3200';
    const location = useLocation(); // Get current location

    const showNavbar = ['/', '/blog', '/features', '/pricing', '/AuthPage ', ''].includes(location.pathname); // Check if Navbar should be shown


    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {showNavbar && <Navbar />} {/* Conditionally render Navbar */}


            <Routes>

                {/* <Route path="/sidebar" element={<Sidebar />} /> */}

                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/AuthPage" element={<AuthPage />} />
                <Route path="/search" element={<SearchSalon />} />
                <Route path="/salon/:salonId" element={<SalonDetailPage />} />
                <Route path="/select-services/:salonId/:serviceId" element={<SelectServicesPage />} />
                <Route path="/appointments" element={<BookAppointments />} />

                {/* Admin Routes (Full Access) */}

                {/* <Route element={<PrivateRoute allowedRoles={['admin']} />}> */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                {/* </Route> */}

                {/* User-Only Routes */}

                {/* <Route element={<PrivateRoute allowedRoles={['customer']} />}> */}
                <Route path="/user-dashboard" element={<UserDashboard />} >
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="profile-edit" element={<EditUserProfile />} />
                    <Route path="appointments" element={<BookAppointments />} />
                    <Route path="wallet" element={<BookAppointments />} />
                    <Route path="favourites" element={<BookAppointments />} />
                    <Route path="orders" element={<BookAppointments />} />
                    <Route path="settings" element={<BookAppointments />} />
                </Route>
                {/* </Route> */}

                {/* Salon Owner Routes */}

                {/* <Route element={<PrivateRoute allowedRoles={['owner']} />}> */}
                <Route path="/so-dashboard" element={<SODashboard />} >
                    <Route path="profile-edit" element={<EditOwnerProfile />} />
                    <Route path="profile" element={<SOProfile />} />
                    <Route path="manage-Salons" element={<ManageSalons />} />
                    <Route path="manage-services" element={<ManageServices />} />
                    {/* <Route path="clients" element={<AddSalonForm />} /> */}
                    {/* <Route path="services" element={<AddSalonForm />} /> */}
                    <Route path="manage-staff" element={<ManageStaff />} />
                    <Route path="appointments" element={<AppointmentBooking />} />
                    {/* <Route path="payments" element={</>} /> */}
                </Route>
                {/* </Route> */}

                {/* <Route path="/trial" element={<Trial />} /> */}
            </Routes>
        </GoogleOAuthProvider>
    );
}

export default App;