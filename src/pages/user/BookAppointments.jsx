import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, Store, Tag, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const BookAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3200/customers/${customerId}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAppointments(response.data.data);
        } else {
          setError(`Failed to fetch appointments: Status ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    if (customerId && token) {
      fetchAppointments();
    } else {
      setError('Customer ID or token not found. Please log in.');
      setLoading(false);
    }
  }, [customerId, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-md w-full flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-gray-600">No appointments booked yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Appointments
        </h1>

        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div 
              key={appointment._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              {/* Status Banner */}
              <div className={`px-6 py-2 ${
                appointment.status === 'Confirmed' 
                  ? 'bg-green-50 text-green-700' 
                  : appointment.status === 'Cancelled'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-yellow-50 text-yellow-700'
              } flex items-center gap-2`}>
                {appointment.status === 'Confirmed' 
                  ? <CheckCircle className="w-5 h-5" />
                  : <AlertCircle className="w-5 h-5" />
                }
                <span className="font-medium">Status: {appointment.status}</span>
              </div>

              <div className="p-6 space-y-4">
                {/* Main Appointment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Appointment Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Appointment Time</p>
                        <p className="font-medium text-gray-900">{appointment.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Salon Name</p>
                        <p className="font-medium text-gray-900">{appointment.salonName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Staff Member</p>
                        <p className="font-medium text-gray-900">{appointment.staffName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-medium text-gray-900">Rs.{appointment.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm text-gray-500 mb-2">Services Booked</h3>
                  <div className="flex flex-wrap gap-2">
                    {appointment.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookAppointments;