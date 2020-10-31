import React, { useState, useEffect } from "react";
import "./Checkout.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import Img from "./img.png";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

function CardSection() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Checkout = () => {
  // const [disable, setDisable] = useState({});
  const shippingAddress = [
    { name: "Middle Field", id: 1 },
    { name: "Fairfield", id: 2 },
  ];

  const cards = [{ id: 1 }, { id: 2 }];

  const stripe = useStripe();
  const elements = useElements();
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState(true);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [order, setOrder] = useState({
    shippingAddressId: "1",
    billingAddressId: "1",
    sessionId: null,
    charges: [],
  });

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setOrder((prevState) => ({ ...prevState, shippingAddressId: value }));
  };

  const onAddCard = async () => {
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    console.log(token);
    console.log("sending add card");
    fetch(`http://localhost:8084/api/card/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.id,
        brand: token.card.brand,
        expMonth: token.card.exp_month,
        expYear: token.card.exp_year,
        cardId: token.card.id, // card id
        last4: token.card.last4,
        livemode: false,
      }),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  const handlePaymentAmount = (e, cardId) => {
    const amount = e.target.value;
    setOrder(prevState => {
      if(prevState.charges.some((charge) => charge.cardId === cardId) === false) {
        return {...prevState, charges: [...prevState.charges, {cardId:cardId, amount: amount}]}
      } else {
        const newCharges = prevState.charges.map((charge) => {
          console.log(charge.cardId, cardId, charge, amount);
          if(charge.cardId === cardId) {
            return {...charge, amount: amount}
          }
          return charge;
        })
        return {...prevState, charges: newCharges};
      }
    })
  }

  const onChange = (e) => {
    
  };

  const handleSubmit = (e) => {

    console.log(order);

    //Giving Cors error
    fetch("http://localhost:8084/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }) 
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    const { sessionId } = JSON.parse(localStorage.getItem("cart"));
    setOrder((prevState) => ({ ...prevState, sessionId: sessionId }));
    fetch(`http://localhost:8084/api/cart/${sessionId}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));

    //fetching card information but returning "Internal Server Error"
    fetch(`http://localhost:8084/api/card/1`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="user-register">
      <h2>Check out</h2>
      <p>Please check your order information.</p>
      <fieldset id="address">
        <legend>Address</legend>
        <div className="form-group" style={{ paddingLeft: 15 }}>
          <label style={{ float: "left", position: "relative", top: 6 }}>
            Shipping Address
          </label>
          <div className="form-text-input">
            <select
              style={{ width: "88%", position: "relative", top: 5 }}
              onChange={handleAddressChange}
            >
              {shippingAddress.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset id="payment" style={{ marginBottom: 30 }}>
        <legend>Payment methods</legend>
        {cards.map((card) => (
          <div className="form-group">
            <label className="control-label optional">
              <Checkbox onChange={onChange} value={card.id}/>
              Amount
            </label>
            <div className="form-text-input">
              <input
                className={`form-control `}
                type="text"
                name="card1"
                placeholder="Amount"
                // value={vendor.password}
                onChange={(e) => handlePaymentAmount(e, card.id)}
              />
            </div>
          </div>
        ))}
        <div className="form-group" style={{ paddingLeft: 12 }}>
          <label
            className={`control-label optional`}
            style={{ width: "13.666667%" }}
          >
            <Button
              variant="outlined"
              style={{
                backgroundColor: "#ff3c20",
                color: "white",
                border: "none",
                fontSize: 14,
                position: "relative",
                bottom: 3,
              }}
              onClick={onAddCard}
            >
              Add Card
            </Button>
          </label>
          <div className="stripe-input-container" style={{ width: 500 }}>
            <CardSection />
          </div>
          <span
            className="error-span"
            style={{
              // display: inputError.state.error ? "inline" : "none",
              position: "relative",
              left: 180,
            }}
          >
            {/* {inputError.card.text} */}
          </span>
        </div>
      </fieldset>
      <fieldset id="payment">
        <legend>Payment methods</legend>
        <div className="form-group">
          <div className="form-text-input">
            <table>
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
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={Img} className="cart-item-img" />
                    </td>
                    <td className="text-field-left">{item.name}</td>
                    <td className="text-field-right">{item.quantity}</td>
                    <td className="text-field-right">$0.00</td>
                    <td className="text-field-right">$0.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </fieldset>
      <div className="form-btn-container">
        <div className="form-btn btn" onClick={handleSubmit}>
          Continue
        </div>
      </div>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity={popUpMsg.isError ? "error" : "success"}
          onClose={handleClose}
        >
          {popUpMsg.message}
        </Alert>
      </Snackbar> */}
    </div>

    // <div className="checkout-page-container">
    //   <div
    //     className="delivery-method-container checkout-box"
    //     style={{ marginRight: 30 }}
    //   >
    //     <div className="panel-heading">
    //       <h4 className="panel-title">
    //         <i></i>Delivery Method
    //       </h4>
    //     </div>
    //     <div className="panel-body">
    //       <p>
    //         Please select the preferred shipping method to use on this order.
    //       </p>
    //       <div className="radio">
    //         <label>
    //           <input type="radio" checked="checked" name="Free Shipping" /> Free
    //           Shipping - $0.00
    //         </label>
    //       </div>
    //       <div className="radio">
    //         <label>
    //           <input type="radio" checked="checked" name="Flat Shipping Rate" />{" "}
    //           Flat Shipping Rate - $7.50
    //         </label>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="payment-method-container checkout-box">
    //     <Fab color="primary" aria-label="add">
    //       <AddIcon />
    //     </Fab>
    //   </div>
    // </div>
  );
};

export default Checkout;
