import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/cart.css";
import { Header, MessageBox } from "../../components";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    dispatch(addToCart(productId, qty));
    props.history.push("/cart");
  }, [dispatch, productId, props.history, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <React.Fragment>
      <Header />

      <div className="go-back-btn">
        <a href="/" tabindex="0">
          <svg
            height="17"
            viewBox="0 0 19 17"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="back"
            class="e871b_q-0XB"
            name="back"
          >
            <path
              d="M1.262 7.748a1.063 1.063 0 0 0 0 1.504l6.486 6.487a1.06 1.06 0 0 0 1.504 0 1.063 1.063 0 0 0 0-1.505L4.46 9.564h12.61a1.064 1.064 0 0 0 0-2.128l-12.574.086 4.756-4.756A1.063 1.063 0 1 0 7.748 1.26L1.262 7.748z"
              fill="#4A4A4A"
              fill-rule="nonzero"
              stroke="#4A4A4A"
              stroke-width=".1"
            ></path>
          </svg>
          Continue Shopping
        </a>
      </div>
      <section className="cart-section">
        <div className="cart-container">
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

          {cartItems.length === 0 ? (
            <MessageBox error={`Cart is empty.`} />
          ) : (
            cartItems.map((item) => (
              <div className="cart-item">
                <div className="cart-item-first">
                  <Link to={`/product/${item.product}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="item-name">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                </div>

                <div className="cart-item-second">
                  <div className="item-quantity">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="item-price">
                    <p>
                      ${item.price} x {item.qty}{" "}
                      {item.qty > 1 ? "items" : "item"}
                    </p>
                  </div>
                </div>

                <div className="cart-item-third">
                  <button
                    className="remove"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-card-container">
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

            <h4>Checkout Cart</h4>
          </div>

          <div className="cart-card-subtotal">
            <span>
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
            </span>
            <span class="amount">
              ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </span>
          </div>

          <div className="cart-card-tax">
            <span>Delivery Charges:</span>
            <span class="tax">
              Add your Delivery address at shipping to see delivery charges
            </span>
          </div>

          <div className="cart-card-total">
            <span class="amount"> Total: </span>
            <span class="amount">
              ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </span>
          </div>
          <h3 class="delivery-text">Excluding delivery charges</h3>

          <div className="cart-card-button">
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
