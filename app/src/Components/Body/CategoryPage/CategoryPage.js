import React, { useState, useEffect, Fragment } from "react";
import ProductList from "../ProductList/ProductList";
import Pagination from "@material-ui/lab/Pagination";
import config from "../../../Config";
import LatestProducts from "../../Common/LatestProducts";
import { Link } from "react-router-dom";

// const url = `${config.baseUrl}/pm-search`;
const url = `http://localhost:8083`;

const CategoryPage = (props) => {
  const state = props.location.state || props.match.params || {};
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [category, setCategory] = useState(state);
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState({});

    const fetchProducts = (page = 1) => {
        console.log('res.data');
        const apiUrl = new URL(`${ url }/api/categories/products/${ category.id }`);
        const params = {
            limit : perPage,
            page
        };

        apiUrl.search = new URLSearchParams(params).toString();
        fetch(apiUrl)
            .then((res) => res.json())
            .then((res) => {
                console.log('res.data');
                setList(res.data);
            })
            .catch((err) => console.log('Error' + err));
    };

  const fetchCategory = (id) => {
    fetch(`${url}/api/categories/${state.id}`)
      .then((res) => res.json())
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategories = () => {
    fetch(`${url}/api/categories/`)
      .then((res) => res.json())
      .then((res) => {
        const obj = res.data.map((category) => ({
          name: category.name,
          id: category.id,
        }));
        setCategories(obj);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e, p) => {
    if (p !== page && p > 0 && p <= list.totalPages) {
      setPage(p);
      fetchProducts(p);
    }
  };

  const setItemsPerPage = (event) => {
    setPerPage(event.target.value);
    fetchProducts(page);
  };

    useEffect(() => {
        fetchProducts(page);
        fetchCategory(category.id);
        fetchCategories();
    }, [props]);

    return (
        <Fragment>
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                <li><Link to={ '/categories/' + category.id }>{ category.name }</Link></li>
            </ul>
            <div className="row">
                <aside className="col-sm-4 col-md-3 content-aside" id="column-left">
                    <div className="module category-style">
                        <h3 className="modtitle">Categories</h3>
                        <div className="modcontent">
                            <div className="box-category">
                                <ul id="cat_accordion" className="list-group">
                                    {
                                        categories.map(cat => {
                                            return (
                                                <li className="">
                                                    <Link to={ `/category/${ cat.id }` }
                                                       className="cutom-parent">{ cat.name }</Link>
                                                    <span className="dcjq-icon"></span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <LatestProducts/>
                </aside>
                <div id="content" className="col-md-9 col-sm-8">
                    <div className="product-category">
                        <h3 className="title-category ">{ category.name }</h3>
                        <ProductList list={ list }/>
                        <div className="pagination-container">
                            <Pagination
                                count={ list.totalPages }
                                variant="outlined"
                                color="primary"
                                onChange={ onChange }
                            />
                        </div>
                    </div>
                </div>
                <div className="short-by-show form-inline text-right col-md-7 col-sm-9 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="input-limit">Show:</label>
                    <select
                      id="input-limit"
                      name="perPage"
                      className="form-control"
                      onChange={(e) => setItemsPerPage(e)}
                      value="0"
                    >
                      <option value="20" selected>
                        20
                      </option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>
            <ProductList list={list} />
            <div className="pagination-container">
              <Pagination
                count={list ? list.totalPages : 0}
                variant="outlined"
                color="primary"
                onChange={onChange}
              />
            </div>

    </Fragment>
  );
};

export default CategoryPage;
