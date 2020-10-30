import React from "react";
import "./Cart.css";
import Img from "./img.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="cart-page-container">
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        <div className="cart-table-container">
          <table>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
            <tr>
              <td>
                <img src={Img} className="cart-item-img" />
              </td>
              <td className="text-field-left">Hello</td>
              <td className="text-field-right">1</td>
              <td className="text-field-right">$120.00</td>
              <td className="text-field-right">$120.00</td>
            </tr>
          </table>
        </div>
        <Link to={{pathname:'/checkout'}}>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#337ab7",
              color: "white",
              border: "none",
              float: "right",
            }}
          >
            Check Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
