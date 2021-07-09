import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/headerxx.css";
import MobileNav from "./mobileNav";
import { signout } from "../../redux/actions/userActions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.querySelector("section").classList.add("fade-out");
    } else {
      document.querySelector("section").classList.remove("fade-out");
    }
  };

  const handleNavCase = () => {
    if (isOpen) {
      setIsOpen(!isOpen);

      if (document.querySelector("section").classList.contains("fade-out")) {
        document.querySelector("section").classList.remove("fade-out");
      }
    }
  };
  return (
    <>
      <header className={`navbar-area ${isOpen && "non"}`}>
        <div className="nav-left">
          <a href="/" className="nav-brand">
            <img src="/icon.png" alt="icon" />
          </a>
          <div className="search-bar">
            <input type="text" placeholder="Search product .." />
            <img src="./icons/input-icon.svg" alt="input" />
          </div>
        </div>

        <div className="nav-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="##">products</a>
            </li>
            <li className="nav-item">
              <a href="##">payments</a>
            </li>
            <li className="nav-item">
              <a href="##">pricing</a>
            </li>
            <li className="nav-item">
              <a href="##">contact</a>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <Link to="/cart">
            <div className="nav-icon-group" onClick={handleNavCase}>
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </div>
          </Link>

          {userInfo ? (
            <Link to="#">
              <div className="dropdown">
                {userInfo.name}
                <i className="fa fa-caret-down" />

                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li onClick={signoutHandler}>
                    <Link to="/">Sign Out</Link>
                  </li>
                </ul>
              </div>
            </Link>
          ) : (
            <button className="signin" onClick={handleNavCase}>
              <Link to="/signin">Sign In</Link>
            </button>
          )}

          <button
            type="button"
            className={`nav-toggler d-none ${isOpen && "active"}`}
            onClick={handleOpen}
          >
            <span></span>
          </button>
        </div>
      </header>

      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
