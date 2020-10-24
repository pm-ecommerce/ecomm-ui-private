import React from "react";
import "./SuccessPage.css";
import Image from "./img/successLogo.svg";

const SuccessPage = () => {
  return (
    <div className="success-page-container">
      <div className="success-card">
        <div className="success-logo">
          <img src={Image} alt="success" />
        </div>
        <div className="scard-text-container">
          <h3>Payment Successful</h3>
          <p>
            Your payment was successful! You can now continue using our System
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
