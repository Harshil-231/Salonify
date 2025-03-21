import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faHeart,
  faStar,
  faBell,
  faSearch,
  faQuestionCircle,
  faUserCircle,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/User.css';
import { Link } from 'react-router-dom';
import MapComponent from '../../Components/MapComponent';

export const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userName, setUserName] = useState('Client Name');
  const [userEmail, setUserEmail] = useState('client@example.com');
  const [notificationCount, setNotificationCount] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const closeModal = () => {
    setShowProfileEdit(false);
    setShowReviewForm(false);
  };

  const openProfileEdit = () => {
    setShowProfileEdit(true);
  };

  const handleProfileUpdate = (newName, newEmail) => {
    setUserName(newName);
    setUserEmail(newEmail);
    closeModal();
  };

  return (
    <div className="ud-dashboard-container">
      <aside className="ud-sidebar">
        <nav>
          <ul className="ud-sidebar-list">
            <li
              className={`ud-sidebar-item ${activeSection === 'profile' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('profile')}
            >
              <FontAwesomeIcon icon={faUser} className="ud-sidebar-icon" />
              Profile
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'appointments' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('appointments')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="ud-sidebar-icon" />
              Appointments
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'favorites' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('favorites')}
            >
              <FontAwesomeIcon icon={faHeart} className="ud-sidebar-icon" />
              Favorites
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'reviews' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('reviews')}
            >
              <FontAwesomeIcon icon={faStar} className="ud-sidebar-icon" />
              Reviews
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'notifications' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('notifications')}
            >
              <FontAwesomeIcon icon={faBell} className="ud-sidebar-icon" />
              Notifications
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'search' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('search')}
            >
              <FontAwesomeIcon icon={faSearch} className="ud-sidebar-icon" />
              Salon Search
            </li>
            <li
              className={`ud-sidebar-item ${activeSection === 'help' ? 'ud-active' : ''
                }`}
              onClick={() => handleNavigation('help')}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="ud-sidebar-icon" />
              Help
            </li>
          </ul>
        </nav>
      </aside>
      <div className="ud-main-content">
        <header className="ud-top-nav">
          <input
            type="text"
            placeholder="Search salons..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ud-search-input"
          />
          <div className="ud-top-nav-right">
            <div className="ud-notification-icon">
              <span className="ud-notification-count">{notificationCount}</span>
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div
              className="ud-profile-dropdown"
              onClick={() => handleNavigation('profile')} // Corrected profile click
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
          </div>
        </header>

        {/* Section Content */}
        {activeSection === 'profile' && (
          <main className="fresh-main-content">
            <div className="fresh-profile-details">
              <Link to="/user-profile/edit">
                <div className="fresh-profile-edit-btn">Edit</div>
              </Link>
              <div className="fresh-profile-image">
                {/* Replace with an actual profile image */}
                <div className="fresh-profile-image-placeholder"></div>
                <button className="fresh-edit-button">Edit</button>
              </div>
              <div className="fresh-profile-name">Harshil Panchal</div>
              <div className="fresh-profile-field">
                <label>First name</label>
                <div>Harshil</div>
              </div>
              <div className="fresh-profile-field">
                <label>Last name</label>
                <div>Panchal</div>
              </div>
              <div className="fresh-profile-field">
                <label>Mobile number</label>
                <div>-</div>
              </div>
              <div className="fresh-profile-field">
                <label>Email</label>
                <div>harshilpanchal1523@gmail.com</div>
              </div>
              <div className="fresh-profile-field">
                <label>Date of birth</label>
                <div>-</div>
              </div>
              <div className="fresh-profile-field">
                <label>Gender</label>
                <div>-</div>
              </div>
            </div>

            <div className="fresh-address-section">
              <div className="fresh-address-title">My addresses</div>
              <div className="fresh-address-card">
                <div className="fresh-address-card-title">Home</div>
                <div className="fresh-address-card-description">
                  Add a home address
                </div>
              </div>
              <div className="fresh-address-card">
                <div className="fresh-address-card-title">Work</div>
                <div className="fresh-address-card-description">
                  Add a work address
                </div>
              </div>
              <button className="fresh-add-address-button">Add</button>
            </div>
          </main>
        )}

        {activeSection === 'appointments' && (
          <div className="ud-section-content">
            <h2>Appointments</h2>
            {/* Add your appointments content here */}
            <p>This is where appointment information will be displayed.</p>
          </div>
        )}

        {activeSection === 'favorites' && (
          <div className="ud-section-content">
            <h2>Favorites</h2>
            {/* Add your favorites content here */}
            <p>This is where saved salon favorites will be displayed.</p>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="ud-section-content">
            <h2>Reviews</h2>
            {/* Add your reviews content here */}
            <p>This is where user reviews will be displayed.</p>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="ud-section-content">
            <h2>Notifications</h2>
            {/* Add your notifications content here */}
            <p>This is where user notifications will be displayed.</p>
          </div>
        )}

        {activeSection === 'search' && (
          <div className="ud-section-content">
            <h2>Salon Search</h2>
            <input
              type="text"
              placeholder="Search location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="ud-location-search-input"
            />
            <MapComponent locationQuery={locationQuery} /> {/* Pass locationQuery */}
          </div>
        )}
        {activeSection === 'help' && (
          <div className="ud-section-content">
            <h2>Help</h2>
            {/* Add your help content here */}
            <p>This is where user help information will be displayed.</p>
          </div>
        )}
      </div>
      {showProfileEdit && (
        <div className="ud-modal">
          <div className="ud-modal-content">
            <h2>Edit Profile</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={() => handleProfileUpdate(userName, userEmail)}>
              Save
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
