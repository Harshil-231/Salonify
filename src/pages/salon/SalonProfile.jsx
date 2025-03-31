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


import React from "react";
import { Link } from "react-router-dom";

export const SalonProfile = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <main className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Salon Owner Profile</h2>
          <Link to="/salon-owner/edit" className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
        </div>
        
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/chacha.jpg"
            alt="Salon Owner"
            className="rounded-full w-24 h-24 object-cover mb-2 border-2 border-gray-300"
          />
          <button className="text-sm text-blue-500 hover:underline">Edit</button>
        </div>
        
        {/* Owner Details */}
        <div className="space-y-4">
          <div>
            <label className="text-orange-400">Owner Name</label>
            <p className="text-white font-medium">Harshil Panchal</p>
          </div>
          <div>
            <label className="text-orange-400">Email</label>
            <p className="text-white font-medium">harshil@gmail.com</p>
          </div>
          <div>
            <label className="text-orange-400">Contact</label>
            <p className="text-white font-medium">8238584095</p>
          </div>
        </div>
        
        {/* Salon Details */}
        <div className="mt-6 space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Salon Details</h3>
          <div>
            <label className="text-orange-400">Salon Name</label>
            <p className="text-white font-medium">Luxury Hair & Spa</p>
          </div>
          <div>
            <label className="text-orange-400">Address</label>
            <p className="text-white font-medium">123 Main Street, Cityville</p>
          </div>
          <div>
            <label className="text-orange-400">Services Offered</label>
            <p className="text-white font-medium">Haircuts, Facials, Massages</p>
          </div>
          <div>
            <label className="text-orange-400">Rating</label>
            <p className="text-white font-medium">4.5/5</p>
          </div>
        </div>
      </main>
    </div>
  );
};
