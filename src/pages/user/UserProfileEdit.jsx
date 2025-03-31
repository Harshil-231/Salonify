import React from 'react';
import {Link} from "react-router-dom"
import '../../Styles/user.css';

export const UserProfileEdit = () => {
  return (
    <div className="upe-container">
      <div className="upe-header">
        <div className="upe-actions">
          <Link to="/user-profile" className="upe-close">Close</Link>
          <Link to="/user-profile" className="upe-save">Save</Link>
        </div>
      </div>

      <div className="upe-form">
        <div className="upe-form-row">
          <div className="upe-form-group">
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" />
          </div>
          <div className="upe-form-group">
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" />
          </div>
        </div>

        <div className="upe-form-row">
          <div className="upe-form-group">
            <label htmlFor="mobileNumber">Mobile number</label>
            <div className="upe-mobile-input">
              <select className="upe-country-code">
                <option>+91</option>
              </select>
              <input type="text" id="mobileNumber" />
            </div>
          </div>
        </div>

        <div className="upe-form-row">
          <div className="upe-form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" />
          </div>
        </div>

        <div className="upe-form-row">
          <div className="upe-form-group">
            <label htmlFor="dob">Date of birth</label>
            <div className="upe-dob-input">
              <input type="date" id="dob" />
            </div>
          </div>
        </div>

        <div className="upe-form-row">
          <div className="upe-form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option>Select Option</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};