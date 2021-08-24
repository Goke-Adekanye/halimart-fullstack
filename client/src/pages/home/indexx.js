import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, MessageBox, SkeletonCard } from "../../components";
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
        <section className="row center product">
          <SkeletonCard />
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
                {search(products).map((product, index) => (
                  <div className="fsm-item-ctn">
                    <a href={`/product/${product._id}`} className="fsm-item">
                      <div className=""></div>
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
