import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/shipping.css";
import { CheckOutSteps, Header } from "../../components";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import { Paper } from "@material-ui/core";

export default function ShippingAddress(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <React.Fragment>
      <Header />

      <div>
        <CheckOutSteps step1 step2 />
        <Paper className="shipping_details">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>Shipping Address</h1>
            </div>
            <div>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Continue
              </button>
            </div>
          </form>
        </Paper>
      </div>
    </React.Fragment>
  );
}
