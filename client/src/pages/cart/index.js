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

      <section>
        <div className="cart-section">
          <div className="cart-container">
            <div className="cart-title">
              <h1>Review Cart</h1>
            </div>

            {cartItems.map((item) => (
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
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
