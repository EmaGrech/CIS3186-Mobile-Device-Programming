import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function App() {

  const [amountToCharge, setAmountToCharge] = useState("1")
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    console.log("amount to charge: ", amount)

    setAmountToCharge(amount || "2")
  }, []);


  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amountToCharge,
          },
        },
      ],
    });
  }
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
}
function _onError(err) {
    console.log(err);
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
}
  return (
    <div className="App">
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onCancel={() => _onError("Canceled")}
        onError={(err) => _onError(err)}
      />
    </div>
  );
}
export default App;