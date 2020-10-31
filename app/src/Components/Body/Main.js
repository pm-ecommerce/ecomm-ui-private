import React from 'react';
import './Main.css';
import HomePage from './HomePage/HomePage';
import SelectUserType from './UserTypeSelection/SelectUserType';
import VendorRegister from './VendorRegister/VendorRegister';
import UserRegister from './UserRegister/UserRegister';
import SuccessPage from './SuccessPage/SuccessPage';
import VendorLogin from './VendorLogin/VendorLogin';
import UserLogin from './UserLogin/UserLogin';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage/ProductDetailPage';
import CategoryPage from './CategoryPage/CategoryPage';
import SearchPage from './SearchPage/SearchPage';

const Body = () => {

    return (
        <div className="main-container container">
            <Switch>
                <Route exact path="/" component={ HomePage }/>
                <Route path="/products/:slug" component={ ProductDetailPage }/>
                <Route path="/category/:id" component={ CategoryPage }/>
                <Route path="/search" component={ SearchPage }/>
                <Route path="/usertype" component={ SelectUserType }/>
                <Route path="/login" component={ UserLogin }/>
                <Route path="/vendor-login" component={ VendorLogin }/>
                <Route path="/register" component={ UserRegister }/>
                <Route path="/vendor-register" component={ VendorRegister }/>
                <Route path="/payment-success" component={ SuccessPage }/>
                <Route path="/cart" component={ Cart }/>
                <Route path="/checkout" component={ Checkout }/>
            </Switch>
        </div>
    );
};

export default Body;
