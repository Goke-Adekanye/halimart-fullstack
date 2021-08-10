import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, LoadingBox, MessageBox } from "../../components";
import { register } from "../../redux/actions/userActions";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
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
              <img src="/icon.png" alt="icom" height="22" />
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
                aria-label="Enter your full name"
                type="text"
                required
                placeholder="Full name"
                onChange={({ target }) => setName(target.value)}
                value={name}
              />
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
              <input
                aria-label="Confirm your password"
                type="password"
                required
                placeholder="Confirm Password"
                onChange={({ target }) => setConfirmPassword(target.value)}
                value={confirmPassword}
              />

              <button
                //   disabled={isInvalid}
                type="submit"
                className="submit"
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-footer">
            <p className="text-sm">
              Have an account?{` `}
              <Link to={`/signin?redirect=${redirect}`}>Login</Link>
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
