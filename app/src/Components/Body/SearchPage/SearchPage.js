import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import Pagination from "@material-ui/lab/Pagination";
import "./SearchPage.css";

const SearchPage = (props) => {
  const { categoryId, searchWord } = props.location.state;
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8083/api/search?name=${searchWord}&categoryId=${categoryId}&highPrice=100&lowPrice=0&limit=10&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'res');
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const onChange = (e, page) => {
    console.log(page);
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
          count={10}
          variant="outlined"
          color="primary"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
