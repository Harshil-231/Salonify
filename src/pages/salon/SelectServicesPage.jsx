// In your SelectServicesPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ArrowLeft, Plus, Check } from 'lucide-react';

// Placeholder for User Context (Replace with your actual implementation)
const UserContext = React.createContext({ userId: null }); // Default value

// Custom hook example
const useUser = () => {
    return useContext(UserContext);
};

const SelectServicesPage = () => {
    const { salonId, serviceId } = useParams();
    const [salon, setSalon] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [total, setTotal] = useState(0);
    const [stage, setStage] = useState('services');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const navigate = useNavigate();
    const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

    // Get User ID (Replace with your actual user context)
    const { userId } = useUser(); // Get the userId from the context

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salonRes = await axios.get(`http://localhost:3200/salons/${salonId}`);
                setSalon(salonRes.data.data);

                const servicesRes = await axios.get(`http://localhost:3200/services/getservices?salonId=${salonId}`);
                setServices(servicesRes.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [salonId]);

    useEffect(() => {
        const generateAvailableTimes = () => {
            const now = new Date();
            const start = new Date();
            start.setHours(9, 0, 0);
            const end = new Date();
            end.setHours(17, 0, 0);

            const interval = 30;
            const times = [];

            let currentTime = start;
            while (currentTime <= end) {
                const [hours, minutes] = [currentTime.getHours(), currentTime.getMinutes()];
                const timeStr = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');

                if (selectedDate.toDateString() !== now.toDateString() || timeStr > now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(" ", ":")) {
                    times.push(timeStr)
                }

                currentTime = new Date(currentTime.getTime() + interval * 60000);
            }

            setAvailableTimes(times);
        };
        if (stage === 'time') {
            generateAvailableTimes();
        }
    }, [stage, selectedDate]);


    const handleAddService = (service) => {
        setSelectedServices([...selectedServices, service]);
        setTotal(total + service.price);
    };

    const handleRemoveService = (service) => {
        const updatedServices = selectedServices.filter(s => s._id !== service._id);
        setSelectedServices(updatedServices);
        setTotal(total - service.price);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleContinue = async () => {
        if (stage === 'services' && selectedServices.length > 0) {
            setStage('time');
        }

        if (stage === "time" && selectedTime) {
            setStage('confirm')
        }

        if (stage === "confirm") {
            try {
                const appointmentData = {
                    salonId: salonId,
                    salonName: salon?.salonName, // Send the salon name here
                    services: selectedServices.map(service => service._id),
                    date: selectedDate.toISOString(),
                    time: selectedTime,
                    totalPrice: total,
                    customerId: userId, // Add the user ID here
                    ownerId: salon?.owner, // Attach the ownerId here
                };

                // Get the token from local storage (or wherever you store it)
                const token = localStorage.getItem('token'); // Replace 'token' with your key

                // Attach the token to the Authorization header
                const response = await axios.post('http://localhost:3200/', appointmentData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use "Bearer" scheme
                    },
                });

                if (response.status === 201) {
                    alert('Appointment booked successfully!');
                    navigate('/user-dashboard/appointments');
                } else {
                    alert('Appointment booking failed.');
                }
            } catch (error) {
                console.error('Error booking appointment:', error);
                alert('Error booking appointment. Please try again.');
            }
        }
    };

    const handleBack = () => {
        if (stage === "services") {
            navigate(-1)
        }
        if (stage === 'time') {
            setStage('services');
        }

        if (stage === 'confirm') {
            setStage('time');
        }
    };

    const handleServiceClick = (service) => {
        setSelectedServiceDetail(service);
    };

    const handleCloseServiceDetail = () => {
        setSelectedServiceDetail(null);
    };
    const isServiceSelected = (service) => {
        return selectedServices.some(selectedService => selectedService._id === service._id);
    };
    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0, // No decimal places
        });
    };

    const getStepClass = (step) => {
        if (stage === step) {
            return 'text-blue-700 font-semibold'; // Darker for current stage
        } else if (
            (stage === 'time' && step === 'services') ||
            (stage === 'confirm' && (step === 'services' || step === 'time'))
        ) {
            return 'text-blue-700 font-semibold'; // Darker for completed stages
        } else {
            return 'text-gray-500'; // Lighter for upcoming stages
        }
    };

    if (!salon) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ userId: '653b95f440f4c42e95684ecb' }}>
            <div className="flex h-screen bg-blue-50" style={{ margin: '0 5vw' }}>
                {/* Left Side */}
                <div className="w-2/3 p-8 bg-white shadow-md">
                    {/* Back Button */}
                    {stage === 'services' ? (
                        <div className="mb-4">
                            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
                                <ArrowLeft className="mr-1" />
                                Back to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-800">
                                <ArrowLeft className="mr-1" />
                                Back
                            </button>
                        </div>
                    )}
                    {/* Progress Flow */}
                    <div className="flex space-x-4 mb-4">
                        <span className={getStepClass('services')}>Services</span>
                        <span>&gt;</span>
                        <span className={getStepClass('time')}>Time</span>
                        <span>&lt;</span>
                        <span className={getStepClass('confirm')}>Confirm</span>
                    </div>


                    {stage === 'services' && (
                        <>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select Services</h2>
                            <ul className="space-y-4">
                                {services.map(service => (
                                    <li
                                        key={service._id}
                                        className={`p-4 rounded-md shadow-sm transition-colors duration-200 cursor-pointer border ${isServiceSelected(service) ? 'border-blue-500' : 'border-gray-300'} hover:shadow-md flex items-center justify-between`}
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{service.name}</p>
                                            <p className="text-sm text-gray-500">{service.description}</p>
                                            <p className="text-sm text-green-600">₹{service.price}</p>
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                isServiceSelected(service) ? handleRemoveService(service) : handleAddService(service);
                                            }}
                                        >
                                            {isServiceSelected(service) ? <Check /> : <Plus />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {stage === 'time' && (
                        <>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select Time</h2>

                            <div className="mb-6">
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    minDate={new Date()}
                                    className="rounded-lg shadow-md border-none"
                                    tileClassName="text-gray-700"
                                    nextLabel={<span style={{ color: '#1e3a8a' }}>&gt;</span>}
                                    prevLabel={<span style={{ color: '#1e3a8a' }}>&lt;</span>}
                                    next2Label={<span style={{ color: '#1e3a8a' }}>&gt;&gt;</span>}
                                    prev2Label={<span style={{ color: '#1e3a8a' }}>&lt;&lt;</span>}
                                />
                            </div>
                            <p className="text-gray-700">Selected Date: {selectedDate.toDateString()}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        className={`bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-md shadow-sm transition-colors duration-200`}
                                        onClick={() => handleTimeChange(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                        </>
                    )}

                    {stage === "confirm" && (

                        <>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Please confirm your Appointment</h2>

                            <div>
                                <ul>
                                    {selectedServices.map(service => (
                                        <li key={service._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                                            <p className="text-gray-700">{service.name}</p>

                                        </li>
                                    ))}
                                </ul>
                                {selectedTime && <p className="mt-4 text-gray-700">Selected Time: {selectedTime}</p>}
                                {selectedDate && <p className="text-gray-700">Selected Date: {selectedDate.toDateString()}</p>}

                            </div>
                        </>

                    )}

                </div>

                {/* Right Side */}
                <div className="w-1/3 p-8 bg-blue-50 flex flex-col justify-between">
                    <div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">{salon?.salonName}</h3>
                            <p className="text-sm text-gray-600">
                                4.8 stars (13)
                            </p>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Selected Services</h4>
                        <ul>
                            {selectedServices.map(service => (
                                <li key={service._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                                    <p className="text-gray-700">{service.name}</p>
                                    <p className="text-gray-700">{formatPrice(service.price)}</p>
                                </li>
                            ))}
                        </ul>
                        {selectedTime && <p className="mt-4 text-gray-700">Selected Time: {selectedTime}</p>}
                        {selectedDate && <p className="text-gray-700">Selected Date: {selectedDate.toDateString()}</p>}
                    </div>

                    <div className="mt-8">
                        <p className="font-semibold text-gray-800">Total: {formatPrice(total)}</p>
                        {stage !== 'confirm' && (
                            //Remove back option from right
                            <></>
                        )}
                        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" onClick={handleContinue}>
                            {stage === 'services' ? 'Continue' : 'Confirm'}
                        </button>
                    </div>
                </div>
                {selectedServiceDetail && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedServiceDetail.name}</h2>
                            <p className="text-gray-600 mb-4">{selectedServiceDetail.description}</p>
                            <p className="text-green-600 font-semibold">{formatPrice(selectedServiceDetail.price)}</p>
                            <button
                                className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
                                onClick={handleCloseServiceDetail}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </UserContext.Provider>
    );
};

export default SelectServicesPage;