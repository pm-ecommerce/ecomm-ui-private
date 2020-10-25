import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Main";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51HfWSjLIEKOZlioqQbdf9QWr2N4T9qRkuqhU4cWcUT2kFJI1gHuwxGwlrLP41qnLVCMDHF1l7J3ZZIaDap9DhXtv00znGjZQYl");

function App() {
  return (
    <div className="App">
      <Header />
      <Elements stripe={stripePromise}>
        <Body />
      </Elements>
    </div>
  );
}

export default App;
