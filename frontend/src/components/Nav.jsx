import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import UserContext from "../contexts/userContext";
import { useContext, useEffect } from "react";

const Nav = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="navbar">
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/stories">Stories</Link>
        {userContext.isLoggedIn && <Link to="/mystories">My Stories</Link>}
        {userContext.isLoggedIn ? (
          <>
            <Link to="/login">
              <button
                className="btn btn-danger"
                onClick={() => {
                  userContext.logout();
                }}
              >
                Logout
              </button>
            </Link>
            <Link style={{ color: "black" }} to="/">
              User : {userContext.email}
            </Link>
          </>
        ) : (
          <Link to="/login">Login/Signup</Link>
        )}
      </ul>
    </div>
  );
};

export default Nav;
