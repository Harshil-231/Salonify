import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Common/Navbar';
import { Footer } from '../Components/Common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../Styles/homepage.css';

export const HomePage = (w) => {
    return (
        <>
            <Navbar />
            <div className="homepage">
                {/* Hero Section */}
                <section className="hero" style={{ backgroundImage: "url('/images/SALON3.jpg')" }}>
                    <div className="overlay">
                        <div className="test">
                            <h1>Digitize your Salon/Spa</h1>
                            <p>Join over 2000 brands who use Salonify to improve their customer retention and increase their profits
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Section */}
                <section className="why-choose">
                    <h2>Why You Should Choose Hp's Salonify</h2>
                    <div className="card-layout">
                        <div className="card">
                            <img src="/images/stats1.png" alt="Feature 1" />
                            <div className="card-text">Lorem ipsum dolor sit amet.</div>
                        </div>
                        <div className="card">
                            <img src="/images/stats2.png" alt="Feature 2" />
                            <div className="card-text">Lorem ipsum dolor sit amet.</div>
                        </div>
                        <div className="card">
                            <img src="/images/stats3.png" alt="Feature 3" />
                            <div className="card-text">Lorem ipsum dolor sit amet.</div>
                        </div>
                    </div>
                </section>

                {/* Tailored Box Section */}
                <section className="tailored-box">
                    <h3>Exclusively Tailored</h3>
                    <p>We do not believe in a generic CRM which fits all industries. Salonify has been exclusively designed and engineered to cater to the needs of specifically Salons, Spas, and Nail Studios.</p>
                </section>

                {/* Client Products Slider */}
                <section className="slider-section">
                    <h2>Our Clients' Products</h2>
                    <div className="slider">
                        <img src="/images/purse.jpg" alt="Client 1" />
                        <img src="/images/dress.jpg" alt="Client 2" />
                        <img src="/images/suit.jpg" alt="Client 3" />
                        <img src="/images/CLIENT4.jpg" alt="Client 4" />
                    </div>
                </section>

                {/* Salon Reviews Slider */}
                <section className="slider-section">
                    <h2>Salons</h2>
                    <div className="slider">
                        <img src="/images/SALON1.jpg" alt="Review 1" />
                        <img src="/images/SALON2.jpg" alt="Review 2" />
                        <img src="/images/SALON3.jpg" alt="Review 3" />
                        <img src="/images/SALON4.jpg" alt="Review 4" />
                    </div>
                </section>

                {/* Trial Section */}
                <section className="trial-section">
                    <h2>Start Your 7-Day Trial Today. No Credit Card Needed!</h2>
                    <Link to="/signup">
                        <button>
                            Sign Up
                        </button>
                    </Link>
                </section>

                {/* Contact Section */}
                <section className="contact">
                    <p>
                        <FontAwesomeIcon icon={faPhone} /> 8238506893 | 
                        <FontAwesomeIcon icon={faEnvelope} /> harshilpanchal1523@gmail.com
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};
