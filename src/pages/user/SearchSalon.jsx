import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MapComponent from '../../Components/MapComponent';
import { UserHeader } from "./UserHeader";

export const SearchSalon = () => {
    const navigate = useNavigate();
    const [salons, setSalons] = useState([]);
    const [filteredSalons, setFilteredSalons] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        serviceType: "", // "male", "female", "unisex"
        minPrice: "",
        maxPrice: ""
    });

    const fetchSalons = async () => {
        try {
            const res = await axios.get("http://localhost:3200/salons");
            setSalons(res.data.data);
            setFilteredSalons(res.data.data);
        } catch (err) {
            console.error("Error fetching salons:", err.message);
        }
    };

    useEffect(() => {
        fetchSalons();
    }, []);

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const applyFilters = () => {
        const filtered = salons.filter((salon) => {
            const matchService =
                !filters.serviceType || salon.serviceType === filters.serviceType;

            const price = parseFloat(salon.price || 0);
            const matchMin = !filters.minPrice || price >= parseFloat(filters.minPrice);
            const matchMax = !filters.maxPrice || price <= parseFloat(filters.maxPrice);

            return matchService && matchMin && matchMax;
        });

        setFilteredSalons(filtered);
        setShowFilter(false);
    };

    return (
        <div className="pt-[70px] h-[calc(100vh-0px)] flex">
            <UserHeader/>
            {/* Left Side - List + Filter */}
            {/* Left Side - List + Filter */}
            <div className="w-1/3 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
                {/* Fixed Header */}
                <div className="sticky top-0 bg-gray-50 z-10 p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">All Salons</h2>
                        <button
                            onClick={() => setShowFilter(true)}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Filters
                        </button>
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto px-4 py-2 flex-1">
                    <ul className="space-y-3">
                        {filteredSalons.map((salon) => (
                            <li
                                key={salon._id}
                                className="bg-white p-4 rounded shadow-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => window.open(`/salon/${salon._id}`, "_blank")}
                            >
                                <p className="font-medium text-gray-800">Name: {salon.salonName}</p>
                                <p className="text-gray-600">Phone: {salon.phone}</p>
                                <p className="text-gray-600">Address: {salon.state}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Right Side - Map */}
            <div className="w-2/3 sticky top-[70px] h-[calc(100vh-70px)] hidden md:block">
                <MapComponent />
            </div>

            {/* Filter Modal */}
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-white/50 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h3 className="text-lg font-bold mb-4">Filter Salons</h3>

                        <div className="mb-4">
                            <label className="block  mb-1 text-gray-700 font-bold">Service Type</label>
                            <select
                                name="serviceType"
                                value={filters.serviceType}
                                onChange={handleFilterChange}
                                className="w-full text-slate-800 border rounded px-3 py-2"
                            >
                                <option value="">Any</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-1 text-gray-700">Min Price</label>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="w-full text-slate-800 border rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-1 text-gray-700">Max Price</label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="w-full text-slate-800 border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowFilter(false)}
                                className="text-sm text-gray-800 font-extrabold hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={applyFilters}
                                className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
