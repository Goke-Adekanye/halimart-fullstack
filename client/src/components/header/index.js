import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/header.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "./MenuItem";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="row">
      <div className="header_right">
        <Link to="/">
          <img className="logo" src="/icon.png" alt="icon" />
        </Link>
      </div>
      <div className="row header_center">
        <div className="header_text">ABOUT</div>
        <div className="header_text">FAQS</div>
        <div className="header_text">CONTACT US</div>
      </div>
      <div className="header_left row">
        <button className="signin">
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
        </button>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <li>
                <Link to="/">Sign Out</Link>
              </li>
            </ul>
          </div>
        ) : (
          <button className="signin">
            <Link to="/signin">Sign in</Link>
          </button>
        )}

        <MenuIcon onClick={() => setIsOpen(true)} />
        <nav className={isOpen ? "open" : ""}>
          <div className="menu">
            <div className="exitbtn">
              <CloseIcon onClick={() => setIsOpen(false)} />
            </div>
            <MenuItem title="cart" />
            <MenuItem title="faqs" />
            {userInfo && (
              <>
                <MenuItem title="shipping" />
                <MenuItem title="User Profile" />
              </>
            )}
            <MenuItem title="contact us" />
            <MenuItem title="sign in" />
          </div>
        </nav>
      </div>
    </div>
  );
}
