import React from "react";
import "./Main.css";
import HomePage from "./HomePage/HomePage";
import SelectUserType from "./UserTypeSelection/SelectUserType";
import VendorRegister from "./VendorRegister/VendorRegister";
import SuccessPage from './SuccessPage/SuccessPage';
import { Route, Switch } from "react-router-dom";

const Body = () => {
  return (
    <div id="body">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/usertype" component={SelectUserType} />
        <Route path="/vregister" component={VendorRegister} />
        <Route path="/paymentsuccess" component={SuccessPage} />
      </Switch>
    </div>
  );
};

export default Body;
