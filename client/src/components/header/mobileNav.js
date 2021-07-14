import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/mobileNav.css";

export default function MobileNav({ isOpen, setIsOpen }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const gotoPage = () => {
    setIsOpen(false);
  };
  return (
    <nav className={`nav ${isOpen && "active"}`}>
      <div className="nav-inner">
        <ul>
          <Link to="/">
            <li onClick={gotoPage}>home</li>
          </Link>

          <Link to="/profile">
            <li onClick={gotoPage}>history</li>
          </Link>

          <Link to="/profile">
            <li onClick={gotoPage}>profile</li>
          </Link>

          <Link to="/cart">
            <li onClick={gotoPage}>cart</li>
          </Link>

          {!userInfo && <Link to="/signin">
            <li onClick={gotoPage}>
              <button className="signin mobile">Sign In</button>
            </li>
          </Link>}
          
        </ul>
      </div>
    </nav>
  );
}
