import React from "react";
import "./Main.css";
import HomePage from "./HomePage/HomePage";
import SelectUserType from "./UserTypeSelection/SelectUserType";
import VendorRegister from "./VendorRegister/VendorRegister";
import UserRegister from './UserRegister/UserRegister';
import SuccessPage from './SuccessPage/SuccessPage';
import VendorLogin from './VendorLogin/VendorLogin';
import UserLogin from './UserLogin/UserLogin';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import { Route, Switch } from "react-router-dom";

const Body = () => {
  return (
    <div id="body">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/usertype" component={SelectUserType} />
        <Route path="/clogin" component={UserLogin} />
        <Route path="/vlogin" component={VendorLogin} />
        <Route path="/cregister" component={UserRegister} />
        <Route path="/vregister" component={VendorRegister} />
        <Route path="/paymentsuccess" component={SuccessPage} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </div>
  );
};

export default Body;
