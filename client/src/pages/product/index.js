import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/product.css";
import { Rating, MessageBox, Header, SkeletonPaper } from "../../components";
import { detailsProduct } from "../../redux/actions/productActions";

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}/?qty=${qty}`);
  };

  return (
    <div>
      <Header />
      <div>
        {loading ? (
          <section>
            <SkeletonPaper height={700} />
          </section>
        ) : error ? (
          <MessageBox variant="danger" error={error} />
        ) : (
          <section>
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
            <div className="product-ovv-container">
              <div className="product-ovv-img">
                <picture>
                  <img src={product.image} alt={product.name} />
                </picture>
              </div>

              <div className="product-ovv-desc">
                <h4>{product.name}</h4>
                <div>
                  <div className="desc-status">
                    Status:{" "}
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                  <div className="desc-price">
                    <span>$</span>
                    {product.price}
                  </div>

                  <div className="desc-rq-container">
                    <div className="desc-ratings">
                      <span class="r-text">Rating: </span>
                      <Rating rating={product.rating} />
                    </div>
                    <div className="desc-qty">
                      <span class="r-text">Quantity: </span>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {" "}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="desc-button">
                    <button
                      type="button"
                      onClick={addToCartHandler}
                      className="green block"
                    >
                      Buy Now
                    </button>
                  </div>

                  <div className="desc-message"></div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
