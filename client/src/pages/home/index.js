import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Product, MessageBox, LoadingBox } from "../../components";
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
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" error={error} />
      ) : (
        <section className="row center product">
          {search(products).map((product, index) => (
            <Product key={product._id} product={product} index={index} />
          ))}
        </section>
      )}
    </React.Fragment>
  );
}
