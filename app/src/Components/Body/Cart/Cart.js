import React, { useState, useEffect } from "react";
import "./Cart.css";
import Img from "./img.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../../Config";
import utils from "../../Common/Utils";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../actions/index";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Cart = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [sessionId, setSessionId] = useState();

  const onSubmit = async () => {
    const fetches = [];

    items.forEach((item) => {
      fetches.push(
        fetch(`${config.cartUrl}/api/cart/${sessionId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            return res.status;
          })
          .catch((err) => {
            console.log(err);
            return err;
          })
      );
    });
    Promise.all(fetches).then(function (res) {
      res.forEach((status) => {
        if (status !== 200) {
          console.log("err");
          return;
        }
      });
      props.history.push("/checkout");
    });
  };

  const onClick = (cartItemId) => {
    fetch(`${config.cartUrl}/api/cart/${sessionId}/${cartItemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          updateCartState(JSON.parse(localStorage.getItem("cart")), dispatch);
          setItems((prevState) =>
            prevState.filter((item) => item.id !== cartItemId)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const updateQuantity = (e, item) => {
    const { value } = e.target;
    setItems(
      items.map((it) => {
        if (it.id === item.id) {
          return { ...it, quantity: value };
        }
        return it;
      })
    );
  };

  const onBlur = (e, item) => {
    fetch(`${config.cartUrl}/api/cart/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const { sessionId } = JSON.parse(localStorage.getItem("cart"));
    setSessionId(sessionId);
    fetch(`${config.cartUrl}/api/cart/${sessionId}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
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
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={Img} className="cart-item-img" />
                  </td>
                  <td className="text-field-left">
                    <p>{item.name}</p>
                    <p>{utils.getCustomization(item.cartItemAttributes)}</p>
                  </td>
                  <td className="text-field-right">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      name={`quantity-${item.id}`}
                      onChange={(e) => updateQuantity(e, item)}
                      value={item.quantity}
                      className="form-control"
                      onBlur={(e) => onBlur(e, item)}
                    />
                    {/* <p className="changeAddress" style={{textAlign:'center'}}>
                      Save changes
                    </p> */}
                  </td>
                  <td className="text-field-right">${item.rate}</td>
                  <td className="text-field-right">
                    ${item.rate * item.quantity}
                  </td>
                  <td
                    className="text-field-right"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => onClick(item.id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#337ab7",
            color: "white",
            border: "none",
            float: "right",
          }}
          onClick={onSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Cart;
