import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutSteps, Header } from "../../components";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import "./styles/paymentMethod.css";

export default function PaymentMethod(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <Header />

      <section>
        <CheckOutSteps step1 step2 step3 />
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Payment Method</h1>
          </div>

          <div className="payment">
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          <div className="payment">
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>

          <div>
            <label />
            <button className="primary" type="submit">
              Continue
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
