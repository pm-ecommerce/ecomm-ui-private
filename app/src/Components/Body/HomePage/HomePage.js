import React, { useState, useEffect, Fragment } from "react";
import "./HomePage.css";
import ProductList from "../ProductList/ProductList";
import CategoryPage from "../CategoryPage/CategoryPage";
import SearchPage from '../SearchPage/SearchPage';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import { Route, Switch } from "react-router-dom";

// const url = "http://localhost:8080";
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("./img", false, /\.(png|jpe?g|svg)$/));

const DefaultPage = () => {
  const [sections, setSections] = useState([]);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("http://localhost:8083/api/categories/random")
      .then((res) => res.json())
      .then((res) => {
        setSections(res.data);
        res.data.forEach((category) => {
          const name = category.name;
          fetch(`http://localhost:8083/api/categories/products/${category.id}`)
            .then((res) => res.json())
            .then((res) => {
              setProduct(prevState => ({ ...prevState,[name]: res.data}));
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      {sections.map((section) => (
        <div className="product-list-container" key={section.name}>
          <div className="module">
            <h3 className="modtitle">
              <span>TRENDING {section.name}</span>
            </h3>
          </div>
          <ProductList list={product[section.name]} />
        </div>
      ))}
    </Fragment>
  );
};

const HomePage = (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // fetch(`${url}/pm-search/api/categories`)
    fetch('http://localhost:8083/api/categories/')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const obj = res.data.map((category, index) => ({
          name: category.name,
          id: category.id,
          image: images[index],
        }));
        setCategories(obj);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClick = (id,name) => {
    props.history.push({
      pathname: "/home/category",
      state: {
        id: id,
        name: name
      },
    });
  };

  return (
    <div id="main-page-container">
      <div className="left-column">
        <div className="category-menu">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-name"
              id={category.id}
              onClick={() => onClick(category.id,category.name)}
              name={category.name}
            >
              <img
                src={category.image}
                className="category-name-img"
                alt="category"
              />
              <span style={{ position: "relative", bottom: 3 }}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="right-column">
        <Switch>
          <Route exact path="/" component={DefaultPage} />
          <Route exact path="/home" component={DefaultPage} />
          <Route path="/home/category" component={CategoryPage} />
          <Route path="/home/search" component={SearchPage} />
          <Route path="/home/product" component={ProductDetailPage} />
        </Switch>
      </div>
    </div>
  );
};

export default HomePage;
