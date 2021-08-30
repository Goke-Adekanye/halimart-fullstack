import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, MessageBox, Rating, SkeletonPaper } from "../../components";
import { listProducts } from "../../redux/actions/productActions";
import "./styles/home.css";

export default function Home() {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const [searchParam] = useState(["name"]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(filter.toLowerCase()) >
          -1
        );
      });
    });
  }

  return (
    <React.Fragment>
      <Header filter={filter} setFilter={setFilter} show />
      {loading ? (
        <section className="home-section">
          <SkeletonPaper height={700} />
        </section>
      ) : error ? (
        <MessageBox variant="danger" error={error} />
      ) : (
        <section className="home-section">
          <section className="first-section-mobile">
            <div className="fsm-header">
              <h2>Recommended for you</h2>
              <a href="/">All Items</a>
            </div>

            <div className="fsm-product-ctn">
              <div className="fsm-item-list">
                {search(products).map((product) => (
                  <div className="fsm-item-ctn">
                    <a href={`/product/${product._id}`} className="fsm-item">
                      <div className="fsm-image">
                        <img src={product.image} alt="item" />
                      </div>

                      <div className="fsm-desc">
                        <p>{product.name}</p>
                        <p className="price">${product.price}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="first-section-desktop">
            <div className="fsm-header fsd">
              <h2>Today's Deals</h2>
              <a href="/">All Items</a>
            </div>

            <div className="fsd-product-ctn">
              <div className="fsd-item-list">
                {search(products).map((product) => (
                  <div className="fsd-item-ctn">
                    <a href={`/product/${product._id}`} className="fsd-item">
                      <div className="fsd-image">
                        <img src={product.image} alt="item" />
                      </div>

                      <div className="fsd-desc">
                        <p className="name">{product.name}</p>
                        <p className="price">${product.price}</p>
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                        />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="second-section">
            <div className="fsm-header ss">
              <h2>Best Selling Products</h2>
            </div>

            <div className="fsd-product-ctn ss">
              <div className="fsd-item-list">
                {search(products).map((product) => (
                  <div className="fsd-item-ctn ss">
                    <div className="ss-image">
                      <img src={product.image} alt="item" />
                      <a href={`/product/${product._id}`}>
                        <svg
                          height="32"
                          viewBox="0 0 32 32"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="save-circle"
                          class="f41d7_3EAxq"
                          name="save-circle"
                        >
                          <g
                            fill="none"
                            fill-rule="evenodd"
                            transform="translate(4 2)"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              fill="#d8d8d8"
                              r="12"
                            ></circle>
                            <path
                              d="M17.235 8.021a3.316 3.316 0 0 0-2.392-1.013c-.904 0-1.754.36-2.394 1.016l-.334.342-.34-.347A3.333 3.333 0 0 0 9.38 7a3.32 3.32 0 0 0-2.39 1.013A3.471 3.471 0 0 0 6 10.464c0 .926.355 1.793.995 2.448l4.866 4.982a.348.348 0 0 0 .246.106.345.345 0 0 0 .246-.103l4.877-4.974c.64-.655.992-1.525.992-2.45a3.469 3.469 0 0 0-.987-2.452z"
                              fill="#FFF"
                              fill-rule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </div>

                    <div className="ss-desc">
                      <div className="ss-desc-name">
                        <h3>{product.name}</h3>
                      </div>
                      <div className="ss-desc-price">
                        <span>${product.price}</span>
                      </div>
                      <div className="ss-desc-text">
                        <span className="dtf">Free Shipping</span>
                        <span className="dts">Not AVailable</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      )}
    </React.Fragment>
  );
}
