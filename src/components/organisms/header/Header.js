import React from "react";
import "./Header.css";
import UserProfile from "../user/userProfile";
import { Link } from "react-router-dom";

const Header = ({ title, user }) => {
  return (
    <div className="header-container">
      <div className="header">
        <label>{title}</label>
      </div>
      <div>
      {user && (
          <Link to="/profile" className="link" name="buttonProfile">  
            <UserProfile
              name={user.name}
              lastname={user.lastname}
              photo={user.photo}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
