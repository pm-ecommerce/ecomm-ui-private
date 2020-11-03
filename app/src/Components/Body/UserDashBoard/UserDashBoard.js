import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../Config";

import "./UserDashBoard.css";

const UserDashBoard = () => {
  const user = useSelector((state) => state.userInfo);
  const [completeOrders, setCompleteOrders] = useState([]);
  console.log(user, "user");

  const getImage = (orderItem) => {
    if (!orderItem || !orderItem.image) {
      return "https://place-hold.it/80x80";
    }

    return `${config.imageUrl}${orderItem.image}`;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    fetch(`http://localhost:8085/api/orders/users/${userInfo.id}/complete`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCompleteOrders(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="well">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery Date</th>
                <th>Delivered Date</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delivered</td>
                <td>Middle Field</td>
                <td>$60.00</td>
                <td>11/01/2020</td>
                <td>11/02/2020</td>
                <td>Nike</td>
              </tr>
            </tbody>
          </table>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Rate</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {completeOrders.map((order) => (
                <tr>
                  <td>{order.name}</td>
                  <td>
                    <img src={getImage(order)} className="cart-item-img" />
                  </td>
                  <td>${order.rate}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
