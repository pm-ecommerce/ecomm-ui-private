import React, {useState, useEffect, Fragment} from 'react';
import ProductList from '../ProductList/ProductList';
import Pagination from '@material-ui/lab/Pagination';
import './SearchPage.css';
import config from '../../../Config';

const SearchPage = (props) => {
    const query = new URLSearchParams(props.location.search);
    const categoryId = query.get('categoryId') || 0;
    const searchWord = query.get('query') || '';
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);

    const loadSearch = (page = 1) => {
        const url = new URL(`${ config.baseUrl }/pm-search/api/search`);
        const params = {
            limit : 20,
            page
        };
        if (searchWord.length > 0) {
            params.name = searchWord;
        }
        if (categoryId > 0) {
            params.categoryId = categoryId;
        }

        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => console.log(err));
    };

    const onChange = (e, p) => {
        if (p !== page && p > 0 && p <= list.totalPages) {
            setPage(p);
        }
    };

    useEffect(() => {
        loadSearch(page);
    }, []);

    return (
        <div id="content">
            <div className="row">
                <div className="product-list-container">
                    <div className="module">
                        <h3 className="modtitle">
                            <span>Showing search results for { searchWord }</span>
                        </h3>
                    </div>
                    <ProductList list={ list }/>
                </div>
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
    );
};

export default SearchPage;
