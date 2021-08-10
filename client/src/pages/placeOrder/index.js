import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CheckOutSteps,
  Header,
  LoadingBox,
  MessageBox,
} from "../../components";
import "./styles/placeholder.css";
import { createOrder } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";

export default function PlaceOrder(props) {
  const dispatch = useDispatch();
  //SIGNIN STATE
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  //CART STATE
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  //ORDER-CREATE STATE
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  //CART PRICE CALCULATIONS, THEN ASSIGNED TO CART
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(10) : toPrice(0);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    // TODO: dispatch create order action, (pass-in ...cart renaming the cart.cartItems props to orderItems)
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <React.Fragment>
      <Header />
      <CheckOutSteps step1 step2 step3 step4 />

      <section className="placeholder-section">
        <div className="first-container">
          <div className="delivery-container">
            <div className="delivery-section">
              <div className="delivery-section-title">
                <svg
                  height="20"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="delivery"
                  class=""
                  name="delivery"
                >
                  <path
                    d="M9.225 0H9.22a.375.375 0 0 0-.038.008.375.375 0 0 0-.092.027L.317 3.838A.383.383 0 0 0 0 4.221v11.54a.39.39 0 0 0 .007.078c.023.13.11.24.23.29l8.852 3.838a.375.375 0 0 0 .178.03h.024a.375.375 0 0 0 .112-.028l4.813-2.087a4.138 4.138 0 0 0 6.564.88c1.627-1.649 1.626-4.334 0-5.984a4.126 4.126 0 0 0-2.288-1.18V4.226a.383.383 0 0 0-.321-.385L9.403.038a.375.375 0 0 0-.11-.028h-.068V0zm.021.802l1.86.805-7.882 3.418a.376.376 0 0 0-.022.01l-1.86-.806L9.246.802zm2.824 1.224l2.257.98-8.03 3.48a.386.386 0 0 0-.228.47v4.079l-.822-1.25a.376.376 0 0 0-.486-.13l-.968.49v-4.53l8.277-3.589zm3.219 1.396l1.86.807-7.903 3.428-1.86-.807 7.882-3.418a.378.378 0 0 0 .02-.01zM.759 4.813l2.276.987v4.967c0 .134.068.257.18.327.11.07.25.077.368.017l1.218-.617 1.311 1.993a.378.378 0 0 0 .556.14.387.387 0 0 0 .16-.365V7.446l2.039.883v10.703L.759 15.516V4.813zm16.974 0v6.728a4.13 4.13 0 0 0-2.856 1.232 4.22 4.22 0 0 0-1.112 2.043h-.003l-.93.404-2.212.958a.387.387 0 0 0-.079.661c.108.083.252.1.376.047l2.213-.96.529-.229c-.008.5.074 1.002.24 1.479l-4.274 1.853V8.326l8.108-3.515v.002zm.095 7.49c.874 0 1.747.338 2.416 1.017a3.494 3.494 0 0 1 0 4.9 3.378 3.378 0 0 1-4.831 0 3.49 3.49 0 0 1 0-4.897 3.382 3.382 0 0 1 2.415-1.017v-.003zm0 .772c-1.131 0-2.047.959-2.047 2.12 0 .705.473 1.4.903 2.02.431.62.86 1.113.86 1.113a.377.377 0 0 0 .569 0s.428-.493.86-1.113c.43-.62.903-1.315.903-2.02 0-1.161-.916-2.12-2.048-2.12zm-4.86.578a.375.375 0 0 0-.136.033l-2.212.96a.387.387 0 0 0-.08.663c.108.082.253.1.377.045l2.213-.96a.386.386 0 0 0-.162-.74zm4.86.19c.711 0 1.29.596 1.29 1.351 0 .253-.363.997-.767 1.578-.26.375-.37.494-.523.679-.152-.185-.263-.303-.524-.68-.404-.58-.765-1.324-.765-1.577 0-.755.578-1.35 1.29-1.35zm0 .77c-.21 0-.38.172-.38.385 0 .212.17.384.38.384s.38-.172.38-.384a.382.382 0 0 0-.38-.385z"
                    fill="#4A4A4A"
                    fill-rule="nonzero"
                  ></path>
                </svg>
                <h1>Delivery Details</h1>
              </div>

              <div className="box-container">
                <div className="box">
                  <div className="box-1">
                    <div className="box-div1">
                      <svg
                        height="17"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="home-location"
                        class=""
                        name="home-location"
                      >
                        <path
                          d="M12.152 4.824l2.731 2.602c.11.106.147.27.092.415a.377.377 0 0 1-.344.244H12.89v5.519a.38.38 0 0 1-.377.382h-2.98a.38.38 0 0 1-.378-.382.38.38 0 0 1 .377-.383h2.605V7.702a.38.38 0 0 1 .376-.382h1.162l-2.156-2.064a.385.385 0 0 1-.12-.279V2.514h-.855v.933c0 .153-.09.292-.228.353a.373.373 0 0 1-.408-.074L8 1.906 2.326 7.32h1.153a.38.38 0 0 1 .376.382.38.38 0 0 1-.376.383h-2.11a.377.377 0 0 1-.344-.244.387.387 0 0 1 .092-.415l6.625-6.323a.373.373 0 0 1 .516 0l1.531 1.46v-.431a.38.38 0 0 1 .377-.383h1.602a.374.374 0 0 1 .271.11c.072.071.113.17.113.273v2.692zM5.718 8.223c1.646.001 2.98 1.356 2.98 3.028 0 1.88-1.452 3.603-2.306 4.469a.95.95 0 0 1-1.347 0c-.853-.857-2.288-2.566-2.306-4.437-.005-1.604 1.211-2.94 2.786-3.06h.193zm.15 6.944h-.005c.63-.624 2.081-2.255 2.081-3.916-.002-1.245-.995-2.255-2.221-2.259h-.151c-1.171.098-2.073 1.09-2.075 2.283.016 1.656 1.46 3.28 2.081 3.892.082.08.21.08.29 0zm.831-4.916c.54.55.54 1.44 0 1.99a1.371 1.371 0 0 1-1.511.306 1.408 1.408 0 0 1-.856-1.301c0-.57.338-1.083.856-1.3a1.371 1.371 0 0 1 1.511.305zm-.533 1.459a.649.649 0 0 0 0-.918.628.628 0 0 0-.895.004.651.651 0 0 0 0 .909.628.628 0 0 0 .895.005z"
                          fill="#9B9B9B"
                          fill-rule="nonzero"
                          opacity=".6"
                          stroke="#9B9B9B"
                          stroke-width=".3"
                        ></path>
                      </svg>
                      <p>
                        Hi <span>{cart.shippingAddress.fullName}</span>, Your
                        item(s) should be delivered to you in about 5 working
                        days.
                      </p>
                    </div>

                    <div className="box-div2">
                      <p>
                        {cart.shippingAddress.address},{" "}
                        {cart.shippingAddress.city},{" "}
                        {cart.shippingAddress.postalCode},{" "}
                        {cart.shippingAddress.country}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="delivery-section">
              <div className="delivery-section-title">
                <svg
                  height="20"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fill-rule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h1>Payment Method</h1>
              </div>

              <div className="box-container">
                <div className="box">
                  <div className="box-1">
                    <div className="box-div1">
                      <svg
                        height="17"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="home-location"
                        class=""
                        name="home-location"
                      >
                        <path
                          d="M12.152 4.824l2.731 2.602c.11.106.147.27.092.415a.377.377 0 0 1-.344.244H12.89v5.519a.38.38 0 0 1-.377.382h-2.98a.38.38 0 0 1-.378-.382.38.38 0 0 1 .377-.383h2.605V7.702a.38.38 0 0 1 .376-.382h1.162l-2.156-2.064a.385.385 0 0 1-.12-.279V2.514h-.855v.933c0 .153-.09.292-.228.353a.373.373 0 0 1-.408-.074L8 1.906 2.326 7.32h1.153a.38.38 0 0 1 .376.382.38.38 0 0 1-.376.383h-2.11a.377.377 0 0 1-.344-.244.387.387 0 0 1 .092-.415l6.625-6.323a.373.373 0 0 1 .516 0l1.531 1.46v-.431a.38.38 0 0 1 .377-.383h1.602a.374.374 0 0 1 .271.11c.072.071.113.17.113.273v2.692zM5.718 8.223c1.646.001 2.98 1.356 2.98 3.028 0 1.88-1.452 3.603-2.306 4.469a.95.95 0 0 1-1.347 0c-.853-.857-2.288-2.566-2.306-4.437-.005-1.604 1.211-2.94 2.786-3.06h.193zm.15 6.944h-.005c.63-.624 2.081-2.255 2.081-3.916-.002-1.245-.995-2.255-2.221-2.259h-.151c-1.171.098-2.073 1.09-2.075 2.283.016 1.656 1.46 3.28 2.081 3.892.082.08.21.08.29 0zm.831-4.916c.54.55.54 1.44 0 1.99a1.371 1.371 0 0 1-1.511.306 1.408 1.408 0 0 1-.856-1.301c0-.57.338-1.083.856-1.3a1.371 1.371 0 0 1 1.511.305zm-.533 1.459a.649.649 0 0 0 0-.918.628.628 0 0 0-.895.004.651.651 0 0 0 0 .909.628.628 0 0 0 .895.005z"
                          fill="#9B9B9B"
                          fill-rule="nonzero"
                          opacity=".6"
                          stroke="#9B9B9B"
                          stroke-width=".3"
                        ></path>
                      </svg>
                      <p>
                        You selected {cart.paymentMethod} as your payment
                        method.
                      </p>
                    </div>

                    <div className="box-div2">
                      <p>
                        Items will be delivered conveniently for you at the
                        specified address. No Stress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-container placeholder">
            <div className="cart-title">
              <svg
                height="20"
                width="21"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="order-review"
                class=""
                name="order-review"
              >
                <path
                  d="M17.274 2.417V.647A.653.653 0 0 0 16.615 0H.66A.653.653 0 0 0 0 .647v14.468c0 .358.295.648.659.648h9.623c.537 2.53 2.843 4.315 5.47 4.234 2.628-.08 4.817-2.004 5.192-4.561.375-2.558-1.173-5.01-3.67-5.817V2.417zM1.317 1.295h14.64v1.122H1.317V1.295zm18.37 13.378c0 1.63-.998 3.1-2.529 3.723a4.15 4.15 0 0 1-4.467-.872 3.979 3.979 0 0 1-.89-4.39c.635-1.506 2.13-2.488 3.787-2.488 2.263.003 4.096 1.805 4.099 4.029v-.002zm-3.732-5.308c-.123 0-.246-.013-.37-.013a5.46 5.46 0 0 0-2.359.533h-4.83v1.294h3.113a5.248 5.248 0 0 0-1.33 3.289H1.317V3.71h14.64l-.002 5.654zM8.41 5.73v1.295h6.708V5.73H8.41zm-2.033-.25L5.673 4.8 4.062 6.416l-.825-.798-.694.692 1.532 1.48 2.302-2.308zm-.383 3.412L4.817 10.05 3.642 8.893l-.66.649 1.178 1.157-1.178 1.155.66.649 1.175-1.158 1.177 1.158.66-.649L5.477 10.7l1.177-1.157-.66-.649zm8.936 2.977h1.317v3.67H14.93v-3.67zm0 4.315h1.317v1.513H14.93v-1.513z"
                  fill="#4A4A4A"
                  fill-rule="nonzero"
                ></path>
              </svg>
              <h1>Review Cart</h1>
            </div>

            {cart.cartItems.map((item) => (
              <div className="cart-item placeholder" key={item.product}>
                <div className="cart-item-first">
                  <Link to={`/product/${item.product}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="item-name">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                </div>

                <div className="cart-item-second">
                  <div className="item-price placeholder">
                    <p>
                      ${item.price} x {item.qty}{" "}
                      {item.qty > 1 ? "items" : "item"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="second-container">
          <div className="cart-card-container placeholder">
            <div className="cart-card-title">
              <svg
                height="20"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="payment"
                class=""
                name="payment"
              >
                <path
                  d="M8.046 4.814a4.335 4.335 0 0 0-3.04.787L.667 8.71C.33 8.954.126 9.343.12 9.76L0 18.723a1.235 1.235 0 0 0 1.222 1.243l2.87.035h.135a11.156 11.156 0 0 0 4.53-.967 7.892 7.892 0 0 0 2.297-1.584c.38-.373.803-.7 1.26-.975l5.046-3.037a2.317 2.317 0 0 0 1.02-2.71 2.294 2.294 0 0 0-2.982-1.4l-5.852 2.192a.732.732 0 0 1-.255.045.74.74 0 0 1-.572-.283.788.788 0 0 1-.148-.507l.039-5.33a.632.632 0 0 0-.564-.63zm1.199 8.008c.249.004.496-.04.73-.126h.017l5.852-2.19a1.037 1.037 0 0 1 1.342.638c.144.47-.056.978-.484 1.225l-5.044 3.037a8.078 8.078 0 0 0-1.495 1.157 6.634 6.634 0 0 1-1.933 1.331 9.865 9.865 0 0 1-4.128.856l-2.826-.046.112-8.93c0-.017.008-.034.023-.045l4.337-3.108a3.058 3.058 0 0 1 1.584-.57l-.059 4.708c-.013.467.136.925.42 1.296.374.476.944.758 1.552.767zm2.936 6.89l.003.02a.64.64 0 0 1-.7-.571.637.637 0 0 1 .575-.695.855.855 0 0 0 .64-.397.637.637 0 0 1 1.11.068.853.853 0 0 0 1.604-.157.639.639 0 0 1 1.077-.28c.237.255.608.34.934.213a.843.843 0 0 0 .54-.786l-.211-2.126a.628.628 0 0 1 .25-.598.64.64 0 0 1 .65-.064.63.63 0 0 1 .362.538l.215 2.157v.053a2.099 2.099 0 0 1-.942 1.779 2.134 2.134 0 0 1-2.018.182 2.13 2.13 0 0 1-1.48.823h-.206a2.137 2.137 0 0 1-1.408-.521 2.11 2.11 0 0 1-.995.361zM22.99 0a2.013 2.013 0 0 1 1.422.582c.377.374.589.881.588 1.41v9.112c0 .528-.212 1.034-.588 1.407a2.013 2.013 0 0 1-1.42.582h-2.67a.635.635 0 0 1-.638-.633c0-.35.285-.633.637-.633h2.671a.732.732 0 0 0 .732-.726v-6.48H11.196v3.997c0 .35-.285.633-.637.633a.635.635 0 0 1-.638-.633V1.987A1.997 1.997 0 0 1 11.924 0H22.99zM11.19 3.364h12.533V1.987a.732.732 0 0 0-.734-.727H11.924a.732.732 0 0 0-.733.727v1.377z"
                  fill="#4A4A4A"
                  fill-rule="nonzero"
                ></path>
              </svg>

              <h4>Checkout Order</h4>
            </div>

            <div className="cart-card-subtotal">
              <span>
                Subtotal ({cart.cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                items):
              </span>
              <span class="amount">${cart.itemsPrice.toFixed(2)}</span>
            </div>

            <div className="cart-card-subtotal">
              <span>Delivery Charges:</span>
              <span class="amount">${cart.shippingPrice.toFixed(2)}</span>
            </div>

            <div className="cart-card-subtotal">
              <span>Tax:</span>
              <span class="amount">${cart.taxPrice.toFixed(2)}</span>
            </div>

            <div className="cart-card-total">
              <span class="amount"> Total: </span>
              <span class="amount">${cart.totalPrice.toFixed(2)}</span>
            </div>

            <div className="cart-card-button">
              <button
                type="button"
                onClick={placeOrderHandler}
                className="primary block"
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
            </div>

            <div className="cart-card-cc">
              <span>We accept:</span>
              <ul>
                <li>
                  <picture>
                    <img
                      data-expand="100"
                      data-src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/mastercard.png"
                      alt="mastercard"
                      src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/mastercard.png"
                    />
                  </picture>
                </li>

                <li>
                  <picture>
                    <img
                      data-expand="100"
                      data-src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/visacard.png"
                      alt="visa"
                      src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/visacard.png"
                    />
                  </picture>
                </li>

                <li>
                  <picture>
                    <img
                      data-expand="100"
                      data-src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/vervecard.png"
                      alt="verve"
                      src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/vervecard.png"
                    />
                  </picture>
                </li>
              </ul>
            </div>

            <div className="cart-card-security">
              <picture>
                <img
                  data-expand="100"
                  data-src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/secure.png"
                  alt="Safe and Secure."
                  src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/secure.png"
                />
              </picture>
              <span> Transactions are 100% Safe and Secure </span>
            </div>

            {loading && (
              <div className="cart-card-button">
                <LoadingBox />
              </div>
            )}

            {error && (
              <div className="cart-card-button">
                <MessageBox variant="danger" error={error} />
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
