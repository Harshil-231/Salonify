// import React, { useState } from "react";

// export const SalonProfile = () => {
//     const [salon, setSalon] = useState({
//         name: "raja",
//         location: "raja",
//         contact: "raja",
//         workingHours: "raja",
//         description: "raja",
//     });

//     const handleChange = (e) => {
//         setSalon({ ...salon, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Salon Details Submitted:", salon);
//         alert("Salon details saved successfully!");
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Salon Details</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-700 font-medium">Salon Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={salon.name}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 font-medium">Location</label>
//                     <input
//                         type="text"
//                         name="location"
//                         value={salon.location}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 font-medium">Contact</label>
//                     <input
//                         type="text"
//                         name="contact"
//                         value={salon.contact}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 font-medium">Working Hours</label>
//                     <input
//                         type="text"
//                         name="workingHours"
//                         value={salon.workingHours}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="e.g., Mon-Sat: 10 AM - 8 PM"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 font-medium">Description</label>
//                     <textarea
//                         name="description"
//                         value={salon.description}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="3"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//                 >
//                     Save Salon Details
//                 </button>
//             </form>
//         </div>
//     );
// };


// import React from 'react';

// export const SalonProfile = () => {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Salon Profile</h1>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           Edit Profile
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Salon Name</label>
//                 <p className="mt-1 text-gray-900">Glamour & Style</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Address</label>
//                 <p className="mt-1 text-gray-900">123 Beauty Lane, Fashion District</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//                 <p className="mt-1 text-gray-900">(555) 123-4567</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <p className="mt-1 text-gray-900">contact@glamourandstyle.com</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Monday - Friday</span>
//                 <span className="text-gray-900">9:00 AM - 8:00 PM</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Saturday</span>
//                 <span className="text-gray-900">10:00 AM - 6:00 PM</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Sunday</span>
//                 <span className="text-gray-900">Closed</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h2 className="text-lg font-semibold mb-4">About Us</h2>
//           <p className="text-gray-700">
//             Welcome to Glamour & Style, where beauty meets excellence. Our salon is dedicated to providing 
//             top-notch beauty services in a luxurious and comfortable environment. With our team of skilled 
//             professionals, we ensure that every client leaves feeling confident and beautiful.
//           </p>
//         </div>

//         <div className="mt-8">
//           <h2 className="text-lg font-semibold mb-4">Amenities</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {['Free WiFi', 'Parking Available', 'Wheelchair Accessible', 'Coffee & Tea'].map((amenity) => (
//               <div key={amenity} className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700">{amenity}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const SalonProfile = () => {
  const { salonId } = useParams();
  const [salon, setSalon] = useState(null);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/salons/${salonId}`);
        setSalon(res.data);
      } catch (err) {
        console.error("Error fetching salon:", err.message);
      }
    };
    fetchSalon();
  }, [salonId]);

  if (!salon) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">{salon.salonName}</h1>
      <p className="text-gray-600"><strong>Business Name:</strong> {salon.businessName}</p>
      <p className="text-gray-600"><strong>Email:</strong> {salon.email}</p>
      <p className="text-gray-600"><strong>Phone:</strong> {salon.phone}</p>
      <p className="text-gray-600"><strong>Address:</strong> {salon.address}, {salon.city}, {salon.state}, {salon.country} - {salon.postalCode}</p>
      {salon.website && <a href={salon.website} target="_blank" className="text-blue-500 underline">Visit Website</a>}
    </div>
  );
};


