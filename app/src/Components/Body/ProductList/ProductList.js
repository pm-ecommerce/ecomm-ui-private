import React from 'react';
import './ProductList.css';
import {makeStyles} from '@material-ui/core/styles';
import config from '../../../Config';

const useStyles = makeStyles({
    root : {
        minWidth : 200,
        maxWidth : '22%',
        marginRight : 15,
        marginTop : 15,
        marginBottom : 15,
        marginLeft : 0,
    },
    media : {
        height : 200,
    },
    img : {
        maxWidth : 270
    }
});

const ProductList = (props) => {
    const getUrl = (prod) => {
        if (!prod.images || prod.images.length === 0) {
            return '/image/catalog/demo/product/270/10.jpg';
        }

        return `${ config.imageUrl }${ prod.images[0].name }`;
    };

    const addToCart = (product) => {
        console.log(product);
    };

    return (
        <div className="products-list row nopadding-xs so-filter-gird grid">
            { props.list && props.list.data
                ? props.list.data.map((product, index) => (
                    <div className="product-layout col-lg-15 col-md-4 col-sm-6 col-xs-12">
                        <div className="product-item-container">
                            <div className="left-block">
                                <div className="product-image-container second_img">
                                    <a href={ `/products/${ product.slug }` } target="_self" title={ product.name }>
                                        <img src={ getUrl(product) }
                                             className="img-1 img-responsive" alt={ product.name }/>
                                        <img src={ getUrl(product) }
                                             className="img-2 img-responsive" alt={ product.name }/>
                                    </a>
                                </div>
                                <div className="button-group so-quickview cartinfo--left">
                                    <button type="button" className="addToCart btn-button" title="Add to cart"
                                            onClick={ addToCart(product) }>
                                        <i className="fa fa-shopping-basket"></i>
                                        <span>Add to cart </span>
                                    </button>
                                </div>
                            </div>
                            <div className="right-block">
                                <div className="caption">
                                    <h4>
                                        <a href={ `/products/${ product.slug }` } title={ product.name } target="_self">
                                            { product.name }
                                        </a>
                                    </h4>
                                    <div className="price">
                                        <span className="price-new">$ { product.price }</span>
                                    </div>
                                    <div className="list-block hidden">
                                        <button className="addToCart btn-button" type="button" title="Add to Cart"
                                                onClick={ addToCart(product) }>
                                            <i className="fa fa-shopping-basket"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : '' }
        </div>
    );
};

export default ProductList;
