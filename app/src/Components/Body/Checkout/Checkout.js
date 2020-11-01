import React, {useState, useEffect} from 'react';
import './Checkout.css';
import MuiAlert from '@material-ui/lab/Alert';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Img from './img.png';
import config from '../../../Config';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import utils from '../../Common/Utils';

const CARD_ELEMENT_OPTIONS = {
    iconStyle : 'solid',
    hidePostalCode : true,
    style : {
        base : {
            iconColor : 'rgb(240, 57, 122)',
            color : 'rgb(240, 57, 122)',
            fontSize : '16px',
            fontFamily : '"Open Sans", sans-serif',
            fontSmoothing : 'antialiased',
            '::placeholder' : {
                color : '#CFD7DF',
            },
        },
        invalid : {
            color : '#e5424d',
            ':focus' : {
                color : '#303238',
            },
        },
    },
};

function CardSection() {
    return <CardElement options={ CARD_ELEMENT_OPTIONS }/>;
}

function Alert(props) {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const Checkout = () => {
    const shippingAddress = [
        {name : 'Middle Field', id : 1},
        {name : 'Fairfield', id : 2},
    ];

    const getCurrentUser = () => {
        try {
            return JSON.parse(localStorage.getItem('cart'));
        } catch (e) {
            return {};
        }
    };

    const stripe = useStripe();
    const elements = useElements();
    const [items, setItems] = useState([]);
    const [cards, setCards] = useState([]);
    const [address, setAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState(getCurrentUser());
    const [selectedCards, setSelectedCards] = useState({});
    const [guest, setGuest] = useState({});

    const [newAddress, setNewAddress] = useState({});
    const [addNewCard, setAddNewCard] = useState(false);
    const [changeAddress, setChangeAddress] = useState(false);
    const [changeSelectedAddress, setChangeSelectedAddress] = useState(0);
    const [addNewAddress, setAddNewAddress] = useState(false);

    const [order, setOrder] = useState({
        shippingAddressId : '1',
        billingAddressId : '1',
        sessionId : null,
        charges : [],
    });

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setOrder((prevState) => ({...prevState, shippingAddressId : value}));
    };

    const handlePaymentAmount = (e, cardId) => {
        const amount = e.target.value;
        setOrder(prevState => {
            if (prevState.charges.some((charge) => charge.cardId === cardId) === false) {
                return {...prevState, charges : [...prevState.charges, {cardId : cardId, amount : amount}]};
            } else {
                const newCharges = prevState.charges.map((charge) => {
                    console.log(charge.cardId, cardId, charge, amount);
                    if (charge.cardId === cardId) {
                        return {...charge, amount : amount};
                    }
                    return charge;
                });
                return {...prevState, charges : newCharges};
            }
        });
    };

    const getSubTotal = () => {
        return items.map(item => item.rate * item.quantity).reduce((sum, row) => sum + row, 0);
    };

    const getTax = () => {
        return (getSubTotal() * 7) / 100;
    };

    const getShipping = () => {
        return 0.00;
    };

    const getCartTotal = () => {
        return getSubTotal() + getTax();
    };


    const onChange = (e, card) => {
        const checked = e.target.checked;
        const currentTotal = getCartTotal();

        if (checked === true) {
            const totalCards = Object.values(selectedCards).length + 1;
            selectedCards[card.id] = {
                cardId : card.id,
                amount : currentTotal / totalCards
            };
            for (const key in selectedCards) {
                selectedCards[key].amount = currentTotal / totalCards;
            }
        } else {
            delete selectedCards[card.id];

            const totalCards = Object.values(selectedCards).length;
            for (const key in selectedCards) {
                selectedCards[key].amount = currentTotal / totalCards;
            }
        }
        setSelectedCards(selectedCards);
    };

    const placeOrder = (e) => {
        const payload = order;
        payload.charges = Object.values(selectedCards);
        payload.shippingAddressId = address.id;
        payload.billingAddressId = address.id;
        fetch(`${ config.orderUrl }/api/orders`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const addANewCard = () => {
        setAddNewCard(true);
    };

    const onAddNewAddress = () => {
        setAddNewAddress(true);
    };

    const onAddAddressChange = (event) => {
        const {name, value} = event.target;
        newAddress[name] = value;
        setNewAddress(newAddress);
    };

    const onChangeAddress = () => {
        setChangeAddress(true);
        setChangeSelectedAddress(address.id);
    };

    const onChangeAddressSelected = (event) => {
        console.log(event.target);
        setChangeSelectedAddress(event.target.value);
    };

    const onSaveAddress = async () => {
        try {
            const res = await fetch(`${ config.cartUrl }/api/addresses/${ user.userId }`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(newAddress),
            });
            const response = await res.json();
            if (response.status !== 200) {
                throw new Error(response.message);
            }

            addresses.push(response.data);
            setAddresses(addresses);
            setAddNewAddress(false);
            setNewAddress({});
        } catch (e) {
            console.log(e);
        }
    };

    const saveCard = async () => {
        try {
            const cardElement = elements.getElement(CardElement);
            const {error, token} = await stripe.createToken(cardElement);
            if (error) {
                //show some error message here
                throw  new Error(error.message);
            }

            const res = await fetch(`${ config.cartUrl }/api/card/${ user.userId }`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    token : token.id,
                    brand : token.card.brand,
                    expMonth : token.card.exp_month,
                    expYear : token.card.exp_year,
                    cardId : token.card.id, // card id
                    last4 : token.card.last4,
                    livemode : false,
                }),
            });
            const response = await res.json();
            if (response.status !== 200) {
                throw  new Error(response.message);
            }

            const card = response.data;
            const currentCards = cards;
            currentCards.unshift(card);
            setCards(currentCards);
            setAddNewCard(false);
        } catch (e) {
            setAddNewCard(false);
        }
    };

    const getImage = (cartItem) => {
        if (!cartItem || !cartItem.image) {
            return 'https://place-hold.it/80x80';
        }

        return `${ config.imageUrl }${ cartItem.image }`;
    };

    const onGuestInformationChange = (event) => {
        const {name, value} = event.target;
        guest[name] = value;
        setGuest(guest);
    };

    const updateCurrentCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartOwner = async (userDetails) => {
        const url = `${ config.cartUrl }/api/cart/${ user.sessionId }/user`;
        const res = await fetch(url, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({userId : userDetails.id})
        });
        const result = await res.json();
        if (result.status === 200) {
            updateCurrentCart(result.data);
        }

        localStorage.setItem('cart', JSON.stringify(result.data));
        setUser(result.data);
    };

    const saveGuest = async () => {
        try {
            if (!guest.name) {
                throw new Error('Please enter your name');
            }
            if (!guest.email) {
                throw new Error('Please enter your email');
            }
            const res = await fetch(`${ config.authUrl }/api/users/guests`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(guest),
            });
            const response = await res.json();
            if (response.status !== 200) {
                throw new Error(response.message);
            }

            //change the ownership of the cart to new userId
            await updateCartOwner(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (e) {
            console.log(e);
        }
    };

    const fetchCards = () => {
        fetch(`${ config.cartUrl }/api/card/${ user.userId }`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCards(res.data);
            })
            .catch((err) => console.log(err));
    };

    const fetchAddresses = () => {
        fetch(`${ config.cartUrl }/api/addresses/${ user.userId }`)
            .then((res) => res.json())
            .then((res) => {
                setAddresses(res.data);
                if (res.data.length > 0) {
                    setAddress(res.data[0]);
                } else {
                    // show add address form
                    onAddNewAddress();
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const {sessionId} = JSON.parse(localStorage.getItem('cart'));
        setOrder((prevState) => ({...prevState, sessionId : sessionId}));
        fetch(`${ config.cartUrl }/api/cart/${ sessionId }`)
            .then((res) => res.json())
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => console.log(err));

        if (user.userId) {
            fetchCards();
            fetchAddresses();
        }
    }, []);

    return (
        !user.userId ?
            <div>
                //ask for user's name and email
                // put a button that says checkout as a guest
                // when the user fills in the information and click continue
                // make an api request to 8081/api/users/guests
                // with payload (name, email)
                // this api will create a new with no password (guest)
                // and return a user with (id, name and email)
                <fieldset id="account">
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <div className="form-text-input">
                            <input
                                className={ `form-control` }
                                type="text"
                                name="name"
                                placeholder="Full name"
                                onChange={ onGuestInformationChange }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <div className="form-text-input">
                            <input
                                className={ `form-control` }
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={ onGuestInformationChange }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button
                            variant="outlined"
                            style={ {
                                backgroundColor : '#ff3c20',
                                color : 'white',
                                border : 'none',
                                fontSize : 14,
                                position : 'relative',
                                bottom : 3,
                                float : 'right'
                            } }
                            onClick={ saveGuest }
                        >
                            Checkout as a guest
                        </Button>
                    </div>
                </fieldset>
            </div> :
            <div id="user-register">
                <h2>Check out</h2>
                <p>Please check your order information.</p>
                <fieldset id="address">
                    <legend>Address</legend>
                    {
                        !addNewAddress ?
                            address !== null ?
                                !changeAddress ?
                                    <div className="form-group" style={ {paddingLeft : 15} }>
                                        <div className="form-text-input">
                                            { address.address1 }, { address.address2 } <br/>
                                            { address.city }, { address.zipcode } <br/>
                                            { address.state }, { address.country }<br/>
                                            {
                                                addresses.length === 0 ? null :
                                                    <Link onClick={ e => onChangeAddress() }>change</Link>
                                            }
                                        </div>
                                    </div> :
                                    <div>
                                        {
                                            <RadioGroup name="address" value={ changeSelectedAddress }
                                                        onChange={ onChangeAddressSelected }>
                                                {
                                                    addresses.map(addr => (
                                                        <FormControlLabel value={ addr.id } control={ <Radio/> } label={
                                                            <div className="form-group" style={ {paddingLeft : 15} }>
                                                                <div className="form-text-input">
                                                                    { addr.address1 }, { addr.address2 } <br/>
                                                                    { addr.city }, { addr.zipcode } <br/>
                                                                    { addr.state }, { addr.country }
                                                                    <hr/>
                                                                </div>
                                                            </div>
                                                        }/>
                                                    ))
                                                }
                                            </RadioGroup>
                                        }
                                    </div>
                                : null
                            :
                            <fieldset id="account">
                                <legend>Address information</legend>
                                <div className="form-group">
                                    <label className="control-label">Name</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="name"
                                            placeholder="Full name"
                                            value={ newAddress.name }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Phone</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="phone"
                                            placeholder="Phone number"
                                            value={ newAddress.phone }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Address 1</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="address1"
                                            placeholder="Address 1"
                                            value={ newAddress.address1 }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label optional">Address 2</label>
                                    <div className="form-text-input">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="address2"
                                            placeholder="Address2"
                                            value={ newAddress.address2 }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">City</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={ newAddress.city }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Zip code</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="zipcode"
                                            placeholder="Zip code"
                                            value={ newAddress.zipcode }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">State</label>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control` }
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={ newAddress.state }
                                            onChange={ onAddAddressChange }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Button
                                        variant="outlined"
                                        style={ {
                                            backgroundColor : '#ff3c20',
                                            color : 'white',
                                            border : 'none',
                                            fontSize : 14,
                                            position : 'relative',
                                            bottom : 3,
                                            float : 'right'
                                        } }
                                        onClick={ onSaveAddress }
                                    >
                                        Save address
                                    </Button>
                                </div>
                            </fieldset>

                    }
                    {
                        addNewAddress ? null :
                            <Button
                                variant="outlined"
                                style={ {
                                    backgroundColor : '#ff3c20',
                                    color : 'white',
                                    border : 'none',
                                    fontSize : 14,
                                    position : 'relative',
                                    bottom : 3,
                                } }
                                onClick={ onAddNewAddress }
                            >
                                Add a new address
                            </Button>
                    }
                </fieldset>
                <fieldset id="payment" style={ {marginBottom : 30} }>
                    <legend>Payment methods</legend>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Card information</th>
                            <th>Use card for payment</th>
                            <th>Payment amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        { cards.map((card) => (
                            <tr>
                                <td>
                                    { card.last4 } - expires on { card.expMonth }/{ card.expYear }
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label className="control-label optional">
                                            <Checkbox onChange={ e => onChange(e, card) } value={ card.id }/>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-text-input">
                                        <input
                                            className={ `form-control ` }
                                            type="text"
                                            name="card"
                                            placeholder="Enter an amount to charge"
                                            value={ (selectedCards[card.id] || {}).amount }
                                            onChange={ (e) => handlePaymentAmount(e, card) }
                                        />
                                    </div>
                                </td>
                            </tr>
                        )) }
                        {
                            !addNewCard ? null : (
                                <tr>
                                    <td colSpan="3">
                                        <div className="stripe-input-container" style={ {width : '100%'} }>
                                            <CardSection/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan="3">
                                {
                                    addNewCard ?
                                        <Button
                                            variant="outlined"
                                            style={ {
                                                backgroundColor : '#ff3c20',
                                                color : 'white',
                                                border : 'none',
                                                fontSize : 14,
                                                position : 'relative',
                                                bottom : 3,
                                                float : 'right'
                                            } }
                                            onClick={ saveCard }
                                        >
                                            Save card
                                        </Button> :
                                        <Button
                                            variant="outlined"
                                            style={ {
                                                backgroundColor : '#ff3c20',
                                                color : 'white',
                                                border : 'none',
                                                fontSize : 14,
                                                position : 'relative',
                                                bottom : 3,
                                                float : 'right'
                                            } }
                                            onClick={ addANewCard }
                                        >
                                            Add a new card
                                        </Button>
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
                <fieldset id="payment">
                    <legend>Delivery items</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <table className={ 'table' }>
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                { items.map((item) => (
                                    <tr key={ item.id }>
                                        <td>
                                            <img src={ getImage(item) } className="cart-item-img"/>
                                        </td>
                                        <td className="text-field-left">
                                            <p>{ item.name }</p>
                                            <p>{ utils.getCustomization(item.cartItemAttributes) }</p>
                                        </td>
                                        <td className="text-field-right">{ item.quantity }</td>
                                        <td className="text-field-right">${ item.rate }</td>
                                        <td className="text-field-right">${ item.rate * item.quantity }</td>
                                    </tr>
                                )) }
                                <tr>
                                    <td colSpan={ 4 } className={ 'text-right' }>Sub total</td>
                                    <td className={ 'text-right' }>${ getSubTotal() }</td>
                                </tr>
                                <tr>
                                    <td colSpan={ 4 } className={ 'text-right' }>Tax</td>
                                    <td className={ 'text-right' }>${ getTax() }</td>
                                </tr>
                                <tr>
                                    <td colSpan={ 4 } className={ 'text-right' }>Shipping (free)</td>
                                    <td className={ 'text-right' }>${ getShipping() }</td>
                                </tr>
                                <tr>
                                    <td colSpan={ 4 } className={ 'text-right' }>Order total</td>
                                    <td className={ 'text-right' }>{ getCartTotal() }</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </fieldset>
                <div className="form-btn-container">
                    <Button
                        variant="outlined"
                        style={ {
                            backgroundColor : '#ff3c20',
                            color : 'white',
                            border : 'none',
                            fontSize : 14,
                            position : 'relative',
                            bottom : 3,
                            float : 'right'
                        } }
                        onClick={ placeOrder }
                    >
                        Place order
                    </Button>
                </div>
            </div>

    );
};

export default Checkout;
