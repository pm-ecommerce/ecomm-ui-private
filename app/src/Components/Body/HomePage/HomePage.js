import React, {useState, useEffect, Fragment} from 'react';
import './HomePage.css';
import ProductList from '../ProductList/ProductList';
import CategoryPage from '../CategoryPage/CategoryPage';
import SearchPage from '../SearchPage/SearchPage';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import {Route, Switch} from 'react-router-dom';
import config from '../../../Config';

const url = config.baseUrl;

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const DefaultPage = () => {
    const [sections, setSections] = useState([]);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${ url }/pm-search/api/categories/random`)
            .then((res) => res.json())
            .then((res) => {
                setSections(res.data);
                res.data.forEach((category) => {
                    const name = category.name;
                    fetch(`${ url }/pm-search/api/categories/products/${ category.id }`)
                        .then((res) => res.json())
                        .then((res) => {
                            setProduct(prevState => ({...prevState, [name] : res.data}));
                        })
                        .catch((err) => console.log(err));
                });
            })
            .catch((err) => console.log(err));
        fetch(`${ url }/pm-search/api/products/latest/5`)
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const getUrl = (prod) => {
        if (!prod.images || prod.images.length === 0) {
            return 'https://place-hold.it/80x80';
        }

        return `${ config.imageUrl }${ prod.images[0].name }`;
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 main-left sidebar-offcanvas">
                    <div className="module col1 hidden-sm hidden-xs"></div>
                    <div className="module product-simple">
                        <h3 className="modtitle">
                            <span>Latest products</span>
                        </h3>
                        <div className="modcontent">
                            <div id="so_extra_slider_1" className="extraslider">
                                <div className="yt-content-slider extraslider-inner">
                                    <div className="item">
                                        {
                                            products.map(product => {
                                                return (<div className="product-layout item-inner style1">
                                                    <div className="item-image">
                                                        <div className="item-img-info">
                                                            <a href="#" target="_self" title={ product.name }>
                                                                <img src={ getUrl(product) }
                                                                     alt={ product.name }/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title">
                                                            <a href="#" target="_self" title={ product.name }>
                                                                { product.name }
                                                            </a>
                                                        </div>
                                                        <div className="content_price price">
                                                            <span
                                                                className="price-new product-price">${ product.price } </span>
                                                        </div>
                                                    </div>
                                                </div>);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 col-md-9 col-sm-8 col-xs-12 main-right">
                    <div className="slider-container row">
                        { sections.map((section) => (
                            !product[section.name] || !product[section.name].data || product[section.name].data.length === 0 ? null :
                                <div className="product-list-container" key={ section.name }>
                                    <div className="module">
                                        <h3 className="modtitle">
                                            <span>TRENDING IN { section.name }</span>
                                        </h3>
                                    </div>
                                    <ProductList list={ product[section.name] }/>
                                </div>
                        )) }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const HomePage = (props) => {
    const [categories, setCategories] = useState([]);
    console.log("test");
    useEffect(() => {
        fetch(`${ url }/pm-search/api/categories/`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                const obj = res.data.map((category, index) => ({
                    name : category.name,
                    id : category.id,
                    image : images[index],
                }));
                setCategories(obj);
            })
            .catch((err) => console.log(err));
    }, []);

    const onClick = (id, name) => {
        props.history.push({
            pathname : '/home/category',
            state : {
                id : id,
                name : name
            },
        });
    };

    return (
        <div id="content">
            <Switch>
                <Route exact path="/" component={ DefaultPage }/>
                <Route exact path="/home" component={ DefaultPage }/>
                <Route path="/home/category" component={ CategoryPage }/>
                <Route path="/home/search" component={ SearchPage }/>
                <Route path="/home/product" component={ ProductDetailPage }/>
            </Switch>
        </div>
    );
};

export default HomePage;
