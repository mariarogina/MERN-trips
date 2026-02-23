import React from "react";
import { useState, useContext } from "react";
import "../index.css";
import SignUpForm from "./SignUpForm";
import usersService from "../services/usersService";
import UserContext from "../contexts/userContext";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState({
    nimi: "",
    paikkakunta: "",
    sähköpostiosoite: "",
    salasana: "",
    syntymävuosi: "",
    valokuvanNimi: "",
  });
  let [authMode, setAuthMode] = useState("signin");
  let [validated, setValidated] = useState(false);
  let [showError, setShowError] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);

  const switchAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // const switchState = () => {
  //   setLoggedIn(!loggedIn);
  // };

  const checkIsValid = () => {
    if (authMode === "signin") {
      return user.sähköpostiosoite && user.salasana;
    } else {
      return (
        user.nimi &&
        user.paikkakunta &&
        user.sähköpostiosoite &&
        user.salasana &&
        user.syntymävuosi &&
        user.valokuvanNimi
      );
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    setUser({ ...user, nimi: e.target.value });
  };

  const handlePlace = (e) => {
    e.preventDefault();
    setUser({ ...user, paikkakunta: e.target.value });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setUser({ ...user, sähköpostiosoite: e.target.value });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setUser({ ...user, salasana: e.target.value });
  };

  const handleYear = (e) => {
    e.preventDefault();
    setUser({ ...user, syntymävuosi: e.target.value });
  };

  const handlePic = (e) => {
    e.preventDefault();
    setUser({ ...user, valokuvanNimi: e.target.value });
  };

  // const submitLogin = (e) => {
  //   usersService.loginUser(
  //     { sähköpostiosoite: user.sähköpostiosoite, salasana: user.salasana },
  //     // setAppError,
  //     userContext.login,
  //     userContext.setEmail
  //   );
  // };

  const handleSubmit = (e) => {
    if (!checkIsValid()) {
      alert("Please fill in al fields");
    } else {
      setValidated(true);
      if (authMode === "signin") {
        usersService.loginUser(
          user,
          // setAppError,
          userContext.login,
          // userContext.setEmail
        );
      } else {
        usersService.signupUser(
          user
          //   setAppError,
        );
        switchAuthMode();
        alert("Signup successful");
      }
    }
  };

  if (authMode === "signin") {
    return (
      <div className="loginWrapper">
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={switchAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={user.sähköpostiosoite}
                  onChange={(e) => {
                    handleEmail(e);
                  }}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={user.salasana}
                  autoComplete="on"
                  onChange={(e) => {
                    handlePassword(e);
                  }}
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <Link to="/">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </Link>
              </div>
              {/* <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p> */}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="loginWrapper">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={switchAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                value={user.nimi}
                onChange={(e) => {
                  handleName(e);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Place</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Helsinki"
                value={user.paikkakunta}
                onChange={(e) => {
                  handlePlace(e);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={user.sähköpostiosoite}
                onChange={(e) => {
                  handleEmail(e);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={user.salasana}
                onChange={(e) => {
                  handlePassword(e);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Birth year</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Year of birth"
                value={user.syntymävuosi}
                onChange={(e) => {
                  handleYear(e);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Picture link</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="https://..."
                value={user.valokuvanNimi}
                onChange={(e) => {
                  handlePic(e);
                }}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
        Forgot <a href="#">password?</a>
      </p> */}
          </div>
        </form>
      </div>
    </div>
    // <SignUpForm switchAuthMode={switchAuthMode} />
  );
};

export default Login;
