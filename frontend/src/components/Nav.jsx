import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import UserContext from "../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import usersService from "../services/usersService";

const Nav = () => {
  const userContext = useContext(UserContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!userContext.isLoggedIn || !userContext.email) {
      setUserName("");
      return;
    }

    usersService
      .getUserByMail(userContext.email)
      .then((res) => {
        const fetchedUser = res?.data?.user?.[0];
        setUserName(fetchedUser?.nimi || "");
      })
      .catch(() => {
        setUserName("");
      });
  }, [userContext.email, userContext.isLoggedIn]);

  return (
    <div className="navbar">
      <div className="nav-links">
        <div className="nav-main">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/stories">Stories</Link>
          {userContext.isLoggedIn && <Link to="/mystories">My Stories</Link>}
        </div>
        <div className="nav-auth">
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
              <span className="nav-user">User : {userName}</span>
            </>
          ) : (
            <Link to="/login">Login/Signup</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
