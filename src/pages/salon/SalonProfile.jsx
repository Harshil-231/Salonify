import React from "react";
import "../../Styles/Salon.css"; // Assuming styling is here

export const SalonProfile = () => {
    const salonData = {
        name: "Luxury Glow Salon",
        description: "A premium beauty and wellness salon offering the best services for your hair, skin, and relaxation needs.",
        location: "123 Beauty Street, Cityville",
        contact: "+1 234 567 890",
        workingHours: "Mon-Sat: 10 AM - 8 PM",
        services: [
            { name: "Haircut & Styling", price: "$30" },
            { name: "Facial & Skin Care", price: "$50" },
            { name: "Massage Therapy", price: "$40" },
            { name: "Manicure & Pedicure", price: "$25" },
        ],
        images: [
            "/images/SALON1.jpg",
            "/images/salon2.jpg",
            "/images/salon3.jpg",
        ],
        reviews: [
            { user: "Emily R.", rating: 5, comment: "Amazing service! Loved the ambiance." },
            { user: "James L.", rating: 4, comment: "Great haircut and friendly staff." },
        ],
    };

    return (
        <div className="salon-profile-container">
            <h2>{salonData.name}</h2>
            <p>{salonData.description}</p>

            <div className="salon-details">
                <p><strong>📍 Location:</strong> {salonData.location}</p>
                <p><strong>📞 Contact:</strong> {salonData.contact}</p>
                <p><strong>⏰ Working Hours:</strong> {salonData.workingHours}</p>
            </div>

            <h3>💇‍♀️ Our Services</h3>
            <ul>
                {salonData.services.map((service, index) => (
                    <li key={index}>{service.name} - <strong>{service.price}</strong></li>
                ))}
            </ul>

            <h3>📸 Gallery</h3>
            <div className="salon-gallery">
                {salonData.images.map((image, index) => (
                    <img key={index} src={image} alt={`Salon ${index + 1}`} className="salon-image" />
                ))}
            </div>

            <h3>⭐ Customer Reviews</h3>
            <div className="salon-reviews">
                {salonData.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p><strong>{review.user}</strong> ({review.rating}⭐)</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
