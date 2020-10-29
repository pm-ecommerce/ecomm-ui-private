import React, { useState, useEffect } from "react";
import "./Header.css";
import Logo from "./img/logo.png";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlineShopping,
} from "react-icons/ai";
// import { getCategories } from "../../actions";
// import { useDispatch, useSelector } from "react-redux";
import { withRouter} from 'react-router-dom';


const Header = (props) => {
  const [categories, setCategories] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const onClick = () => {
    console.log(searchWord);
    props.history.push({
      pathname: "/home/search",
      state: {
        categoryId: categoryId,
        searchWord: searchWord
      },
    });
  };
  useEffect(() => {
    fetch("http://localhost:8083/api/categories/")
      .then((res) => res.json())
      .then((res) => {
        const obj = res.data.map((category) => ({
          name: category.name,
          id: category.id,
        }));
        console.log(obj);
        setCategories(obj);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header id="main-header">
      <div className="header-top container">
        <Link to="/">
          <div id="logo" className="left">
            <img src={Logo} title="ECommerce" alt="Your Store" />
          </div>
        </Link>
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
            <select onChange={(e) => setCategoryId(e.target.value)}>
              <option>All categories</option>
              {categories.map((category) => (
                <option key={category.id} id={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="search-div left">
            <input
              placeholder="Keyword here..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>
          <div className="search-btn left" onClick={onClick}>
            <i>
              <AiOutlineSearch
                size={20}
                style={{ position: "relative", top: 4 }}
              />
            </i>
          </div>
        </div>
        <div className="cart-container">
          <div className="left">
            <span className="items-cart left">02</span>
            <span className="icon-c">
              <i className="fa shopping-bag">
                <AiOutlineShopping />
              </i>
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
        <i className="fa">
          <AiOutlineLogin size={20} style={{ position: "relative", top: 4 }} />
        </i>
        <Link
          className="hover-btn"
          to={{ pathname: "/userType", params: { type: "Login" } }}
          style={{ marginLeft: 4 }}
        >
          Login
        </Link>{" "}
        or{" "}
        <Link
          className="hover-btn"
          to={{ pathname: "/userType", params: { type: "Register" } }}
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default withRouter(Header);
