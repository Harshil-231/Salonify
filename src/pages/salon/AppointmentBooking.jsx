import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

//Context
const UserContext = React.createContext({ userId: null, userRole: null, salonId: null }); // Default value

const AppointmentBooking = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchAllAppointmentsForOwner = async (ownerId) => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3200/owner/appointments`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAppointments(response.data.data);
            } catch (err) {
                console.error("Error fetching owner's appointments:", err);
                setError(err.message || "Failed to fetch appointments.");
            } finally {
                setLoading(false);
            }
        };

        const ownerId = localStorage.getItem('id');
        console.log("Owner ID from localStorage:", ownerId);
        if (ownerId) {
            fetchAllAppointmentsForOwner(ownerId); // Fetch all appointments for the owner
        } else {
            setError("Owner ID not found. Please login as a salon owner.");
        }

    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
                <div className="text-center text-gray-600">Loading appointments...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString) => {
        const date = new Date(`1970-01-01T${timeString}`); // Use a dummy date
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 py-6 flex items-center justify-center">
            <div className="bg-white shadow overflow-hidden rounded-lg max-w-3xl w-full">
                <div className="px-4 py-5 sm:px-6">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center">Your Appointments</h1>
                    <p className="mt-1 max-w-2xl text-gray-500 text-center">Manage your salon appointments here.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        {appointments.length === 0 ? (
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">No appointments scheduled.</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                            </div>
                        ) : (
                            appointments.map((appointment, index) => (
                                <div key={appointment._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        <span className="block font-semibold text-gray-700">{appointment.salonName}</span>
                                        <span className="block text-xs mt-1">Customer: {appointment.customerId?.username || 'N/A'} ({appointment.customerId?._id})</span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <ul className="list-disc list-inside">
                                            <li>Date: {formatDate(appointment.date)}</li>
                                            <li>Time: {formatTime(appointment.time)}</li>
                                            <li>Services: {appointment.services.map(service => service.name).join(', ')}</li>
                                        </ul>
                                    </dd>
                                </div>
                            ))
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;