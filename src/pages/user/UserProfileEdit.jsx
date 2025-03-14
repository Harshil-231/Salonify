import React from "react";
import "../../Styles/user.css"

export const UserProfileEdit = () => {
  return (
    <div className="profile-wrapper">
      <div className="button-group">
        <button className="close-btn">Close</button>
        <button className="save-btn">Save</button>
      </div>
      <div className="profile-container">
        <h2 className="profile-title">Edit profile details</h2>
        <form className="profile-form">
          <div className="input-group">
            <div className="input-field">
              <label>First name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div className="input-field">
              <label>Last name</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="input-group">
            <div className="mobile-group">
              <select>
                <option>+1 (USA)</option>
                <option>+91 (India)</option>
                <option>+44 (UK)</option>
                <option>+61 (Australia)</option>
              </select>
              <input type="text" placeholder="Enter mobile number" />
            </div>
          </div>

          <div className="input-field">
            <label>Email address</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="input-group">
            <div className="input-field">
              <label>Date of birth</label>
              <div className="dob-group">
                <input type="text" placeholder="Day" />
                <select>
                  <option>Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <input type="text" placeholder="Year" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label>Gender</label>
            <select>
              <option>Select Option</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
