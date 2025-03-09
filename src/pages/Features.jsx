import React from 'react'
import '../Styles/Features.css'
import { Navbar } from '../Components/Common/Navbar';

export const Features = () => {
    const featuresData = [
        {
            icon: "🧾 ",
            title: "Billing",
            points: [
                "Sell Services, Products, Packages & Memberships",
                "GST Invoice with the break-up of each tax",
                "Multiple payment modes in the same bill",
                "Collect partial payment",
                "OTP-based redemption of wallet balance",
                "Free SMS notifications",
            ],
        },
        {
            icon: "📅",
            title: "Appointments",
            points: [
                "Powerful calendar interface to create appointments",
                "Allow clients to book 24/7",
                "Schedule staff easily and efficiently",
                "Track client check-in and check-out",
                "SMS Reminders",
                "Create notes and reminders",
            ],
        },
        {
            icon: "📂",
            title: "Customer Profile",
            points: [
                "360° Customer profile",
                "View all customer bills",
                "View wallet transactions",
                "Create notes and reminders",
                "Send Birthday/Anniversary notifications",
                "Send Offers",
            ],
        },
        {
            icon: "💳",
            title: "Payments",
            points: [
                "Secure online payments",
                "Multiple payment gateways",
                "Auto-payment reminders",
            ],
        },
        {
            icon: "📊",
            title: "Analytics",
            points: [
                "Detailed revenue reports",
                "Staff performance insights",
                "Customer behavior analysis",
            ],
        },
        {
            icon: "🔔",
            title: "Notifications",
            points: [
                "Automated SMS & Email reminders",
                "Real-time alerts",
                "Push notifications for offers",
            ],
        },
        {
            icon: "🛍️",
            title: "E-Commerce",
            points: [
                "Sell beauty products online",
                "Integrated shopping cart",
                "Seamless checkout experience",
            ],
        },
        {
            icon: "⚙️",
            title: "Settings",
            points: [
                "Customizable salon settings",
                "Staff role management",
                "Business hours configuration",
            ],
        },
        {
            icon: "🎁",
            title: "Loyalty & Rewards",
            points: [
                "Offer discounts & coupons",
                "Loyalty points tracking",
                "Referral program",
            ],
        },
    ];

    return (
        <>
            <Navbar />
            <section className="features-section">
                {featuresData.map((feature, index) => (
                    <div className="feature-card" key={index}>
                        <span className="feature-icon">{feature.icon}</span>
                        <h3>{feature.title}</h3>
                        <hr />
                        <ul>
                            {feature.points.map((point, i) => (
                                <li key={i}>✅ {point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </>
    );
};

