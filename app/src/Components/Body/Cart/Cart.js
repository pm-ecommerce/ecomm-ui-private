import React, {useState, useEffect} from 'react';
import './Cart.css';
import Img from './img.png';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/core/styles';
import config from '../../../Config';
import utils from '../../Common/Utils';

const useStyles = makeStyles((theme) => ({
    margin : {
        margin : theme.spacing(1),
    },
    extendedIcon : {
        marginRight : theme.spacing(1),
    },
}));

const Cart = () => {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [sessionId, setSessionId] = useState();

    const onClick = (cartItemId) => {
        fetch(`${ config.cartUrl }/api/cart/${ sessionId }/${ cartItemId }`, {
            method : 'DELETE'
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setItems(prevState => prevState.filter(item => item.id !== cartItemId));
                }
            })
            .catch((err) => console.log(err));
    };

    const updateQuantity = (e, item) => {
        item.quantity = e.target.value;
        console.log(item);
        return e.target.value;
    };

    useEffect(() => {
        const {sessionId} = JSON.parse(localStorage.getItem('cart'));
        setSessionId(sessionId);
        fetch(`${ config.cartUrl }/api/cart/${ sessionId }`)
            .then((res) => res.json())
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="cart-page-container">
            <div className="cart-items">
                <h2>Shopping Cart</h2>
                <div className="cart-table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { items.map((item) => (
                            <tr key={ item.id }>
                                <td>
                                    <img src={ Img } className="cart-item-img"/>
                                </td>
                                <td className="text-field-left">
                                    <p>{ item.name }</p>
                                    <p>{ utils.getCustomization(item.cartItemAttributes) }</p>
                                </td>
                                <td className="text-field-right">
                                    <input type="number" min="1" max="100" name={ `quantity-${ item.id }` }
                                           onChange={ (e) => updateQuantity(e, item) }
                                           value={ item.quantity } className="form-control"/>
                                </td>
                                <td className="text-field-right">${ item.rate }</td>
                                <td className="text-field-right">${ item.rate * item.quantity }</td>
                                <td className="text-field-right" style={ {textAlign : 'center'} }>
                                    <div>
                                        <IconButton
                                            aria-label="delete"
                                            className={ classes.margin }
                                            onClick={ () => onClick(item.id) }
                                        >
                                            <DeleteIcon fontSize="large"/>
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
                <Link to={ {pathname : '/checkout'} }>
                    <Button
                        variant="outlined"
                        style={ {
                            backgroundColor : '#337ab7',
                            color : 'white',
                            border : 'none',
                            float : 'right',
                        } }
                    >
                        Continue
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
