import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../../styles/user.css";

export const UserNavbar = () => {
  return (
    <header className="user-navbar">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search treatments, locations..." />
      </div>
      <div className="user-actions">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </Link>
      </div>
    </header>
  );
};
