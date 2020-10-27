import React from 'react';
import Menu from './Menu';
import './Header.css';
import Logo from './img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header id="main-header">
            <div className="header-top container">
                <div id="logo" className="left">
                    <img src={Logo} title="ECommerce" alt="Your Store"/>
                </div>
                <div className="left">
                    <Menu />
                </div>
            </div>
            <div className="header-bottom container">
                <div className="category left">
                    <div className="category-tab">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="cat-btn">All Categories</div>
                </div>
                <div className="left sf-container">
                    <div className="select-div left">
                        <select>
                            <option>All categories</option>
                        </select>
                    </div>
                    <div className="search-div left">
                        <input placeholder="Keyword here..."/>
                    </div>
                    <div className="search-btn left"><i></i></div>
                </div>
                <div className="cart-container">
                    <div className="left">
                        <span className="items-cart left">02</span>
                        <span className="icon-c">
                            <i className="fa shopping-bag"></i>
                        </span>
                    </div>
                    <div className="left shopcart-inner">
                        <p className="text-cart">MY CART</p>
                        <span className="cart-total">
                            <span className="items-cart2"></span>
                            <span className="items-carts orange">- $162.00</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="logreg-btn">
                <i className="fa"></i>
                <Link className="hover-btn" to={{pathname:"/userType", params: {type: 'Login' }}} style={{marginLeft: 4}}>Login</Link> or <Link className="hover-btn" to={{pathname:"/userType", params: {type: 'Register' }}}>Register</Link>
            </div>
        </header>
    )
}

export default Header;