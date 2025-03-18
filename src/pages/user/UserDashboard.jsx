import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faHeart, faStar, faBell, faSearch, faQuestionCircle, faUserCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/User.css';

export const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userName, setUserName] = useState('Client Name');
  const [userEmail, setUserEmail] = useState('client@example.com');
  const [notificationCount, setNotificationCount] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

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
            <li className={`ud-sidebar-item ${activeSection === 'profile' ? 'ud-active' : ''}`} onClick={() => handleNavigation('profile')}>
              <FontAwesomeIcon icon={faUser} className="ud-sidebar-icon" /> Profile
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'appointments' ? 'ud-active' : ''}`} onClick={() => handleNavigation('appointments')}>
              <FontAwesomeIcon icon={faCalendarAlt} className="ud-sidebar-icon" /> Appointments
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'favorites' ? 'ud-active' : ''}`} onClick={() => handleNavigation('favorites')}>
              <FontAwesomeIcon icon={faHeart} className="ud-sidebar-icon" /> Favorites
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'reviews' ? 'ud-active' : ''}`} onClick={() => handleNavigation('homepage')}>
              <FontAwesomeIcon icon={faStar} className="ud-sidebar-icon" /> Reviews
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'notifications' ? 'ud-active' : ''}`} onClick={() => handleNavigation('notifications')}>
              <FontAwesomeIcon icon={faBell} className="ud-sidebar-icon" /> Notifications
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'search' ? 'ud-active' : ''}`} onClick={() => handleNavigation('search')}>
              <FontAwesomeIcon icon={faSearch} className="ud-sidebar-icon" /> Salon Search
            </li>
            <li className={`ud-sidebar-item ${activeSection === 'help' ? 'ud-active' : ''}`} onClick={() => handleNavigation('help')}>
              <FontAwesomeIcon icon={faQuestionCircle} className="ud-sidebar-icon" /> Help
            </li>
          </ul>
        </nav>
      </aside>
      <div className="ud-main-content">
        <header className="ud-top-nav">
          <input type="text" placeholder="Search salons..." onChange={(e) => setSearchQuery(e.target.value)} className="ud-search-input" />
          <div className="ud-top-nav-right">
            <div className="ud-notification-icon">
              <span className="ud-notification-count">{notificationCount}</span>
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="ud-profile-dropdown" onClick={openProfileEdit}>
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
          </div>
        </header>
      </div>
      {showProfileEdit && (
        <div className="ud-modal">
          <div className="ud-modal-content">
            <h2>Edit Profile</h2>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Email" />
            <button onClick={() => handleProfileUpdate(userName, userEmail)}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
