import React, { useState } from "react";
import "./VendorRegister.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const url = "http://localhost:8081/api/vendors";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

function CardSection() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}

const VendorRegister = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [inputError, setInputError] = useState({
    name: { error: false, text: "" },
    businessName: { error: false, text: "" },
    email: { error: false, text: "" },
    address1: { error: false, text: "" },
    address2: { error: false, text: "" },
    city: { error: false, text: "" },
    zipcode: { error: false, text: "" },
    state: { error: false, text: "" },
    card: { error: false, text: "" },
    password: { error: false, text: "" },
    passwordConfirmation: { error: false, text: "" },
  });

  const [vendor, setVendor] = useState({
    name: "",
    businessName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zipcode: "",
    state: "",
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
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    console.log(token);
    let err = false;
    if (validateInput("name", "Name can't be Empty!", "isEmpty").error)
      err = true;
    if (
      validateInput("businessName", "Business Name can't be Empty!", "isEmpty")
    )
      err = true;
    if (
      validateInput("email", "Not Valid Email Address!", "isValidEmail").error
    )
      err = true;
    if (validateInput("address1", "Address can't be Empty!", "isEmpty").error)
      err = true;
    if (validateInput("city", "City can't be Empty!", "isEmpty").error)
      err = true;
    if (validateInput("zipcode", "Zip Code can't be Empty!", "isEmpty").error)
      err = true;
    if (validateInput("state", "State Code can't be Empty!", "isEmpty").error)
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
    if (error) {
      setInputError((prevState) => {
        return { ...prevState, card: { error: true, text: error.message } };
      });
    }

    // if (err) return;

    console.log("Sending Request Please Wait...");
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    })
      .then((response) => {
        console.log("Response : ", response);
        if(response.status === 200)
          props.history.push({
            pathname: "/paymentsuccess",
          });
      })
      .catch((error) => console.log("Error : ", error));
  };

  return (
    <div id="vendor-register">
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
          <label className="control-label">Business Name</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.businessName.error ? "error-border" : ""
              }`}
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={vendor.businessName}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{
                display: inputError.businessName.error ? "inline" : "none",
              }}
            >
              {inputError.businessName.text}
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
        <legend>Vendor Address</legend>
        <div className="form-group">
          <label className="control-label">Address 1</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.address1.error ? "error-border" : ""
              }`}
              type="text"
              name="address1"
              placeholder="Address 1"
              value={vendor.address1}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.address1.error ? "inline" : "none" }}
            >
              {inputError.address1.text}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label optional">Address 2</label>
          <div className="form-text-input">
            <input
              className="form-control"
              type="text"
              name="address2"
              placeholder="Address2"
              value={vendor.address2}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">City</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.city.error ? "error-border" : ""
              }`}
              type="text"
              name="city"
              placeholder="City"
              value={vendor.city}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.city.error ? "inline" : "none" }}
            >
              {inputError.city.text}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Zip code</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.zipcode.error ? "error-border" : ""
              }`}
              type="text"
              name="zipcode"
              placeholder="Zip code"
              value={vendor.zipcode}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.zipcode.error ? "inline" : "none" }}
            >
              {inputError.zipcode.text}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">State</label>
          <div className="form-text-input">
            <input
              className={`form-control ${
                inputError.state.error ? "error-border" : ""
              }`}
              type="text"
              name="state"
              placeholder="State"
              value={vendor.state}
              onChange={onChange}
            />
            <span
              className="error-span"
              style={{ display: inputError.state.error ? "inline" : "none" }}
            >
              {inputError.state.text}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset id="account">
        <legend>Payment</legend>
        <div className="form-group">
          <label
            className={`control-label ${
              inputError.card.error ? "error-border" : ""
            }`}
          >
            Card Information
          </label>
          <div className="stripe-input-container">
            <CardSection />
          </div>
          <span
            className="error-span"
            style={{
              display: inputError.state.error ? "inline" : "none",
              position: "relative",
              left: 180,
            }}
          >
            {inputError.card.text}
          </span>
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
        <div className="form-btn btn" onClick={handleSubmit} disabled={!stripe}>
          Continue
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
