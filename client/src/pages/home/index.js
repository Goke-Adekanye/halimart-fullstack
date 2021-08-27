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
        </section>
      )}
    </React.Fragment>
  );
}
