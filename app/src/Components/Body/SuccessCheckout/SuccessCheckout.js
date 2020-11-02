import React from "react";
import "./SuccessCheckout.css";
import Image from "./img/successLogo.svg";

const SuccessCheckout = () => {
  return (
    <div className="success-page-container">
      <div className="success-card">
        <div className="success-logo">
          <img src={Image} alt="success" />
        </div>
        <div className="scard-text-container">
          <h3>Thank you</h3>
          <p>
            Your packages are on the way!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckout;
