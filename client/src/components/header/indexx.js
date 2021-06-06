import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";
import "./styles/headerx.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "./MenuItem";

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isOpen, setIsOpen] = useState(false);

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <nav>
      <div className="nav-left">
        {/* HIDDEN SIDEBAR */}
        <div className={isOpen ? "open" : "sidebar"}>
          <div className="menu">
            <div className="exitbtn">
              <CloseIcon onClick={() => setIsOpen(false)} />
            </div>
            <MenuItem title="cart" />
            <MenuItem title="Marketplace" />
            {userInfo ? (
              <>
                <MenuItem title="shipping" />
                <MenuItem title="Profile" />
              </>
            ) : (
              <MenuItem title="sign in" />
            )}
            <MenuItem title="explore" />
          </div>
        </div>
        {/* END OF HIDDEN SIDEBAR */}

        <div className="mobile-menu-btn">
          <img
            src="./icons/icons8-menu-24.png"
            alt="mobile"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <a className="nav-link" href="https://github.com/">
          <img src="/icon.png" width="32" height="32" alt="github" />
        </a>

        <div className="nav-left__items">
          <div className="search-bar">
            <input type="text" placeholder="Search product . ." />
            <img
              src="./icons/input-icon.svg"
              width="32"
              height="32"
              alt="input"
            />
          </div>

          <ul className="nav-items__links">
            <li>Profile</li>
            <li>Marketplace</li>
            <li>Explore</li>
          </ul>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/cart">
          <div className="nav-icons-group cart">
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </div>
        </Link>

        {userInfo ? (
          <Link to="#">
            <div className="avatar-nav dropdown">
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
          <button>
            <Link to="/signin">Sign In</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
