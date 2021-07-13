import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, LoadingBox, MessageBox } from "../../components";
import { signin } from "../../redux/actions/userActions";

export default function Signin(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <>
      <Header />

      <section className="container">
        <form className="form" onSubmit={submitHandler}>
          <div className="formImage">
            <img className="small" src="/icon.png" alt="icon" />
            <h1 className="title">Sign In</h1>
          </div>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger" error={error} />}
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label />
            <button className="submitBtn" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <p className="text">
          New Customer?{" "}
          <span>
            <Link to={`/register?redirect=${redirect}`}>Sign up here</Link>
          </span>
        </p>
      </section>
    </>
  );
}
