import React, { useState } from "react";
import "./UserLogin.css";
import { Link } from "react-router-dom";

const url = "http://localhost:8081/api/users/login";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log("Sending Request Please Wait...");
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }

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
            <Link className="btn" to="/cregister">
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
                <input className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>
            </div>
            <div className="form-group">
              <label
                className="control-label optional"
                style={{ paddingLeft: 16, paddingBottom: 4, textAlign: "left" }}
              >
                Password
              </label>
              <div className="form-text-input-login">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btn" onClick={onSubmit}>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
