import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import Pagination from "@material-ui/lab/Pagination";
import "./CategoryPage.css";

const url = "http://localhost:8083";

const CategoryPage = (props) => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${url}/api/categories/products/${props.location.state.id}?limit=20&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'res');
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const onChange = (e, page) => {
    setPage(page);
  };

  return (
    <div>
      <div className="product-list-container">
        <div className="module">
          <h3 className="modtitle">
            <span>{props.location.state.name}</span>
          </h3>
        </div>
        <ProductList list={list} />
      </div>
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(list.length/20)}
          variant="outlined"
          color="primary"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
