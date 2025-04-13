import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SelectServicesPage = () => {
    const { salonId, serviceId } = useParams(); // Added serviceId
    const [salon, setSalon] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [total, setTotal] = useState(0);

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

    const handleAddService = (service) => {
        setSelectedServices([...selectedServices, service]);
        setTotal(total + service.price);
    };

    const handleRemoveService = (service) => {
        const updatedServices = selectedServices.filter(s => s._id !== service._id);
        setSelectedServices(updatedServices);
        setTotal(total - service.price);
    };

    if (!salon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen">
            {/* Left Side - Service List */}
            <div className="w-2/3 p-4 border-r">
                <h2 className="text-2xl font-semibold mb-4">Select Services</h2>
                <ul>
                    {services.map(service => (
                        <li key={service._id} className="flex items-center justify-between py-2 border-b">
                            <div>
                                {service.name}
                                <p className="text-sm text-gray-500">{service.description}</p>
                                <p className="text-sm text-gray-500">₹{service.price}</p>
                            </div>
                            <button
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={() => handleAddService(service)}
                            >
                                +
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side - Selected Services */}
            <div className="w-1/3 p-4">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">{salon.salonName}</h3>
                    <p className="text-sm text-gray-600">
                        4.8 stars (13)
                    </p>
                </div>

                <h4 className="text-lg font-semibold mb-2">Selected Services</h4>
                <ul>
                    {selectedServices.map(service => (
                        <li key={service._id} className="flex items-center justify-between py-2 border-b">
                            {service.name}
                            <button
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={() => handleRemoveService(service)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <p className="font-semibold">Total: ₹{total}</p>
                    <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectServicesPage;