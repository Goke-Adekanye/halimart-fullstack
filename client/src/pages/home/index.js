import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, MessageBox, LoadingBox } from "../../components";
import { listProducts } from "../../redux/actions/productActions";
import "./styles/home.css";

export default function Home() {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger" error={error} />
  ) : (
    <div className="row center product">
      {products.map((product, index) => (
        <Product key={product.product_id} product={product} index={index} />
      ))}
    </div>
  );
}
