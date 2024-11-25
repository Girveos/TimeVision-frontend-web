import React from "react";
import "./Header.css";
import UserProfile from "../user/userProfile";
import { Link } from "react-router-dom";

const Header = ({ title, user }) => {
  return (
    <div className="header-container">
      <div className="header">
        <h1>{title}</h1>
      </div>
      <div>
      {user && (
          <Link to="/profile" className="link">  
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
