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
    <React.Fragment>
      <Header />

      <section className="auth">
        <div className="auth-img">
          <img src="/images/auth.svg" alt="log" />
        </div>

        <div className="auth-form">
          <div className="form-container">
            <h1>
              <img src="/icon.png" alt="icom" />
            </h1>

            {loading && (
              <div className="message">
                <LoadingBox />
              </div>
            )}
            {error && (
              <div className="message">
                <MessageBox variant="danger" error={error} />{" "}
              </div>
            )}
            <form onSubmit={submitHandler}>
              <input
                aria-label="Enter your email address"
                type="email"
                required
                placeholder="Email address"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
              <input
                aria-label="Enter your password"
                type="password"
                required
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <button
                //   disabled={isInvalid}
                type="submit"
                className="submit"
              >
                Login
              </button>
            </form>
          </div>

          <div className="form-footer">
            <p className="text-sm">
              Don't have an account?{` `}
              <Link to={`/register?redirect=${redirect}`}>
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
