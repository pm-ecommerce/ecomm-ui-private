import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../Config";
import Button from "@material-ui/core/Button";

import "./UserDashBoard.css";

const UserDashBoard = () => {
  const user = useSelector((state) => state.userInfo);
  const [completeOrders, setCompleteOrders] = useState({ data: [] });
  const [activeOrders, setActiveOrders] = useState({ data: [] });
  const [orders, setOrders] = useState({ data: [] });
  const [tab, setTab] = useState(true);

  const getImage = (orderItem) => {
    if (!orderItem || !orderItem.image) {
      return "https://place-hold.it/80x80";
    }

    return `${config.imageUrl}${orderItem.image}`;
  };

  const getUserInfo = () => {
    try {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).id;
      }
      return JSON.parse(localStorage.getItem("cart")).userId;
    } catch (e) {}
    return 0;
  };

  useEffect(() => {
    const userInfo = { id: getUserInfo() };
    console.log(userInfo);
    fetch(`${config.orderUrl}/api/orders/users/${userInfo.id}/complete`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCompleteOrders(res.data);
        }
      })
      .catch((err) => console.log(err));

    fetch(`${config.orderUrl}/api/orders/users/${userInfo.id}/active`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setActiveOrders(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const getOrderTotal = (order) => {
    const total = (order.items || []).reduce(
      (sum, row) => sum + row.quantity * row.rate,
      0
    );
    return (total + total * 0.07).toFixed(2);
  };

  const changeTab = (name) => {
    if(name === 'active') {
        setTab(true);
        setOrders(activeOrders);
    } else {
        setTab(false);
        setOrders(completeOrders);
    }
  }

  const formatDate = (date) => {
    if (!Date.parse(date)) {
      return "";
    }
    const obj = new Date(date);

    const mm = obj.getMonth() + 1;
    const dd = obj.getDate();
    const yy = obj.getFullYear();

    return `${mm < 10 ? "0" + mm : mm}/${dd < 10 ? "0" + dd : dd}/${yy}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <Button
          variant="outlined"
          style={{
            backgroundColor: (tab === true) ? "#ff3c20":'white',
            color: (tab === true) ? "white":'blue',
            border: "none",
            fontSize: 14,
            marginTop: 30,
            marginRight: 3

          }}
          onClick={() => changeTab('active')}
        >
          Active Orders
        </Button>
        <Button
          variant="outlined"
          style={{
            backgroundColor: (tab === false) ? "#ff3c20":'white',
            color: (tab === false) ? "white":'blue',
            border: "none",
            fontSize: 14,
            marginTop: 30,
          }}
          onClick={() => changeTab('complete')}
        >
          Complete Orders
        </Button>
        <div className="well" style={{ border: "none" }}>
          {orders.data.map((order) => {
            return (
              <Fragment>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Address</th>
                      <th>Total</th>
                      <th>Delivery Date</th>
                      <th>Delivered by</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.status}</td>
                      <td className="text-left" style={{ textAlign: "left" }}>
                        {order.address.address1}, {order.address.address2}{" "}
                        <br />
                        {order.address.city}, {order.address.zipcode} <br />
                        {order.address.state}, {order.address.country}
                      </td>
                      <td>${getOrderTotal(order)}</td>
                      <td>{formatDate(order.deliveryDate)}</td>
                      <td>{order.vendor.name}</td>
                    </tr>
                    <tr>
                      <td colSpan="5">
                        <table className="dashboard-table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product</th>
                              <th>Rate</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(order.items || []).map((item) => (
                              <tr>
                                <td>
                                  <img
                                    src={getImage(item)}
                                    className="cart-item-img"
                                    style={{ width: 80 }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>${item.rate}</td>
                                <td>{item.quantity}</td>
                                <td>
                                  ${(item.rate * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
