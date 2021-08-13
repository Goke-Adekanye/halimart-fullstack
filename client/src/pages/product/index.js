import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/product.css";
import {
  Rating,
  MessageBox,
  Header,
  SkeletonPaper,
  Accordion,
} from "../../components";
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

                  <div className="desc-description">
                    <Accordion
                      header="Description"
                      body={product.description}
                    />
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
                  <h3 class="delivery-text">100% Safe Delivery</h3>

                  <div className="desc-message">
                    <div className="message-container">
                      <svg
                        height="30"
                        viewBox="0 0 29 30"
                        width="29"
                        aria-label="pickup-label"
                        class=""
                        name="pickup-label"
                      >
                        <path
                          d="M28.92 23.38l-2.4-3.29a.96.96 0 0 0-.73-.38h-2.12V6.9h.5c.23 0 .42-.14.47-.37.04-.24-.05-.43-.23-.52L12.5.04a.63.63 0 0 0-.42 0L.24 6a.47.47 0 0 0-.23.52c.05.23.23.37.46.37h.51v16.77c0 .28.18.47.46.47h4.47v3.71c0 .28.19.47.46.47h1.06A2.14 2.14 0 0 0 9.52 30c1.02 0 1.9-.75 2.08-1.69h11.3A2.13 2.13 0 0 0 24.95 30c1.01 0 1.89-.75 2.07-1.69h1.06a.88.88 0 0 0 .88-.9v-3.8c.05 0 .05-.14-.05-.23zm-1.29-.24h-5.58v-2.49h3.78l1.8 2.5zM12.28.98l9.91 4.97H2.41L12.28.97zM1.86 23.19V6.89h20.89v12.82H22a.88.88 0 0 0-.88.9v6.8h-.87V18.5a.88.88 0 0 0-.88-.89H6.74a.88.88 0 0 0-.87.9v4.74H1.86v-.05zm4.93-4.7h12.5v8.93h-7.7a2.13 2.13 0 0 0-2.08-1.7c-1.01 0-1.89.76-2.07 1.7h-.6v-8.93h-.05zm2.72 10.62c-.7 0-1.2-.57-1.2-1.22 0-.66.55-1.22 1.2-1.22.7 0 1.2.56 1.2 1.22 0 .65-.55 1.22-1.2 1.22zm15.5 0c-.7 0-1.2-.57-1.2-1.22a1.2 1.2 0 0 1 2.4 0c0 .65-.56 1.22-1.2 1.22zm2.07-1.7A2.13 2.13 0 0 0 25 25.74c-1.01 0-1.89.75-2.07 1.69h-.88v-3.29h6.04v3.29h-1.01zm-10.6-.89c-.28 0-.47-.18-.47-.47v-6.24c0-.28.19-.47.46-.47.28 0 .46.19.46.47v6.25c0 .28-.18.47-.46.47zm-3.42 0c-.28 0-.46-.18-.46-.47v-6.24c0-.28.18-.47.46-.47s.46.19.46.47v6.25c0 .28-.18.47-.46.47zM9.65 24.7a.47.47 0 0 1-.46-.47v-4.41c0-.28.18-.47.46-.47s.46.19.46.47v4.41c0 .29-.18.47-.46.47zm3.87-8.12a.47.47 0 0 1-.46-.47V8.72c0-.28.19-.47.46-.47h7.7c.28 0 .47.2.47.47v7.38c0 .28-.19.47-.47.47h-7.7zm3.1-.94h1.56V14.5h-1.57v1.13zm-2.64-6.44v6.44h1.71v-1.6c0-.28.18-.47.46-.47h2.5c.27 0 .45.19.45.47v1.6h1.66V9.19h-6.78zm-2.9 7.38H3.33c-.28 0-.46-.19-.46-.47V8.72c0-.28.18-.47.46-.47h7.75c.27 0 .46.2.46.47v7.38c0 .28-.18.47-.46.47zm-4.66-.94H8V14.5H6.42v1.13zM3.8 9.19v6.44h1.66v-1.6c0-.28.19-.47.46-.47h2.5c.27 0 .45.19.45.47v1.6h1.71V9.19H3.8zm2.17 2.3a.47.47 0 0 1-.46-.46c0-.29.18-.47.46-.47h2.49c.28 0 .46.18.46.46 0 .29-.18.48-.46.48H5.96zm10.19 0a.47.47 0 0 1-.46-.46c0-.29.18-.47.46-.47h2.49c.28 0 .46.18.46.46 0 .29-.18.48-.46.48h-2.49z"
                          fill="#ed017f"
                        ></path>
                      </svg>
                      <span>Pickup &amp; Pay on Collection Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
