import React from "react";

const SignUpForm = ({ switchAuthMode }) => {
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
              />
            </div>
            <div className="form-group mt-3">
              <label>Place</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Helsinki"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Birth year</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Year of birth"
              />
            </div>
            <div className="form-group mt-3">
              <label>Picture link</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="https://..."
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
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
  );
};

export default SignUpForm;
