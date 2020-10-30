import React from "react";
import "./Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout-page-container">
      <div
        className="delivery-method-container checkout-box"
        style={{ marginRight: 30 }}
      >
        <div className="panel-heading">
          <h4 className="panel-title">
            <i></i>Delivery Method
          </h4>
        </div>
        <div className="panel-body">
          <p>
            Please select the preferred shipping method to use on this order.
          </p>
          <div className="radio">
            <label>
                <input type="radio" checked="checked" name="Free Shipping" /> Free Shipping - $0.00
            </label>
          </div>
          <div className="radio">
            <label>
                <input type="radio" checked="checked" name="Flat Shipping Rate" /> Flat Shipping Rate - $7.50
            </label>
          </div>
        </div>
      </div>
      <div className="payment-method-container checkout-box"></div>
    </div>
  );
};

export default Checkout;
