import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Main";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("sk_test_51HfWSjLIEKOZlioqUhvNCD8NsAHgoe7zKES0ki8JYwXATcBuHUDgw8XTV96TmrFN8Z0IJnvrJ9pttxOZbaYboA2T00yp29ot3E");

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
