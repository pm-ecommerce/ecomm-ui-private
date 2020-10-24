import React from "react";
import "./SelectUserType.css";
import { Link } from "react-router-dom";

const SelectUserType = (props) => {
  const { type } = props.location.params;
  const page = {
    title:
      type === "Register"
        ? "If you already have an account with us, please login at the login page."
        : "New here? Please register at the register page.",
    link: {
      customer: type === "Register" ? "cregister" : "",
      vendor: type === "Register" ? "vregister" : ""
    }
  };
  return (
    <div className="usertype-container">
      <div className="utb-container">
        <div className="usertype-header">
          <h1>{page.title}</h1>
        </div>
        <Link to={page.link.customer} style={{ marginRight: 50 }}>
          <div className="u-box type-box">Customer</div>
        </Link>
        <Link to={page.link.vendor}>
          <div className="v-b ox type-box">Vendor</div>
        </Link>
      </div>
    </div>
  );
};

export default SelectUserType;
