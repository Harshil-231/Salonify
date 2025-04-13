import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Mail, Globe, Clock, Scissors, DollarSign, Star } from 'lucide-react';

export const SalonDetailPage = () => {
    const { salonId } = useParams();
    const [salon, setSalon] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [visibleServices, setVisibleServices] = useState(6); // Initial number of visible services

    useEffect(() => {
        const fetchSalonAndServices = async () => {
            setLoading(true);
            setError(null);

            try {
                const salonRes = await axios.get(`http://localhost:3200/salons/${salonId}`);
                setSalon(salonRes.data.data);

                const servicesRes = await axios.get(`http://localhost:3200/services/getservices?salonId=${salonId}`);
                setServices(servicesRes.data.data);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSalonAndServices();
    }, [salonId]);

    // Extract categories from the services
    useEffect(() => {
        if (services && services.length > 0) {
            const uniqueCategories = [...new Set(services.map(service => service.categoryId.name))];
            setCategories(['All', ...uniqueCategories]); // Include an "All" category
            setSelectedCategory('All'); // Initially select the "All" category
        }
    }, [services]);

    const filteredServices = selectedCategory === 'All'
        ? services
        : services.filter(service => service.categoryId.name === selectedCategory);

    const visibleServiceList = filteredServices.slice(0, visibleServices);

    const handleShowMore = () => {
        setVisibleServices(prev => prev + 6);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                    <p className="mt-4 text-lg text-indigo-800 font-medium">Loading salon details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-600 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 backdrop-blur-lg bg-white/90">
                    <div
                        className="h-96 relative bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")'
                        }}
                    >
                        <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent">
                            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">{salon.salonName}</h1>
                            <p className="text-2xl text-indigo-100 font-light">{salon.businessName}</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center p-4 bg-indigo-50 rounded-2xl">
                                <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                <span className="ml-3 text-gray-700">
                                    {salon.address}, {salon.city}, {salon.state}
                                </span>
                            </div>
                            <div className="flex items-center p-4 bg-indigo-50 rounded-2xl">
                                <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                <span className="ml-3 text-gray-700">{salon.phone}</span>
                            </div>
                            <div className="flex items-center p-4 bg-indigo-50 rounded-2xl">
                                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                <span className="ml-3 text-gray-700">{salon.email}</span>
                            </div>
                        </div>

                        {salon.website && (
                            <a
                                href={salon.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-200/50"
                            >
                                <Globe className="w-5 h-5 mr-2" />
                                Visit Our Website
                            </a>
                        )}
                    </div>
                </div>

                {/* Services Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-lg bg-white/90">
                    <h2 className="text-3xl font-bold text-indigo-800 mb-8 flex items-center">
                        <Star className="w-8 h-8 mr-3 text-indigo-600" />
                        Featured Services
                    </h2>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-4 mb-6">
                        <label className="text-gray-700 font-medium">Filter by Category:</label>
                        <select
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setVisibleServices(6); // Reset visible services when category changes
                            }}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {visibleServiceList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleServiceList.map((service) => (
                                <div
                                    key={service._id}
                                    className="group relative bg-gradient-to-br from-indigo-50/50 to-blue-50/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-indigo-900 group-hover:text-indigo-700 transition-colors duration-300">
                                            {service.name}
                                        </h3>
                                        <span className="flex items-center text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full text-sm">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            {service.price}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                                    <div className="absolute bottom-6 right-6">
                                        <a
                                            href={`/select-services/${salonId}/${service._id}`}
                                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline"
                                        >
                                            Book Service →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-indigo-50 rounded-2xl">
                            <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No services listed for this category.</p>
                        </div>
                    )}

                    {filteredServices.length > visibleServiceList.length && (
                        <div className="text-center mt-6">
                            <button
                                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all duration-300 shadow-lg"
                                onClick={handleShowMore}
                            >
                                Show More Services
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalonDetailPage;