import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBox = () => {
    const [treatment, setTreatment] = useState('All treatments and venues');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const treatments = [
        'Haircut',
        'Manicure',
        'Massage',
        'Facial',
        'Spa Day',
        'Nail Art',
        'Salon A',
        'Salon B',
        'Salon C'
    ];

    const handleTreatmentChange = (selectedTreatment) => {
        setTreatment(selectedTreatment);
        setShowDropdown(false);
    };

    const handleSearch = () => {
        navigate('/search-results');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md mx-auto">
            <div className="relative mb-4">
                <div
                    className="border rounded-md p-2 flex items-center cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-600" /> {/* Changed color */}
                    <span className="text-gray-800">{treatment}</span> {/* Changed color */}
                </div>
                {showDropdown && (
                    <div ref={dropdownRef} className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                        {treatments.map((item) => (
                            <div
                                key={item}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                onClick={() => handleTreatmentChange(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border rounded-md p-2 mb-4 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600" /> {/* Changed color */}
                <span className="text-gray-800">Current location</span> {/* Changed color */}
            </div>

            <div className="flex space-x-2 mb-4">
                <div className="border rounded-md p-2 flex items-center flex-1">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-600" /> {/* Changed color */}
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="border-none w-full outline-none text-gray-800"
                    />
                </div>
                <div className="border rounded-md p-2 flex items-center flex-1">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600" /> {/* Changed color */}
                    <span className="text-gray-800">Any time</span> {/* Changed color */}
                </div>
            </div>

            <button
                className="bg-gray-950 text-white p-3 rounded-md w-full"
                onClick={handleSearch}
            >
                Search On Salonify
            </button>
        </div>
    );
};

export default SearchBox;