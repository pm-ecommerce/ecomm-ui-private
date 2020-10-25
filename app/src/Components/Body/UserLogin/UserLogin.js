import React from "react";
import './UserLogin.css';
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="login-page-container">
      <div className="login-card">
        <div
          className="lcard-text-container page-login"
          style={{ marginRight: 30 }}
        >
          <div className="well">
            <h2>
              <i className="fa"></i> NEW CUSTOMER
            </h2>
            <p>
              By creating an account you will be able to shop faster, be up to
              date on an order's status, and keep track of the orders you have
              previously made.
            </p>
          </div>
          <div className="bottom">
            <Link
              className="btn"
              to="/cregister"
            >
              Continue
            </Link>
          </div>
        </div>
        <div className="lcard-text-container page-login">
          <div className="well">
            <h2>
              <i className="fa"></i> RETURNING CUSTOMER
            </h2>
            <div className="form-group">
              <label
                className="control-label optional"
                style={{ paddingLeft: 5, paddingBottom: 4 }}
              >
                E-Mail Address
              </label>
              <div
                className="form-text-input-login"
                style={{ marginBottom: 30 }}
              >
                <input className="form-control"></input>
              </div>
            </div>
            <div className="form-group">
              <label
                className="control-label optional"
                style={{ paddingLeft: 5, paddingBottom: 4 }}
              >
                E-Mail Address
              </label>
              <div className="form-text-input-login">
                <input className="form-control"></input>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btn">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
