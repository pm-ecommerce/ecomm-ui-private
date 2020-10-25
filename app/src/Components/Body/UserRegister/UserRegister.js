import React, { useState } from "react";
import "./UserRegister.css";

const url = "http://localhost:8081/api/users/";

const UserRegister = (props) => {
  const [inputError, setInputError] = useState({
    name: { error: false, text: "" },
    email: { error: false, text: "" },
    password: { error: false, text: "" },
    passwordConfirmation: { error: false, text: "" },
  });

  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChange = (e) => {
    const inputName = e.target.name;
    const value =
      inputName === "zipcode"
        ? e.target.value.replace(/[^0-9.]/g, "")
        : e.target.value;
    setVendor((prevState) => {
      return { ...prevState, [inputName]: value };
    });

    setInputError((prevState) => {
      return { ...prevState, [inputName]: { error: false, text: "" } };
    });

    setInputError((prevState) => {
      return { ...prevState, card: { error: false, text: "" } };
    });
  };

  const validateInput = (prop, errorText, type) => {
    let error = false;
    if (type === "isEmpty" && vendor[prop] === "") error = true;
    if (type === "isValidEmail" && validateEmail(vendor[prop]) === false)
      error = true;
    if (type === "isPasswordMatch" && vendor[prop] !== vendor["password"])
      error = true;
    if (error)
      setInputError((prevState) => {
        return { ...prevState, [prop]: { error: true, text: errorText } };
      });

    return { error: error };
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    let err = false;
    if (validateInput("name", "Name can't be Empty!", "isEmpty").error)
      err = true;
    if (
      validateInput("email", "Not Valid Email Address!", "isValidEmail").error
    )
      err = true;
    if (validateInput("password", "Password can't be Empty!", "isEmpty").error)
      err = true;
    if (
      validateInput(
        "passwordConfirmation",
        "Password doesn't Match!",
        "isPasswordMatch"
      ).error
    )
      err = true;
    if (err) return;

    console.log("Sending Request Please Wait...");
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    })
      .then((response) => console.log("Response : ", response))
      .catch((error) => console.log("Error : ", error));
    // props.history.push({
    //   pathname: "/paymentsuccess",
    // });
  };

  return (
    <div id="user-register">
      <h2>Register Account</h2>
      <p>
        If you already have an account with us, please login at the login page.
      </p>
      <fieldset id="account">
        <legend>Vendor Details</legend>
        <div className="form-group">
          <label className="control-label">Name</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.name.error ? "error-border" : ""
              }`}
              type="text"
              name="name"
              placeholder="Name"
              value={vendor.name}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.name.error ? "inline" : "none" }}
            >
              {inputError.name.text}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.email.error ? "error-border" : ""
              }`}
              type="text"
              name="email"
              placeholder="Email"
              value={vendor.email}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.email.error ? "inline" : "none" }}
            >
              {inputError.email.text}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset id="account">
        <legend>Your Password</legend>
        <div className="form-group">
          <label className="control-label">Password</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.password.error ? "error-border" : ""
              }`}
              type="password"
              name="password"
              placeholder="Password"
              value={vendor.password}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.password.error ? "inline" : "none" }}
            >
              {inputError.password.text}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Password Confirm</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.passwordConfirmation.error ? "error-border" : ""
              }`}
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirm"
              value={vendor.passwordConfirmation}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{
                display: inputError.passwordConfirmation.error
                  ? "inline"
                  : "none",
              }}
            >
              {inputError.passwordConfirmation.text}
            </span>
          </div>
        </div>
      </fieldset>
      <div className="form-btn-container">
        <div className="form-btn btn" onClick={handleSubmit}>
          Continue
        </div>
      </div>
    </div>
  );
};

export default UserRegister;