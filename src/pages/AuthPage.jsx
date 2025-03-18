import React, { useState } from 'react';
import '../Styles/AuthPage.css';
import { Login } from './Login'; // Replace with your actual path
import { SignUp } from './SignUp'; // Replace with your actual path

export const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="auth-container">
      <div className="signup-form-container">
        <div className="signup-form">
          <SignUp />
        </div>
      </div>
      <div className={`image-section ${showLogin ? 'slide-left' : ''}`}>
        <img src="/images/WOMAN5.jpg" alt="Auth" />
        <div className="image-button" onClick={toggleForm}>
          {showLogin ? ' New to here? Signup' : 'Already have an account? Log In'}
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <Login />
        </div>
      </div>
    </div>
  );
};
