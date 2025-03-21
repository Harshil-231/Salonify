import React from 'react'
import {Link} from 'react-router-dom'
// import { Navbar } from '../Components/Common/Navbar';
import "../Styles/priceblog.css"

export const Pricing = () => {
    return (
        <>
        {/* <Navbar /> */}
        <section className="pricing-container">
            <div className="pricing-intro">
                <h2>We like to keep it Simple.</h2>
                <p>Elevate your salon and spa experience with smart technology.</p>
                <p>
                    Our Professional plan is priced at <strong>₹12,000</strong> per year. And
                    it comes with a <strong>7 day TRIAL</strong>.
                </p>
            </div>
            <div className="pricing-cards">
                <div className="pricing-card professional">
                    <h3>Professional</h3>
                    <p className="price">₹<strong>12,000</strong>/year</p>
                  <Link to='/signup'>  <button className="signup-btn">SIGN UP NOW</button></Link>
                    <p className="sub-text">best for small salons</p>
                    <ul className="pricing-list">
                        <li>Invoice Management</li>
                        <li>Customer Management</li>
                        <li>Staff Management</li>
                        <li>Appointments</li>
                        <li>Combo Packages</li>
                        <li>Customer Wallet</li>
                        <li>Memberships</li>
                        <li>Retail Inventory</li>
                        <li>Loyalty Program</li>
                        <li>Expenses</li>
                    </ul>
                </div>
                <div className="pricing-card enterprise">
                    <h3>Enterprise</h3>
                    <p className="price">₹<strong>18,000</strong>/year</p>
                  <Link to='/signup'>  <button className="talk-btn">TALK TO US</button></Link>
                    <p className="sub-text">everything in pro and ..</p>
                    <ul  className="pricing-list">
                        <li>Super Admin</li>
                        <li>Single Customer Profile</li>
                        <li>Role Customizations</li>
                        <li>Multiple Locations</li>
                        <li>Enterprise Reports</li>
                        <li>Priority Support</li>
                    </ul>
                </div>
            </div>
        </section>
    </>
    );
};

